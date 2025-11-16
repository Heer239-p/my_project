const User = require("../models/User");

exports.activatePlan = async (req, res) => {
  const { plan } = req.body;
  const user = req.user;

  if (!["FREE", "PREMIUM"].includes(plan)) return res.status(400).json({ message: "Invalid plan" });

  user.plan = plan;
  await user.save();

  res.json({ message: `Plan updated to ${plan}`, plan: user.plan });
};
