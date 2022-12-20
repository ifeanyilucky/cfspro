const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    referralId: {
      type: String,
      required: [true, 'Please automate referral ID'],
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
    totalDeposit: {
      type: Number,
      default: 0,
    },
    totalProfit: {
      type: Number,
      default: 0,
    },
    referralBonus: {
      type: Number,
      default: 0,
    },
    totalWithdrawal: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '20d' }
  );
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};
module.exports = mongoose.model('user', UserSchema);
