const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;
const User = require("../models/user.model");

const ipn = async (req, res) => {
  console.log(req.body);
};

const initPayment = async (req, res) => {
  const user = await User.findOne({ _id: req.body.user });

  const transID =
    "_" +
    Math.random().toString(36).substr(2, 9) +
    new Date().getTime().toString(36);

  const payment = new PaymentSession(
    true,
    process.env.SSLCOMMERZ_STORE_ID,
    process.env.SSLCOMMERZ_STORE_PASSWD
  );

  payment.setUrls({
    success: "yoursite.com/success", // If payment Succeed
    fail: "yoursite.com/fail", // If payment failed
    cancel: "yoursite.com/cancel", // If user cancel payment
    ipn: "yoursite.com/ipn", // SSLCommerz will send http post request in this link
  });

  payment.setOrderInfo({
    total_amount: 700, // Number field
    currency: "BDT", // Must be three character string
    tran_id: transID, // Unique Transaction id
    emi_option: 0, // 1 or 0
  });

  payment.setCusInfo({
    name: "Jihan",
    email: "jihanchowdhury70@gmail.com",
    add1: "66/A Midtown",
    add2: "Andarkilla",
    city: "Chittagong",
    state: "Optional",
    postcode: 4000,
    country: "Bangladesh",
    phone: "01700000000",
    fax: "01700000000",
  });

  payment.setShippingInfo({
    method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
    num_item: 1,
    name: "Jihan",
    add1: "66/A Midtown",
    add2: "Andarkilla",
    city: "Chittagong",
    state: "Optional",
    postcode: 4000,
    country: "Bangladesh",
  });

  payment.setProductInfo({
    product_name: "Seba Online Appointment",
    product_category: "General",
    product_profile: "general",
  });

  payment.paymentInit().then((response) => {
    res.status(200).json(response);
  });
};

module.exports = {
  initPayment,
  ipn,
};
