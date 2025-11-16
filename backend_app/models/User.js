const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["jobseeker", "company"], required: true },
  profile: {
    skills: [String],
    location: String,
    resume: String,
    companyName: String,
    about: String
  },
  plan: { type: String, enum: ["FREE", "PREMIUM"], default: "FREE" },
  refreshToken: String,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
