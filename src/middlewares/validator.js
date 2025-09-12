const sendResponse = require("../utils/response");

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details[0].message;
    return sendResponse(res, 500, false, message, null);
  }
  next();
};

module.exports = validateSchema;
