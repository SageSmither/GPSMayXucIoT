const ErrorResponse = require('../helpers/ErrorResponse');
const excavatorModel = require('../models/Excavator.model');

module.exports = {
  getAllExcavator: async (req, res) => {
    const excavators = await excavatorModel.find();
    return res.status(200).json(excavators);
  },
  createExcavator: async (req, res) => {
    const { ...body } = req.body;
    body.idAcc = req.account._id;
    const newExcavator = await excavatorModel.create(body);
    return res.status(201).json(newExcavator);
  },
  updateExcavator: async (req, res) => {
    const id = req.params.id;
    const { ...body } = req.body;
    const ex = await excavatorModel.findOne({
      _id: id,
      idAcc: req.account._id,
    });
    if (!ex) {
      throw new ErrorResponse(404, 'not found');
    }
    const updatedEx = await excavatorModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updatedEx);
  },
  deleteExcavator: async (req, res) => {
    const id = req.params.id;
    const ex = await excavatorModel.findOne({
      _id: id,
      idAcc: req.account._id,
    });
    if (!ex) {
      throw new ErrorResponse(404, 'not found');
    }
    const result = await excavatorModel.findByIdAndDelete(id);
    return res.status(200).json(result);
  },
  findById: async (req, res) => {
    const id = req.params.id;
    const result = await excavatorModel.findById(id);
    return res.status(200).json(result);
  },
  findByIdAccount: async (req, res) => {
    const idAcc = req.params.id_acc;
    const exs = await excavatorModel.find({
      idAcc: idAcc,
    });
    return res.status(200).json(exs);
  },
};
