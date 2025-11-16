const express = require("express");
const router = express.Router();
const { activatePlan } = require("../controllers/subscriptionController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/activate", authenticate, activatePlan);

module.exports = router;
