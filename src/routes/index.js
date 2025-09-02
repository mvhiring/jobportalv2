const express = require("express");
const router = express.Router();

router.use("/company", require("./company.routes"));
router.use("/jobs", require("./job.routes"));


module.exports = router;
