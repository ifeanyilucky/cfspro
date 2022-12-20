const depositSchema = require('../models/deposit');
const WM = require('../models/withdrawalMethod');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { totp, authenticator } = require('otplib');
const withdraw = require('../models/withdrawal');
const sendEmail = require('../utils/sendEmail');
const shortId = require('shortid');
// CREATE INVESTMENT CONTROLLER
const invest = async (req, res) => {};

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
  const deposits = await depositSchema.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
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
  const { otp } = req.body;
  console.log(req.body);

  const isValidOtp = totp.check(otp, secret);
  console.log(isValidOtp);
  // if (isValidOtp === false) {
  //   throw new BadRequestError('OTP is not valid');
  // }
  // const _withdraw = await withdraw.create({ ...req.body, user: req.user._id });
  // res.status(StatusCodes.CREATED).JSON({ withdrawal: _withdraw });
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
  const transaction = [];
  const deposits = await depositSchema.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  const withdrawals = await withdraw.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ withdrawals });
};
module.exports = {
  deposit,
  invest,
  requestWithdrawalOtp,
  requestWithdrawal,
  createWithdrawalMethod,
  getWithdrawalMethod,
  getWithdrawals,
  getDeposits,
};
