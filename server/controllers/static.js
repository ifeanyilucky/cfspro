const depositSchema = require('../models/deposit');
const WM = require('../models/withdrawalMethod');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { totp } = require('otplib');
const withdraw = require('../models/withdrawal');
const userSchema = require('../models/user');
const investSchema = require('../models/investment');
const referralBonus = require('../models/referralBonus');
const sendEmail = require('../utils/sendEmail');
const ejs = require('ejs');
const path = require('path');

const getInvestments = async (req, res) => {
  const investments = await investSchema
    .find()

    .sort({ createdAt: -1 })
    .populate('user');
  res.status(StatusCodes.OK).json({ investments });
};
const getDeposits = async (req, res) => {
  const deposits = await depositSchema
    .find({ status: 'pending' })
    .populate('user')
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ deposits });
};

// GET SINGLE DEPOSIT
const getDeposit = async (req, res) => {
  const { id } = req.params;
  const deposit = await depositSchema.findOne({ _id: id }).populate('user');
  res.status(StatusCodes.OK).json({ deposit });
};

// EDIT DEPOSITS
const updateDeposit = async (req, res) => {
  const { id } = req.params;

  const deposit = await depositSchema.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (req.body.status === 'completed') {
    await userSchema.findOneAndUpdate(
      { _id: deposit.user },
      {
        $inc: {
          totalDeposit: Number(deposit.amount),
          accountBalance: Number(deposit.amount),
        },
      },
      { new: true }
    );
  }
  res.status(StatusCodes.ACCEPTED).json({ deposit });
};

// GET WITHDRAWAL
const getWithdrawals = async (req, res) => {
  const withdrawals = await withdraw.find().sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ withdrawals });
};

// PROCESS WITHDRAWAL

// EDIT WITHDRAWAL
const updateWithdrawal = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const withdrawal = await withdraw.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  const user = await userSchema.findOneAndUpdate(
    { _id: withdrawal.user },
    { $inc: { accountBalance: -amount } },
    { new: true }
  );

  res.status(StatusCodes.ACCEPTED).json({ withdrawal });
};
// GET USERS
const getUsers = async (req, res) => {
  const users = await userSchema.find({ role: 'customer' });

  res.status(StatusCodes.OK).json({ users });
};
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findOne({ _id: id });

  res.status(StatusCodes.OK).json({ user });
};

// UPDATE USER
const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  res.status(StatusCodes.ACCEPTED).json({ user });
};
// DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findOneAndDelete({ _id: id });
  res.status(StatusCodes.ACCEPTED).json({ user });
};

const sendEmailToCustomer = async (req, res) => {
  const { subject, email, message } = req.body;
  ejs.renderFile(
    path.join(__dirname, '../views/customer-email'),
    { config: '', title: subject },
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        await sendEmail({
          to: email,
          subject: req.body.subject,
          html: data,
        });
      }
    }
  );

  res.status(StatusCodes.OK).json({ success: true });
};

const getReferralBonus = async (req, res) => {
  const bonus = await referralBonus
    .find({})
    .populate('bonusFrom', 'firstName lastName')
    .populate('user')
    .sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ referralBonus: bonus });
};

module.exports = {
  getWithdrawals,
  getDeposits,
  updateDeposit,
  updateWithdrawal,
  getUsers,
  updateUser,
  deleteUser,
  sendEmailToCustomer,
  getReferralBonus,
  getInvestments,
  getDeposit,
  getUser,
};
