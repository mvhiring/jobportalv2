const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfile.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validator");
const { updateProfileSchema } = require("../validationSchema/userProfile.shcema");

// Update Profile (logged-in user)
router.put(
  "/profile",
  authMiddleware,
  validate(updateProfileSchema),
  userProfileController.updateProfile
);

// Get Profile by User ID
router.get("/profile/:userId", userProfileController.getProfileById);

module.exports = router;
