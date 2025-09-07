const db = require("../models");
const { Op } = require("sequelize");

// ✅ Candidate applies for a job
exports.applyJob = async (data) => {
  try {
    // Optional: Prevent duplicate application by same email for same job
    const isAlreadyApplied = await db.AppliedJob.findOne({
      where: { job_id: data.job_id, email: data.email },
    });

    if (isAlreadyApplied) {
      throw new Error("You have already applied for this job");
    }

    return await db.AppliedJob.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};


exports.getAllAppliedJobs = async (page, limit, filters) => {
  try {
    const offset = (page - 1) * limit;
    const where = {};

    if (filters.name) {
      where.name = { [Op.iLike]: `%${filters.name}%` };
    }
    if (filters.email) {
      where.email = { [Op.iLike]: `%${filters.email}%` };
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.job_id) {
      where.job_id = filters.job_id;
    }

    const { count, rows } = await db.AppliedJob.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
      include: [
        {
          model: db.Job,
          as: "job",
          include: [{ model: db.Company, as: "company" }],
        },
      ],
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

// ✅ Get Applied Job by ID
exports.getAppliedJobById = async (id) => {
  try {
    return await db.AppliedJob.findByPk(id, {
      include: [
        {
          model: db.Job,
          as: "job",
          include: [{ model: db.Company, as: "company" }],
        },
      ],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
