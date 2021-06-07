const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: String,
    authors: String,
    subjectArea: String,
    volume: String,
    lang: String,
    commentText: String,
    literacy: {
      type: Array,
      default: [0],
    },
    relevance: {
      type: Array,
      default: [0],
    },
    uniqueness: {
      type: Array,
      default: [0],
    },
    utility: {
      type: Array,
      default: [0],
    },
    organization: String,
    currentCity: String,
    content: String,
    images: {
      type: Array,
      required: true,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    // literacy: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('post', postSchema);
