const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const authenticateToken = (req, res, next) => {
  // token get
  const authHeader = req.headers["authorization"];

  // Extract token from 'Bearer token'
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return sendResponse(res, 401, false, "Token required", null);
  }

  try {
    // verify token
    const decodedValue = jwt.verify(token, process.env.JWT_KEY);

    // Attach user information to the request object
    req.user = {
      id: decodedValue.id,
      role_id: decodedValue.role_id,
    };

    // Call the next middleware or rout handler
    next();
  } catch (error) {
    return sendResponse(res, 401, false, error.message, null);
  }
};

module.exports = authenticateToken;
