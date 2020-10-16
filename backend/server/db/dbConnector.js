const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
const { DATABASE } = config.appDefaults;
const { URL, NAME } = DATABASE;
const mongoOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
};

let isDatabaseConnected = false;

const connectToDb = async () => {
  if (isDatabaseConnected) return;
  try {
    await mongoose.connect(`mongodb://${URL}:27017/${NAME}`, mongoOptions);
    isDatabaseConnected = true;
  } catch (error) {
    setTimeout(connectToDb, 5000);
  }
};

connectToDb();

module.exports = mongoose;
