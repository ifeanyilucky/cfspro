const depositSchema = require('../models/deposit');
const WM = require('../models/withdrawalMethod');
const investSchema = require('../models/investment');
const userSchema = require('../models/user');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { totp, authenticator } = require('otplib');
const withdraw = require('../models/withdrawal');
const sendEmail = require('../utils/sendEmail');
const shortId = require('shortid');
const ejs = require('ejs');
const path = require('path');

// CREATE INVESTMENT CONTROLLER
const createInvestment = async (req, res) => {
  const { amount } = req.body;
  const transactionId = shortId.generate();
  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const date = new Date();
  const expiryDate = date.addDays(90);
  const invest = await investSchema.create({
    ...req.body,
    user: req.user._id,
    transactionId: transactionId,
    status: 'completed',
    expiryDate: expiryDate,
  });

  const user = await userSchema.findOneAndUpdate(
    { _id: invest.user },
    { $inc: { accountBalance: -amount } },
    { new: true }
  );
  res.status(StatusCodes.CREATED).json({ investment: invest, user: user });
};

// GET INVESTMENTS
const getInvestments = async (req, res) => {
  const investment = await investSchema
    .find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('user');
  res.status(StatusCodes.OK).json({ investment });
};

// GET SINGLE INVESTMENT
const getInvestment = async (req, res) => {
  const { id } = req.params;
  const investment = await investSchema.findOne({ _id: id }).populate('user');
  res.status(StatusCodes.OK).json({ investment });
};

// DEPOSIT CONTROLLERS
const deposit = async (req, res) => {
  const transId = shortId.generate();
  const newDeposit = await depositSchema.create({
    ...req.body,
    user: req.user._id,
    transactionId: transId,
  });
  res.status(StatusCodes.CREATED).json({ deposit: newDeposit });
};
const getDeposits = async (req, res) => {
  const deposits = await depositSchema
    .find({ user: req.user._id })
    .sort({
      createdAt: -1,
    })
    .populate('user');
  res.status(StatusCodes.OK).json({ deposits });
};
// ---------------------------------------------------------
// OTP FOR WITHDRAWAL
const secret = 'DIIRRKIOEEPRLFLRPEPDLKFKEEFDD';

const requestWithdrawalOtp = async (req, res) => {
  const token = totp.generate(secret);

  await sendEmail({
    to: 'wfguru2017@gmail.com',
    subject: 'Your token pls',
    html: `<h1>
   hello there, this is your ${token}
    </h1>`,
  });

  res.status(StatusCodes.CREATED).json({ otp: token });
};

// ACTUAL WITHDRAWALS
const requestWithdrawal = async (req, res) => {
  const { amount } = req.body;
  console.log(req.body);
  const transactionId = shortId.generate();

  const _withdraw = await withdraw.create({
    ...req.body,
    user: req.user._id,
    transactionId: transactionId,
  });
  await userSchema.findOneAndUpdate(
    { _id: _withdraw.user },
    {
      $inc: { accountBalance: -amount },
    },
    { new: true }
  );
  res.status(StatusCodes.CREATED).json({ withdrawal: _withdraw });
};

const getWithdrawals = async (req, res) => {
  const withdrawals = await withdraw.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ withdrawals });
};
// --------------------------------------------------------------
// WITHDRAWAL METHOD
const createWithdrawalMethod = async (req, res) => {
  const wm = await WM.create({ ...req.body, user: req.user._id });
  res.status(StatusCodes.CREATED).json({ withdrawalMethod: wm });
};

const getWithdrawalMethod = async (req, res) => {
  const { _id } = req.user;
  const withdrawalMethod = await WM.find({ user: _id });
  res.status(StatusCodes.ACCEPTED).json({ withdrawalMethod });
};

const getTransaction = async (req, res) => {
  const deposits = await depositSchema.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  const withdrawals = await withdraw.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  const investments = await investSchema
    .find({ user: req.user._id })
    .sort({ createdAt: -1 });
  const transactions = [...deposits, ...withdrawals, ...investments];
  const sortedTransaction = transactions
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt);
  res.status(StatusCodes.OK).json({ transactions: sortedTransaction });
};

module.exports = {
  deposit,
  createInvestment,
  getInvestments,
  requestWithdrawalOtp,
  requestWithdrawal,
  createWithdrawalMethod,
  getWithdrawalMethod,
  getWithdrawals,
  getDeposits,
  getTransaction,
};
