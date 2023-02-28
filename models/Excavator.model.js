const mongoose = require('mongoose');

const excavatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      default: '0,0',
    },
    idAcc: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('excavator', excavatorSchema);
