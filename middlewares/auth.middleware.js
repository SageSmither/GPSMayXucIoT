const configuration = require('../configs/configuration');
const jwt = require('jsonwebtoken');
const accountModel = require('../models/account.model');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // throw new ErrorResponse(403, 'Unauthorized');
  }
  let token = authorization?.split(' ')[1];
  if (!token) {
    token = req.cookies['token'];
  }
  if (!token) {
    throw new ErrorResponse(403, 'Unauthorized');
  }
  const decode = jwt.verify(token, configuration.SECRET_KEY);
  const account = await accountModel.findById(decode._id);
  if (!account) {
    throw new ErrorResponse(403, 'Unauthorized');
  }
  req.account = account;
  next();
};
