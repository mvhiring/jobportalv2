const db = require("../models");
const { Op } = require("sequelize");

// ✅ Create Job
exports.createJob = async (data) => {
  return await db.Job.create(data);
};

// ✅ Get Job by ID
exports.getJobById = async (id) => {
  return await db.Job.findByPk(id, {
    include: [{ model: db.Company, as: "company" }]
  });
};

// ✅ Get All Jobs with filters, search & location
exports.getAllJobs = async (page, limit, filters, search) => {
  const offset = (page - 1) * limit;
  const where = {};

  // Search in title or description
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } }
    ];
  }

  // Location filter
  if (filters.location) {
    where.location = { [Op.iLike]: `%${filters.location}%` };
  }

  // Job type filter
  if (filters.type) {
    where.type = { [Op.contains]: [filters.type] }; // PostgreSQL ARRAY support
  }

  // Experience filter
  if (filters.experience_level) {
    where.experience_level = filters.experience_level;
  }

  // Status filter
  if (filters.status) {
    where.status = filters.status;
  }

  const { count, rows } = await db.Job.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["created_at", "DESC"]],
    include: [{ model: db.Company, as:"company"}]
  });

  return {
    total: count,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(count / limit),
    jobs: rows,
  };
};

// ✅ Get Jobs by Category
exports.getJobsByCategory = async (category, page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await db.Job.findAndCountAll({
    where: { industry_type: category }, // Assuming category comes from company's industry
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["created_at", "DESC"]],
    include: [{ model: db.Company, as: "company" }]
  });

  return {
    total: count,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(count / limit),
    jobs: rows,
  };
};
