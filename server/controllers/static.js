const depositSchema = require('../models/deposit');
const WM = require('../models/withdrawalMethod');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { totp } = require('otplib');
const withdraw = require('../models/withdrawal');
const userSchema = require('../models/user');

const getDeposits = async (req, res) => {
  const deposits = await depositSchema.find().sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ deposits });
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

// EDIT WITHDRAWAL
const updateWithdrawal = async (req, res) => {
  const { id } = req.params;
  const deposit = await withdraw.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  res.status(StatusCodes.ACCEPTED).json({ deposit });
};

const getUsers = async (req, res) => {
  const users = await userSchema.find({});
  res.status(StatusCodes.OK).json({ users });
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
module.exports = {
  getWithdrawals,
  getDeposits,
  updateDeposit,
  updateWithdrawal,
  getUsers,
  updateUser,
  deleteUser,
};
