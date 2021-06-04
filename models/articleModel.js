const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    authors: {
      type: String,
      required: true,
    },
    subjectArea: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    organization: {
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

module.exports = mongoose.model('article', articleSchema);
