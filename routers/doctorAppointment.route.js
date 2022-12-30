const express = require("express");
const { createDoctorAppointment } = require("../controllers/doctorAppointment");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").post(createDoctorAppointment);

module.exports = router;
