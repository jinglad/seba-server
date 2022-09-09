const express = require("express");
const { createToken, registerUser, getUser } = require("../controllers/user.controllers");

const router = express.Router();

router.route("/login").post(createToken);
router.route("/register").post(registerUser);
router.route("/user").get(getUser);

module.exports = router;