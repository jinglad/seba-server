const DoctorAppointment = require("../models/doctorAppointment.model");
const { moveFile, createTransactionId } = require("../utility");

const createDoctorAppointment = async (req, res) => {
  try {
    const file = req.files?.file;
    if (file) {
      moveFile(file).then();
    }
    const {
      fullName,
      email,
      department,
      doctor,
      gender,
      age,
      date,
      time,
      user,
      phone,
      price,
    } = req.body;
    const doctorAppointment = await DoctorAppointment.create({
      fullName,
      email,
      department,
      doctor,
      gender,
      age,
      date,
      time,
      report: file?.name,
      user: user,
      phone,
      price,
      transactionId: createTransactionId(),
    });
    res.status(201).json({ doctorAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorAppointment = async (req, res) => {
  try {
    const doctorAppointment = await DoctorAppointment.find();
    res.status(200).json({ doctorAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorAppointmentByUserId = async (req, res) => {
  // console.log("from getDoctorAppointmentByUserId = ", req.user._id);
  try {
    const doctorAppointment = await DoctorAppointment.find({
      user: req.user._id,
    });
    if (!doctorAppointment) {
      return res.status(404).json({ error: "No appointment found" });
    }
    return res.status(200).json({ doctorAppointment: doctorAppointment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getRecentDoctorAppointment = async (req, res) => {
  try {
    const doctorAppointment = await DoctorAppointment.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(1);
    res.status(200).json(doctorAppointment[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoctorAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorAppointment = await DoctorAppointment.findById({ _id: id });
    if (!doctorAppointment) {
      return res.status(404).json({ error: "No appointment found" });
    }
    return res.status(200).json(doctorAppointment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDoctorAppointment,
  getDoctorAppointment,
  getDoctorAppointmentByUserId,
  getRecentDoctorAppointment,
  getDoctorAppointmentById,
};
