const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

router.post("/", companyController.createCompany);
router.get("/:id", companyController.getCompanyById);
router.post("/list", companyController.getAllCompanies);
router.post("/dropdown-list", companyController.getDropdownValues);

module.exports = router;
