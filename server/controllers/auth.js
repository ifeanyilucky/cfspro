const user = require('../models/user');
const { badRequestError, NotFoundError, UnAuthenticationError } = require('../errors');
const shortid = require('shortid');
const { StatusCodes } = require('http-status-codes');

// registration
const register = async (req, res) => {
  try {
    const { password, email, firstName, lastName } = req.body;

    const existingUser = await user.findOne({ email: email });
    if (existingUser) {
      throw new badRequestError('Another user with this email already exists');
    }
    const uniqueId = shortid.generate();
    const newUser = await user.create({ ...req.body, referralId: uniqueId });
    const token = newUser.createJWT();

    res.status(StatusCodes.CREATED).json({ user: newUser, token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, error });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const loginUser = await user.findOne({ email: email });

    if (!loginUser) {
      throw new UnAuthenticationError("Sorry we couldn't find an account with that email.");
    }
    const isPasswordCorrect = await loginUser.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticationError(`Sorry, that password isn't right.`);
    }
    const token = loginUser.createJWT();

    res.status(StatusCodes.OK).json({ success: true, user: loginUser, token });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNAUTHORIZED).json({ success: false, error });
  }
};

// get account information
const account = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new badRequestError('User ID not found');
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
  const updateAccount = await user.findOneAndUpdate({ id: id }, { ...req.body }, { new: true });
  res.status(StatusCodes.ACCEPTED).json({ user: updateAccount });
};

module.exports = { register, login, account, updateAccount };
