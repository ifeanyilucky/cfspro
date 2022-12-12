const depositSchema = require('../models/deposit');
const WM = require('../models/withdrawalMethod');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { totp } = require('otplib');
const withdraw = require('../models/withdrawal');

// DEPOSIT CONTROLLERS
const deposit = async (req, res) => {
  const newDeposit = await depositSchema.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(StatusCodes.CREATED).json({ deposit: newDeposit });
};
const getDeposits = async (req, res) => {
  const deposits = await depositSchema.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ deposits });
};

// OTP FOR WITHDRAWAL
const secret = 'DIIRRKIOEEPRLFLRPEPDLKFKEEFDD';

const invest = async (req, res) => {};

const requestWithdrawalOtp = (req, res) => {
  const token = totp.generate(secret);

  res.status(StatusCodes.CREATED).json({ otp: token });
};

// ACTUAL WITHDRAWALS
const requestWithdrawal = async (req, res) => {
  console.log(req.body);

  const isValidOtp = totp.check(req.body.otp, secret);
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
