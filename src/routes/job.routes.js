const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");

// Create new job
router.post("/", jobController.createJob);

// Get job by ID
router.get("/:id", jobController.getJobById);

// Get all jobs (with filters & search)
router.post("/list", jobController.getAllJobs);

// Get jobs category wise
router.post("/category", jobController.getJobsByCategory);

module.exports = router;
