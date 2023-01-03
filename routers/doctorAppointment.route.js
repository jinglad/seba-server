const express = require("express");
const {
  createDoctorAppointment,
  getDoctorAppointmentByUserId,
  getRecentDoctorAppointment,
  getDoctorAppointmentById,
} = require("../controllers/doctorAppointment");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").post(createDoctorAppointment);
router
  .route("/doctor-appointment-by-user-id")
  .get(verifyToken, getDoctorAppointmentByUserId);

router
  .route("/recent-doctor-appointment")
  .get(verifyToken, getRecentDoctorAppointment);

router.route("/:id").get(verifyToken, getDoctorAppointmentById);

module.exports = router;
