const mongoose = require('mongoose');

const referralBonus = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User not provided'],
    },
    amount: {
      type: String,
      required: true,
    },
    bonusFrom: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User not provided'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('referral-bonus', referralBonus);
