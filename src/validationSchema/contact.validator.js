const Joi = require("joi");

exports.createContactSchema = Joi.object({
  full_name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(3).max(150).required(),
  message: Joi.string().min(5).required(),
});
