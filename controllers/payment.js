const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;
const User = require("../models/user.model");
const DoctorAppointment = require("../models/doctorAppointment.model");
const { Payment } = require("../models/payment.model");
const path = require("path");

const ipn = async (req, res) => {
  console.log(req.body);
  const payment = new Payment(req.body);
  const tran_id = payment["tran_id"];
  if (payment["status"] === "VALID") {
    await DoctorAppointment.findOneAndUpdate(
      { transactionId: tran_id },
      { status: "approved" },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    await DoctorAppointment.findOneAndUpdate(
      { transactionId: tran_id },
      { status: "rejected" },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  await payment.save();
};

const initPayment = async (req, res) => {
  let appointment = await DoctorAppointment.find({
    user: req.user._id,
  })
    .sort({ createdAt: -1 })
    .limit(1);

  const transID = appointment[0]?.transactionId;

  console.log("first trasid ", transID);

  const payment = new PaymentSession(
    true,
    process.env.SSLCOMMERZ_STORE_ID,
    process.env.SSLCOMMERZ_STORE_PASSWD
  );

  payment.setUrls({
    success: "https://seba-server.onrender.com/api/payment/success", // If payment Succeed
    fail: "yoursite.com/fail", // If payment failed
    cancel: "yoursite.com/cancel", // If user cancel payment
    ipn: "https://seba-server.onrender.com/api/payment/ipn", // SSLCommerz will send http post request in this link
  });

  payment.setOrderInfo({
    total_amount: appointment[0].price, // Number field
    currency: "BDT", // Must be three character string
    tran_id: transID, // Unique Transaction id
    emi_option: 0, // 1 or 0
  });

  payment.setCusInfo({
    name: appointment[0]?.fullName,
    email: appointment[0]?.email,
    add1: "66/A Midtown",
    add2: "Andarkilla",
    city: "Chittagong",
    state: "Optional",
    postcode: 4000,
    country: "Bangladesh",
    phone: appointment[0]?.phone,
    fax: appointment[0]?.phone,
  });

  payment.setShippingInfo({
    method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
    num_item: 1,
    name: appointment[0]?.fullName,
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

  const response = await payment.paymentInit();
  if (response.status === "SUCCESS") {
    console.log("second trasid ", transID);
    console.log("response ", response);
    await DoctorAppointment.findOneAndUpdate(
      { _id: appointment[0]._id },
      {
        transactionId: response?.tran_id,
        sessionKey: response?.sessionkey,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  return res.status(200).json(response);
};

const paymentSuccess = async (req, res) => {
  res.sendFile(path.join(__baseDir + "public/success.html"));
};

module.exports = {
  initPayment,
  ipn,
  paymentSuccess,
};
