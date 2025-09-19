const jobService = require("../services/job.service");
const sendResponse = require("../utils/response");

// ✅ Create Job
exports.createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body);
    return sendResponse(res, 200, true, "Job created successfully", job);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

// ✅ Get Job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) return sendResponse(res, 404, false, "Job not found");
    return sendResponse(res, 200, true, "Job fetched successfully", job);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

// ✅ Get All Jobs (with filters, search, location)
exports.getAllJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, filters = {}, search = "" } = req.body;
    const jobs = await jobService.getAllJobs(page, limit, filters, search);
    return sendResponse(res, 200, true, "Jobs fetched successfully", jobs);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

// ✅ Get Jobs by Category
exports.getJobsByCategory = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.body;
    const jobs = await jobService.getJobsByCategory(category, page, limit);
    return sendResponse(res, 200, true, "Jobs fetched successfully", jobs);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

// ✅ Delete Job by ID
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params; 
    const result = await jobService.deleteJobById(id);

    return sendResponse(res, 200, true, "Job deleted successfully", result);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

// ✅ Update Job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params; // job ID from URL
    const updatedJob = await jobService.updateJobById(id, req.body);

    return sendResponse(res, 200, true, "Job updated successfully", updatedJob);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

