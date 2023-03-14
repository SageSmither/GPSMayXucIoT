const ErrorResponse = require('../helpers/ErrorResponse');
const hisModel = require('../models/activity.history.model');
const exModel = require('../models/Excavator.model');

module.exports = {
  getHisOfEx: async (req, res) => {
    const idAcc = req.account._id;
    const idEx = req.params.id;

    const ex = await exModel.findOne({
      _id: idEx,
      idAcc: idAcc,
    });

    if (!ex) {
      throw new ErrorResponse(404, 'Not found');
    }

    let perPage = 30;
    let page = req.query.page || 1;

    const his = await hisModel
      .find({ idEx: idEx })
      .sort('-createdAt')
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await hisModel.countDocuments({ idEx: idEx });

    return res.status(200).json({
      current_page: page,
      total_page: Math.ceil(count / perPage),
      histories: his,
    });
  },
  createHisOfEx: async ({ body }) => {
    const newHis = await hisModel.create(body);
    return newHis;
  },
  deleteHis: async (req, res) => {
    const id = req.params.id;
    const result = await hisModel.findByIdAndDelete(id);
    return res.status(200).json(result);
  },
};
