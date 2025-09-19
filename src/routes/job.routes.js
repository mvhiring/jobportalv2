const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// Create new job
router.post("/", jobController.createJob);

// Get job by ID
router.get("/:id", jobController.getJobById);

// Get all jobs (with filters & search)
router.post("/list", jobController.getAllJobs);

// Get jobs category wise
router.post("/category", jobController.getJobsByCategory);

router.delete("/delete/:id", authMiddleware, jobController.deleteJob);

router.put("/update/:id", authMiddleware,  jobController.updateJob);

module.exports = router;
