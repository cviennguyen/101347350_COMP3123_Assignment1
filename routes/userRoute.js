const express = require("express");
const User = require("../models/userModel");
const routes = express.Router();
const bcrypt = require("bcrypt");

routes.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    res.status(201).send({
      status: true,
      message: "Sign up successful",
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

routes.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword);
    if (!user || !validPassword) {
      res.status(401).send({
        status: false,
        message: "Username or password is incorrect",
      });
    } else {
      res.status(200).send({
        status: true,
        username: user.username,
        message: "Login successful",
      });
    }
  } catch (err) {
    res.status(401).send({
      status: false,
      error: err,
    });
  }
});

module.exports = routes;
