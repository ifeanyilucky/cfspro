const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { UnAuthError } = require('../errors');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userAccount = await user.findById(payload.userId).select('-password');

    req.user = userAccount;
    next();
  } catch (error) {
    throw new UnAuthError('Not authorized to access this route');
  }
};

module.exports = auth;
