const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  coverLetter: String,
  status: { type: String, enum: ["Applied", "Reviewed", "Accepted", "Rejected"], default: "Applied" },
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
