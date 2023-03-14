const jwt = require('jsonwebtoken');

const exModel = require('../models/Excavator.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const configuration = require('../configs/configuration');

module.exports = {
  renderHome: async (req, res) => {
    const token = req.cookies['token'];
    if (!token) {
      throw new ErrorResponse(404, 'Invalid token');
    }
    const decode = jwt.verify(token, configuration.SECRET_KEY);
    const excavators = await exModel.find({
      idAcc: decode._id,
    });

    res.render('home', { excavators: excavators });
  },
};
