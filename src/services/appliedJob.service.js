const db = require("../models");
const { Op } = require("sequelize");
const sendEmail = require("./sendEmail");
const { hashPassword } = require("./auth.service");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendApplicationEmail = async (data, tempPassword = "Admin@123") => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${data.verification_token}`;
  const loginUrl = `${process.env.FRONTEND_URL}/login`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hello ${data.first_name || "Candidate"},</h2>
      <p>Thank you for applying to the job id "<strong>${
        data.job_title
      }</strong>".</p>

      <p>We noticed that you do not have an account with us yet. No worries! We have created a temporary account for you so that you can track your application status and explore more opportunities.</p>

      <h3>Your Account Details:</h3>
      <ul>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Temporary Password:</strong> ${tempPassword}</li>
      </ul>

      <p><strong>Next Steps:</strong></p>
      <ol>
        <li>Click the link below to verify your email and activate your account:
          <br/><a href="${verifyUrl}">Verify Email</a>
        </li>
        <li>Login using your email and the temporary password:
          <br/><a href="${loginUrl}">Login Here</a>
        </li>
        <li>Once logged in, you can view your application status, update your profile, and apply for more jobs.</li>
      </ol>

      <p style="color: #555; font-size: 0.9rem;">
        For security reasons, we recommend changing your password after your first login.
      </p>

      <p>Best regards,<br/>MV Solution Hub Team</p>
    </div>
  `;

  await sendEmail(data.email,"Your Job Application & Account Details", htmlContent);
};

exports.applyJob = async (data) => {
  try {
    // Optional: Prevent duplicate application by same email for same job
    const isAlreadyApplied = await db.AppliedJob.findOne({
      where: { job_id: data.job_id, email: data.email },
    });

    if (isAlreadyApplied) {
      throw new Error("You have already applied for this job");
    }

    const existing = await db.User.findOne({ where: { email: data.email } });
    if (!existing) {
      const hashed = await hashPassword("Admin@123");
      const token = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const user = await db.User.create({
        first_name: data.name,
        last_name: null,
        email: data.email,
        password: hashed,
        verification_token: token,
        verification_token_expiry: expiry,
      });

      data.verification_token = token;
      data.job_title = data.job_id; 

      // Send professional email
      sendApplicationEmail(data);
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
    const jobWhere = {};
    const companyWhere = {};
   if (filters.search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${filters.search}%` } },
        { email: { [Op.like]: `%${filters.search}%` } },
      ];
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

exports.updateAppliedJobStatus = async (id, newStatus) => {
  try {
    // find job application
    const appliedJob = await db.AppliedJob.findByPk(id);

    if (!appliedJob) {
     throw new Error("Application not found")
    }

    // update status
    appliedJob.status = newStatus;
    await appliedJob.save();

    return appliedJob;
  } catch (error) {
    throw new Error(error.message)
  }
};
