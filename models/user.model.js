const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "full name is required"]
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique:false,
  },
})

module.exports = mongoose.model('User', UserSchema);