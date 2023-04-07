const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const update = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (userId === id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(202).json(updateUser);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    return res
      .status(401)
      .json({ message: "You can update only your account!" });
  }
};

const deleteUserAndPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (userId === id) {
    try {
      const user = await User.findById(id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(id);

        res.status(204).json({ message: "User has been deleted" });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } catch (err) {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "You can delete only your account!" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  update,
  deleteUserAndPost,
  getUser,
};
