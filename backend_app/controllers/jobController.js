const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

// CREATE JOB (company)
exports.createJob = async (req, res) => {
  const user = req.user;
  const { title, description, location, salary, skills } = req.body;

  if (user.role !== "company") return res.status(403).json({ message: "Only company can post jobs" });

  const job = await Job.create({ companyId: user._id, company: user.name, title, description, location, salary, skills });
  res.json(job);
};

// GET ALL JOBS
exports.getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

// GET JOB BY ID
exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

// APPLY JOB (jobseeker)
exports.applyJob = async (req, res) => {
  const user = req.user;
  if (user.role !== "jobseeker") return res.status(403).json({ message: "Only jobseeker can apply" });

  const { jobId, coverLetter } = req.body;
  const exists = await Application.findOne({ jobId, userId: user._id });
  if (exists) return res.status(400).json({ message: "Already applied" });

  const app = await Application.create({ jobId, userId: user._id, coverLetter });
  res.json(app);
};

// GET USER APPLICATIONS (jobseeker)
exports.getUserApplications = async (req, res) => {
  const apps = await Application.find({ userId: req.user._id }).populate("jobId");
  res.json(apps);
};

// GET JOB APPLICANTS (company)
exports.getApplicantsForJob = async (req, res) => {
  const user = req.user;
  const jobId = req.params.jobId;

  const job = await Job.findById(jobId);
  if (!job || job.companyId.toString() !== user._id.toString())
    return res.status(403).json({ message: "Access denied" });

  const apps = await Application.find({ jobId }).populate("userId");
  const result = apps.map(a => ({
    id: a._id,
    userName: a.userId.name,
    email: a.userId.email,
    coverLetter: a.coverLetter,
    status: a.status,
  }));

  res.json(result);
};
