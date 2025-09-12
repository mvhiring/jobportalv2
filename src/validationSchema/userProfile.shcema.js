const Joi = require("joi");

const personalInfoSchema = Joi.object({
  profile_pic: Joi.string().uri().allow(null, ""),
  current_role: Joi.string().max(100).allow(null, ""),
  total_experience: Joi.string().max(50).allow(null, ""),
  location: Joi.string().max(100).allow(null, ""),
  state: Joi.string().max(100).allow(null, ""),
  industry: Joi.string().max(100).allow(null, ""),
  area_of_expertise: Joi.string().max(200).allow(null, ""),
  linkedinUrl: Joi.string().uri().allow(null, ""),
  githubUrl: Joi.string().uri().allow(null, ""),
  resume: Joi.string().allow(null, ""),
  profile_visibility: Joi.boolean().default(true),
  open_to_work: Joi.boolean().default(false),
  contact_info_show: Joi.boolean().default(false),
});

const workExperienceSchema = Joi.object({
  position_title: Joi.string().max(100).required(),
  companyName: Joi.string().max(100).required(),
  company_add: Joi.string().max(200).allow(null, ""),
  start_date: Joi.date().required(),
  end_date: Joi.date().allow(null),
  is_current_working: Joi.boolean().default(false),
  jobdescription: Joi.string().allow(null, ""),
  skill_used: Joi.string().allow(null, ""), // comma-separated string
});

const educationSchema = Joi.object({
  school_name: Joi.string().max(200).required(),
  degree: Joi.string().max(100).required(),
  degree_subtitle: Joi.string().max(100).allow(null, ""),
  university: Joi.string().max(200).required(),
  start_at: Joi.string().max(10).allow(null, ""), // could be year or full date
  end_at: Joi.string().max(10).allow(null, ""),
  grade: Joi.string().max(20).allow(null, ""),
});

const projectSchema = Joi.object({
  title: Joi.string().max(150).required(),
  sub_title: Joi.string().max(200).allow(null, ""),
  tech_stack: Joi.string().max(200).allow(null, ""),
  url: Joi.string().uri().allow(null, ""),
});

// ✅ Main Update Schema
const updateProfileSchema = Joi.object({
  personal_info: personalInfoSchema.optional(),
  work_experience: Joi.array().items(workExperienceSchema).optional(),
  education: Joi.array().items(educationSchema).optional(),
  skills: Joi.array().items(Joi.string().max(50)).optional(),
  projects: Joi.array().items(projectSchema).optional(),
});

module.exports = { updateProfileSchema };
