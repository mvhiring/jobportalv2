const express = require("express");
const router = express.Router();

router.use("/company", require("./company.routes"));
router.use("/jobs", require("./job.routes"));
router.use("/applied-jobs", require("./appliedJob.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/test", (req, res)=>{res.json("Welcome to app")});
module.exports = router;
