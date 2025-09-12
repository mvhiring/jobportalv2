
const userProfileService = require("../services/userProfile.service");
const sendResponse = require("../utils/response");

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT middleware sets req.user
    const profile = await userProfileService.updateProfile(userId, req.body);
    return sendResponse(res, 200, true, "Profile updated successfully", profile);
  } catch (err) {
    return sendResponse(res, 400, false, err.message);
  }
};

// ✅ Get Profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await userProfileService.getProfileById(userId);
    return sendResponse(res, 200, true, "Profile fetched successfully", profile);
  } catch (err) {
    return sendResponse(res, 404, false, err.message);
  }
};
