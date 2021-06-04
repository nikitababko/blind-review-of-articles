const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    degree: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    placeOfWork: {
      type: String,
      required: true,
    },
    currentCity: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('reviewer', reviewerSchema);
