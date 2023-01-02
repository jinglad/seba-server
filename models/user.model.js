const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

UserSchema.methods.geneRateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "365d" }
  );
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

module.exports.User = mongoose.model("User", UserSchema);
module.exports.validate = validateUser;
