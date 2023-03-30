const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPass,
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const login = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "Wrong credentials!" });
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      return res.status(400).json({ message: "Wrong credentials!" });
    }

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  register,
  login,
};
