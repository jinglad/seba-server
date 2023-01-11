const express = require("express");
const {
  initPayment,
  ipn,
  paymentSuccess,
  intiPaymentHospital,
  hospitalIpn,
} = require("../controllers/payment");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").get(verifyToken, initPayment);
router.route("/ipn").post(ipn);
router.route("/success").post(paymentSuccess);
router.route("/hospital").get(verifyToken, intiPaymentHospital);
router.route("/hospital/ipn").post(hospitalIpn);

module.exports = router;
