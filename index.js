require("express-async-errors");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const userRoute = require("./routers/user.routes");
const connectDB = require("./db/connect");
const doctorAppointmentRoute = require("./routers/doctorAppointment.route");
const paymentRoute = require("./routers/payment.router");
const hospitalAppointmentRoute = require("./routers/hospitalAppointment.route");

const app = express();

global.__baseDir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(fileUpload());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Seba Server");
});

// api routes
app.use("/", userRoute);
app.use("/api/doctor-appointment", doctorAppointmentRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/hospital-appointment", hospitalAppointmentRoute);

app.use((err, req, res, next) => {
  return res.status(500).send({ msg: err.message });
});

// db connection
const start = async () => {
  try {
    connectDB().then();
    app.listen(port, console.log(`app is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
