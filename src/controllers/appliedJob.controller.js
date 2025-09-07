// controllers/appliedJob.controller.js
const appliedJobService = require("../services/appliedJob.service");
const sendResponse = require("../utils/response");

// ✅ Apply for a Job
exports.applyJob = async (req, res) => {
  try {
    const appliedJob = await appliedJobService.applyJob({
      job_id: req.body.job_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      resume: req.body.resume,
      cover_letter: req.body.cover_letter,
    });

    return sendResponse(res, 200, true, "Job applied successfully", appliedJob);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

// ✅ Admin - Get All Applied Jobs with Pagination
exports.getAllAppliedJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, filters = {} } = req.body;
    const appliedJobs = await appliedJobService.getAllAppliedJobs(page, limit, filters);

    return sendResponse(res, 200, true, "Applied jobs fetched successfully", appliedJobs);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};
