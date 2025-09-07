const express = require("express");
const router = express.Router();

router.use("/company", require("./company.routes"));
router.use("/jobs", require("./job.routes"));
router.use("/applied-jobs", require("./appliedJob.routes"));

module.exports = router;
