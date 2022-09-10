const express = require("express");
const { createToken, registerUser, getUser } = require("../controllers/user.controllers");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/login").post(createToken);
router.route("/register").post(registerUser);
router.route("/user").get(verifyToken, getUser);

module.exports = router;