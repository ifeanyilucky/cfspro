const user = require('../models/user');
const { BadRequestError, NotFoundError, UnAuthError } = require('../errors');
const shortid = require('shortid');
const { StatusCodes } = require('http-status-codes');
const sendEmail = require('../utils/sendEmail');
const ejs = require('ejs');
const path = require('path');
const config = require('../config');
const crypto = require('crypto');

// registration
const register = async (req, res) => {
  const { password, email, firstName, lastName } = req.body;

  const existingUser = await user.findOne({ email: email });
  if (existingUser) {
    throw new BadRequestError('Another user with this email already exists');
  }
  const uniqueId = shortid.generate();
  const newUser = await user.create({ ...req.body, referralId: uniqueId });
  const token = newUser.createJWT();

  res.status(StatusCodes.CREATED).json({ user: newUser, token });
};

// login controller
const login = async (req, res) => {
  const { password, email } = req.body;
  const loginUser = await user.findOne({ email: email });

  if (!loginUser) {
    throw new UnAuthError("Sorry we couldn't find an account with that email.");
  }
  const isPasswordCorrect = await loginUser.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthError(`Sorry, that password isn't right.`);
  }
  const token = loginUser.createJWT();

  res.status(StatusCodes.OK).json({ success: true, user: loginUser, token });
};

// get account information
const account = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError('User ID not found');
  }
  const account = await user.findById(id);
  res.status(StatusCodes.OK).json({ user: account });
};

// update account

const updateAccount = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    throw new NotFoundError('You are not authorized to update profile');
  }
  console.log(req.body);
  const updateAccount = await user.findOneAndUpdate(
    { id: id },
    { ...req.body },
    { new: true }
  );
  res.status(StatusCodes.ACCEPTED).json({ user: updateAccount });
};

const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const existingUser = await user.findOne({ email: email });
  if (!existingUser) {
    throw new NotFoundError(
      'We cannot find any account associated with this email'
    );
  }

  const resetToken = existingUser.resetPasswordToken();
  await existingUser.save();
  const resetUrl = `${config.host}/auth/reset-password/${resetToken}`;
  // ejs.renderFile(
  //   path.join(__dirname, '/views/forgotPassword'),
  //   { title: 'Reset your password' },
  //   async (error, data) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       await sendEmail({
  //         to: email,
  //         subject: 'Reset your password',
  //         html: data,
  //       });
  //     }
  //   }
  // );

  res.status(StatusCodes.ACCEPTED).json({ user, resetUrl });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const account = await user.findOne({
    resetPasswordToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!account) {
    throw new BadRequestError('Invalid reset token');
  }
  const updatePassword = await user.findOneAndUpdate(
    { _id: account._id },
    {
      password: password,
      passwordResetToken: undefined,
      passwordResetExpire: undefined,
    }
  );
  res.status(StatusCodes.ACCEPTED).json({ message: 'Password reset success' });
};

module.exports = {
  register,
  login,
  account,
  updateAccount,
  resetPasswordRequest,
  resetPassword,
};
