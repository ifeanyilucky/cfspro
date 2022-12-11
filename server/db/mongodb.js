const mongoose = require('mongoose');

const connectMongo = (database) => {
  return mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectMongo;
