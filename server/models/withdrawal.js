const mongoose = require('mongoose');

const withdrawal = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User not provided']
    },
    amount: {
      type: String,
      required: true
    },
    method: {
      type: String
    },
    status: {
      type: String,
      enum: ['completed', 'failed', 'pending'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('withdrawal', withdrawal);
