const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return res.status(404).json({ message: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    //   await newUser.save();
    res.status(200).json({
      message: `Hello ${username}! Your account has been created! `,
      user: newUser,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

exports.signin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User Doesn't Exists" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Username Or Password not match",
      });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET || "secret_key",
      { algorithm: "HS256", allowInsecureKeySizes: true }
    );
    return res.status(200).json({
      message: "Login Successful!",
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
