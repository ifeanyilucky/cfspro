const mongoose = require('mongoose');

const investment = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: [true, 'User not provided'],
    },
    amount: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      default: 0,
    },

    plan: {
      type: Object,
    },

    transactionType: {
      type: String,
      enum: ['out', 'in'],
      default: 'out',
    },
    status: {
      type: String,
      enum: ['completed', 'failed', 'pending'],
      default: 'pending',
    },
    expiryDate: {
      type: Date,
      default: Date.now,
    },
    transactionId: {
      type: String,
    },
    remark: {
      type: String,
      default: 'bought investment plan',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('investment', investment);
