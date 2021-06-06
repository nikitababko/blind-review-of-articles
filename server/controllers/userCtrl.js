const Users = require('../models/userModel');

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select('fullname username avatar');

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select('-password')
        .populate('followers following', '-password');
      if (!user)
        return res
          .status(400)
          .json({ msg: 'Пользователя не существует.' });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const user = await Users.find().select('-password');

      console.log(req.body);

      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        fullname,
        degree,
        rank,
        placeOfWork,
        currentCity,
        mobile,
        address,
        website,
        story,
        gender,
      } = req.body;

      console.log(req.body);

      if (!fullname)
        return res.status(400).json({ msg: 'Пожалуйста добавьте ФИО.' });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          fullname,
          degree,
          rank,
          placeOfWork,
          currentCity,
          mobile,
          address,
          website,
          story,
          gender,
        }
      );

      res.json({ msg: 'Обновление успешно!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  follow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0)
        return res
          .status(500)
          .json({ msg: 'Вы подписались на данного пользователя.' });

      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      ).populate('followers following', '-password');

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unfollow: async (req, res) => {
    try {
      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      ).populate('followers following', '-password');

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 10;

      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: 'users',
            localField: 'followers',
            foreignField: '_id',
            as: 'followers',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'following',
            foreignField: '_id',
            as: 'following',
          },
        },
      ]).project('-password');

      return res.json({
        users,
        result: users.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;