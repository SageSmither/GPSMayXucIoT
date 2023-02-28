const jwt = require('jsonwebtoken');
const accountModel = require('../models/account.model');
const typeRole = require('../constants/typeRole');
const configuration = require('../configs/configuration');
const ErrorResponse = require('../helpers/ErrorResponse');
const bcryptjs = require('bcryptjs');

module.exports = {
  getAllAccount: async (req, res, next) => {
    let perPage = 30;
    let page = req.query.page || 1;

    let key = req.query.search;

    let bdQuery = {
      role: typeRole.USER,
    };

    if (key && key != '""') {
      bdQuery.username = {
        $regex: '' + key + '.*',
      };
    }
    let accounts = await accountModel
      .find(bdQuery)
      .sort('-createdAt')
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    let count = await accountModel.countDocuments(bdQuery);
    let bd = {
      current_page: page,
      total_page: Math.ceil(count / perPage),
      count: count,
      accounts: accounts,
    };

    return res.status(200).json(bd);
  },
  register: async (req, res, next) => {
    let { ...body } = req.body;

    let account = await accountModel.create(body);

    let payload = {
      _id: account._id,
      username: account.username,
      role: account.role,
    };
    let token = jwt.sign(payload, configuration.SECRET_KEY, {
      expiresIn: '10h',
    });
    return res.status(201).json({
      ...payload,
      jwt: token,
    });
  },
  login: async (req, res, next) => {
    let { username, password } = req.body;
    let user = await accountModel.findOne({ username: username });
    if (!user) {
      throw new ErrorResponse(400, 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
    let checkPass = bcryptjs.compareSync(password, user.password);
    if (!checkPass) {
      throw new ErrorResponse(400, 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
    let payload = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };
    let token = jwt.sign(payload, configuration.SECRET_KEY, {
      expiresIn: '10h',
    });
    return res.status(200).json({
      ...payload,
      jwt: token,
    });
  },
};
