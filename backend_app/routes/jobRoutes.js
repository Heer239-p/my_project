const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.post("/create", authenticate, jobController.createJob);
router.post("/apply", authenticate, jobController.applyJob);
router.get("/myapplications", authenticate, jobController.getUserApplications);
router.get("/applicants/:jobId", authenticate, jobController.getApplicantsForJob);

module.exports = router;
