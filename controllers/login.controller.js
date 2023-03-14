const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountModel = require('../models/account.model');
const configuration = require('../configs/configuration');

module.exports.register = async (req, res) => {
  res.render('auth/sigup', { error: '' });
};

//login
module.exports.sigin = async (req, res) => {
  //   res.clearCookie('token');
  res.render('auth/sigin', { error: '' });
};
module.exports.login = async (req, res) => {
  const { ...body } = req.body;
  const account = await accountModel.findOne({
    username: body.username,
  });

  if (!account || !bcryptjs.compareSync(body.password, account?.password)) {
    return res.render('auth/sigin', { error: 'Sai tài khoản hoặc mật khẩu' });
  }
  let payload = {
    _id: account._id,
    username: account.username,
    role: account.role,
  };
  let token = jwt.sign(payload, configuration.SECRET_KEY, {
    expiresIn: '1h',
  });

  res.cookie('token', token, { maxAge: 3600, httpOnly: true });
  res.redirect('/home');
};
