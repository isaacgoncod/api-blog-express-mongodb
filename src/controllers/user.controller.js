const User = require("../models/User");
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

module.exports = {
  update,
};
