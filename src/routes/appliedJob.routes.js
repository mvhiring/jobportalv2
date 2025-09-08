const express = require("express");
const router = express.Router();
const appliedJobController = require("../controllers/appliedJob.controller");

// ✅ Candidate applies for a job
router.post("/", appliedJobController.applyJob);

// // ✅ Admin - Get all applied jobs (with pagination & filters)
router.post("/list", appliedJobController.getAllAppliedJobs);

// // ✅ Get single applied job by ID
// router.get("/:id", appliedJobController.getAppliedJobById);

module.exports = router;
