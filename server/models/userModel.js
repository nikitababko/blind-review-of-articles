const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      // maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    degree: {
      type: String,
      // required: true,
    },
    rank: {
      type: String,
      // required: true,
    },
    subjectArea: {
      type: String,
      // required: true,
    },
    placeOfWork: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    currentCity: {
      type: String,
      // required: true,
    },
    specialty: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/nikitababko/image/upload/v1616588775/Avatars/avatar_g5b8fp.png',
    },
    role: { type: String, default: 'user' },
    gender: { type: String, default: 'Автор' },
    mobile: { type: String, default: '' },
    address: { type: String, default: '' },
    story: {
      type: String,
      default: '',
      // maxlength: 1200,
    },
    website: { type: String, default: '' },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    saved: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
