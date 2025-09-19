const express = require("express");
const router = express.Router();
const appliedJobController = require("../controllers/appliedJob.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ Candidate applies for a job
router.post("/",  appliedJobController.applyJob);

// // ✅ Admin - Get all applied jobs (with pagination & filters)
router.post("/list", authMiddleware, appliedJobController.getAllAppliedJobs);

// // ✅ Get single applied job by ID
// router.get("/:id", appliedJobController.getAppliedJobById);

router.post("/status-change", authMiddleware,  appliedJobController.updateAppliedJobStatus);

module.exports = router;
