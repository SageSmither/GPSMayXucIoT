const mongoose = require('mongoose');
const configuration = require('./configuration');
const accountModel = require('../models/account.model');

const connectDB = async () => {
  try {
    // mongoose.set('strictQuery', false);
    await mongoose.connect(configuration.DB_URL);

    let ad = await accountModel.findOne({
      username: configuration.USER_ADMIN.username,
    });
    if (!ad) {
      await accountModel.create(configuration.USER_ADMIN);
      console.log('admin created');
    }
    console.log('Kết nối db thành công');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
