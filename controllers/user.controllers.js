const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createToken = async (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.send({accessToken: token})
  } catch (error) {
    res.status(500).send({msg: "Login failed.", error: error.message});
  }
}

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({msg: "Registration successful."});
  } catch (error) {
    res.status(500).send({msg: "Registration failed.", error: error.message});
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({email:req.query.email});
    if(user) {
      res.status(200).send({user});
    } else {
      res.status(404).send({msg: "User not found."});
    }
  } catch (error) {
    res.status(500).send({ error: error.message});
  }
}

module.exports = {
  createToken,
  registerUser,
  getUser
}