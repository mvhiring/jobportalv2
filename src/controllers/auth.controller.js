const authService = require("../services/auth.service");
const sendResponse = require("../utils/response");

// ✅ Register
exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    return sendResponse(res, 200, true, "Registration successful. Please check your email to verify.", user);
  } catch (err) {
    return sendResponse(res, 400, false, err.message);
  }
};

// ✅ Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await authService.verifyEmail(token);
    return sendResponse(res, 200, true, "Email verified successfully", user);
  } catch (err) {
    return sendResponse(res, 400, false, err.message);
  }
};

// ✅ Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    return sendResponse(res, 200, true, "Login successful", { user, token });
  } catch (err) {
    return sendResponse(res, 400, false, err.message);
  }
};
