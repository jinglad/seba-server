const mongoose = require("mongoose");

const DoctorAppointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: false,
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  doctor: {
    type: String,
    required: [true, "Doctor is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  report: {
    type: String,
    required: [true, "Report is required"],
  },
});

module.exports = mongoose.model("DoctorAppointment", DoctorAppointmentSchema);