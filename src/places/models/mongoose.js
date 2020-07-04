const mongoose = require('../../../services/mongoose');

const Transaction = mongoose.model(
  'Transaction',
  {
    userId: String,
    userData: Object,
    method: String,
    originalUrl: String,
    lat: String,
    lng: String,
    radius: String,
    type: String,
    response: Object,
    time: Number,
  },
  'transactions'
);

// const transactionsList = mongoose.Collection('Transactions');
// mongoose.
module.exports = {
  Transaction,
  // transactionsList,
};
