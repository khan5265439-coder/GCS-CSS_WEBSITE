const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  event: { type: String, required: true },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Registration", RegistrationSchema);