const mongoose = require('mongoose');

const investment = new mongoose.Schema(
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
