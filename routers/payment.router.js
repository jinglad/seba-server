const express = require("express");
const { initPayment, ipn } = require("../controllers/payment");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").get(verifyToken, initPayment);
router.route("/ipn").post(ipn);

module.exports = router;
