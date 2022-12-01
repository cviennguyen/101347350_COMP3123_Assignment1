const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(newUser._id);

    res.status(201).send({
      status: true,
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(401).send(err);
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({
        status: false,
        message: "Incorrect username ",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send({
        status: false,
        message: "Incorrect password",
      });
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: true,
      token,
    });
  } catch (err) {
    res.status(401).send({
      status: false,
      error: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  //1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send({
      status: false,
      message: "You are not logged in! Please log in to get access.",
    });
  }

  //2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).send({
      status: false,
      message: "The user belonging to this token does no longer exist.",
    });
  }
  //4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return res.status(401).send({
  //     status: false,
  //     message: "User recently changed password! Please log in again.",
  //   });
  // }
  req.user = currentUser;
  next();
};
