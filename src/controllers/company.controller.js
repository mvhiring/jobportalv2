const companyService = require("../services/company.service");
const sendResponse = require("../utils/response");

exports.createCompany = async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);
    return sendResponse(
      res,
      201,
      true,
      "Company created successfully",
      company
    );
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 10, filters = {} } = req.body;
    const companies = await companyService.getAllCompanies(page, limit, filters);

    return sendResponse(res, 200, true, "Companies fetched successfully", companies);
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};


exports.getCompanyById = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) return sendResponse(res, 404, false, "Company not found");
    return sendResponse(
      res,
      200,
      true,
      "Company fetched successfully",
      company
    );
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

exports.getDropdownValues = async (req, res) => {
  try {
    const company = await companyService.getDropdownValues(req.body);
    return sendResponse(
      res,
      200,
      true,
      "Data fetch",
      company
    );
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};
