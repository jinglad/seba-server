const { User, validate } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const createToken = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ msg: "User not found." });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ msg: "Invalid password." });
    }

    const token = user.geneRateAuthToken();
    return res.status(200).send({
      accessToken: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send({ msg: "Login failed.", error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send({ msg: error.details[0].message });
  }
  let user = {};
  user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({ msg: "User already registered." });
  }

  user = new User(_.pick(req.body, ["name", "email", "password", "role"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const token = user.geneRateAuthToken();
  try {
    // const user = await User.create(req.body);
    const result = await user.save();
    res.status(201).send({
      msg: "Registration successful.",
      user: _.pick(result, ["_id", "name", "email", "role"]),
      token: token,
    });
  } catch (error) {
    res.status(500).send({ msg: "Registration failed.", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    if (user) {
      res.status(200).send({ user });
    } else {
      res.status(404).send({ msg: "User not found." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// function to get all user except password property

const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    const modifyUser = user.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      };
    });
    if (user) {
      res.status(200).send({ users: modifyUser });
    } else {
      res.status(404).send({ msg: "No user found." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createToken,
  registerUser,
  getUser,
  getAllUser,
};
