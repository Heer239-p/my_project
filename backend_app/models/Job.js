const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: String,
  title: String,
  description: String,
  location: String,
  salary: String,
  skills: [String],
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
