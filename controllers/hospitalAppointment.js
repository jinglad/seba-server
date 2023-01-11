const HospitalAppointment = require("../models/hospitalAppointment.model");

const { moveFile, createTransactionId } = require("../utility");

const createHospitalAppointment = async (req, res) => {
  console.log("from createHospitalAppointment = ", req.body);

  try {
    const {
      name,
      email,
      hospital,
      test,
      gender,
      age,
      date,
      time,
      user,
      phone,
      price,
    } = req.body;
    const hospitalAppointment = await HospitalAppointment.create({
      fullName: name,
      email,
      hospital,
      test,
      gender,
      age,
      date,
      time,
      user,
      phone,
      price,
      transactionId: createTransactionId(),
    });
    res.status(201).json({ hospitalAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHospitalAppointment = async (req, res) => {
  try {
    const hospitalAppointment = await HospitalAppointment.find();
    res.status(200).json({ hospitalAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHospitalAppointmentByUserId = async (req, res) => {
  try {
    const hospitalAppointment = await HospitalAppointment.find({
      user: req.user._id,
    });
    if (!hospitalAppointment) {
      return res.status(404).json({ error: "No appointment found" });
    }
    res.status(200).json({ hospitalAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHospitalAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const hospitalAppointment = await HospitalAppointment.findById({ _id: id });
    if (!hospitalAppointment) {
      return res.status(404).json({ error: "No appointment found" });
    }
    res.status(200).json({ hospitalAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecentHospitalAppointment = async (req, res) => {
  try {
    const hospitalAppointment = await HospitalAppointment.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(1);
    res.status(200).json(hospitalAppointment[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHospitalAppointment,
  getHospitalAppointment,
  getHospitalAppointmentByUserId,
  getHospitalAppointmentById,
  getRecentHospitalAppointment,
};
