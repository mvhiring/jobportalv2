const Joi = require("joi");

const createJobSchema = Joi.object({
  title: Joi.string().max(255).required(),
  company_id: Joi.number().integer().required(),

  location: Joi.string().allow("", null),

  job_type: Joi.string()
    .valid("Full-time", "Part-time", "Contract", "Internship", "Freelance")
    .required(),

  work_mode: Joi.string()
    .valid("On-site", "Remote", "Hybrid")
    .required(),

  experience: Joi.string().allow("", null), // e.g. "2+ years", "Fresher"

  salary: Joi.string().allow("", null),

  description: Joi.string().required(),

  requirements: Joi.array().items(Joi.string()).allow(null),
  responsibilities: Joi.array().items(Joi.string()).allow(null),
  benefits: Joi.array().items(Joi.string()).allow(null),
  skills: Joi.array().items(Joi.string()).min(1).required(),
  pre_questions:Joi.array().items(Joi.string()).allow(null),
  category: Joi.string().allow("", null),

  application_deadline: Joi.date().iso().required(),

  status: Joi.string().valid("open", "closed", "paused", "draft").default("open"),
});

module.exports = { createJobSchema };
