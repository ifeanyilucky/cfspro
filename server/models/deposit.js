const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: [true, 'User not provided'],
    },
    amount: {
      type: Number,
      required: [true, 'Please enter amount'],
    },
    method: {
      type: String,
      required: [true, 'Please provide payment method'],
    },
    paymentProof: {
      type: String,
      required: [true, 'Please provide proof of payment'],
    },

    status: {
      type: String,
      enum: ['completed', 'failed', 'pending'],
      default: 'pending',
    },
    transactionId: {
      type: String,
    },
    transactionType: {
      type: String,
      enum: ['out', 'in'],
      default: 'in',
    },
    remark: {
      type: String,
      default: 'deposited',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('deposit', DepositSchema);
