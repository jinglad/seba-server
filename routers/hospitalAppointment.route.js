const express = require("express");
const {
  createHospitalAppointment,
  getHospitalAppointmentByUserId,
  getRecentHospitalAppointment,
  getHospitalAppointmentById,
} = require("../controllers/hospitalAppointment");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").post(verifyToken, createHospitalAppointment);
router
  .route("/hospital-appointment-by-user-id")
  .get(verifyToken, getHospitalAppointmentByUserId);

router
  .route("/recent-hospital-appointment")
  .get(verifyToken, getRecentHospitalAppointment);

router.route("/:id").get(verifyToken, getHospitalAppointmentById);

module.exports = router;
