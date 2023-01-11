const { Schema, model } = require("mongoose");

const HospitalAppointmentSchema = new Schema(
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
    hospital: {
      type: String,
      required: [true, "Hospital is required"],
    },
    test: {
      type: String,
      required: [true, "Test is required"],
    },
    age: {
      type: String,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
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

module.exports = model("HospitalAppointment", HospitalAppointmentSchema);
