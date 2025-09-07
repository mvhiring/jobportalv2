const db = require("../models");

exports.createCompany = async (data) => {
  try {
    const isEmailPresent = await db.Company.findOne({
      where: { email: data.email },
    });

    if (isEmailPresent) {
      throw new Error("Company with this email already exists");
    }
    return await db.Company.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllCompanies = async (page, limit, filters) => {
  try {
    const offset = (page - 1) * limit;
    const where = {};

    if (filters.name) {
      where.name = { [Op.iLike]: `%${filters.name}%` }; // case-insensitive search
    }
    if (filters.industry_type) {
      where.industry_type = filters.industry_type;
    }
    if (filters.verification_status) {
      where.verification_status = filters.verification_status;
    }
    if (filters.company_type) {
      where.company_type = filters.company_type;
    }

    const { count, rows } = await db.Company.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
    });
    return {
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getCompanyById = async (id) => {
  try {
    return await db.Company.findByPk(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getDropdownValues = async (filterOption = {}) => {
  try {
    const { isCompanyList } = filterOption;
    const result = {};
    if (isCompanyList) {
      const companyList = await db.Company.findAll({
        where: {
          is_active: true,
        },
      });
      result.companyList = companyList;
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
