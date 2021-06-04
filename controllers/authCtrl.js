const Users = require('../models/userModel');
const Reviewer = require('../models/reviewerModel');
const Author = require('../models/authorModel');
const Article = require('../models/articleModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = {
  register: async (req, res) => {
    try {
      const {
        fullname,
        username,
        email,
        degree,
        rank,
        placeOfWork,
        currentCity,
        password,
        gender,
      } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, '');

      console.log(req.body);

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name)
        return res
          .status(400)
          .json({ msg: 'Этот никнейм уже существует.' });

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: 'Этот Email уже существует.' });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Пароль должен быть не менее 6 символов.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        degree,
        rank,
        placeOfWork: placeOfWork,
        currentCity,
        password: passwordHash,
        gender,
      });
      console.log(newUser);

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      await newUser.save();

      res.json({
        msg: 'Регистрация успешна!',
        access_token,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  reviewers: async (req, res) => {
    try {
      const { fullname, degree, rank, placeOfWork, currentCity } =
        req.body;

      console.log(req.body);

      const newReviewer = new Reviewer({
        fullname,
        degree,
        rank,
        placeOfWork,
        currentCity,
      });

      await newReviewer.save();

      res.json({
        msg: 'Успешно!',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  authors: async (req, res) => {
    try {
      const { fullname, degree, rank, placeOfWork, currentCity } =
        req.body;

      const newAuthor = new Author({
        fullname,
        degree,
        rank,
        placeOfWork,
        currentCity,
      });

      await newAuthor.save();

      res.json({
        msg: 'Успешно!',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  articles: async (req, res) => {
    try {
      const {
        name,
        authors,
        subjectArea,
        volume,
        lang,
        organization,
        currentCity,
      } = req.body;

      const newArticle = new Article({
        name,
        authors,
        subjectArea,
        volume,
        lang,
        organization,
        currentCity,
      });

      await newArticle.save();

      res.json({
        msg: 'Успешно!',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        'followers following',
        'avatar username fullname followers following'
      );

      const users = await Users.find();

      if (!user)
        return res
          .status(400)
          .json({ msg: 'Такого Email не существует.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Пароль не корректный.' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: 'Вы успешно вошли!',
        access_token,
        user: {
          ...user._doc,
          password: '',
        },
        users,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.json({ msg: 'Logged out!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Можете войти.' });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: 'Можете войти.' });

          const user = await Users.findById(result.id)
            .select('-password')
            .populate(
              'followers following',
              'avatar username fullname followers following'
            );

          if (!user)
            return res
              .status(400)
              .json({ msg: 'Это Email не существует.' });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = authCtrl;
