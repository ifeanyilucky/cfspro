const mongoose = require('mongoose');

const withdrawalMethod = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User not provided']
    },
    bitcoin: {
      type: String
    },
    ethereum: {
      type: String
    },
    litecoin: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('withdrawalMethod', withdrawalMethod);
