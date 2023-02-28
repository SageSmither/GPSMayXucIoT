const mongoose = require('mongoose');

const activityHistorySchema = new mongoose.Schema(
  {
    status: {
      type: Number,
      default: 0,
    },
    time_worker: {
      type: Number,
    },
    time_off: {
      type: Number,
    },
    idEx: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'excavator',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('activityHistory', activityHistorySchema);
