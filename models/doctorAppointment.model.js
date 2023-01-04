const mongoose = require("mongoose");

const DoctorAppointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
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
    age: {
      type: String,
      required: [true, "Age is required"],
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
      // required: [true, "Report is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    transactionId: {
      type: String,
      unique: true,
    },
    sessionKey: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorAppointment", DoctorAppointmentSchema);
