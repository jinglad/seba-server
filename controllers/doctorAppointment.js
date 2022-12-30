const DoctorAppointment = require("../models/doctorAppointment.model");
const { moveFile } = require("../utility");

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
    });
    res.status(201).json({ doctorAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDoctorAppointment,
};
