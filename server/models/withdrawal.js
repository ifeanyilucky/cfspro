const mongoose = require('mongoose');

const withdrawal = new mongoose.Schema(
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
    method: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    status: {
      type: String,
      enum: ['completed', 'failed', 'pending'],
      default: 'pending',
    },
    transactionType: {
      type: String,
      enum: ['out', 'in'],
      default: 'out',
    },
    transactionId: {
      type: String,
    },
    remark: {
      type: String,
      default: 'withdrawal of',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('withdrawal', withdrawal);
