const express = require("express");
const { initPayment, ipn, paymentSuccess } = require("../controllers/payment");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").get(verifyToken, initPayment);
router.route("/ipn").post(ipn);
router.route("/success").post(paymentSuccess);

module.exports = router;
