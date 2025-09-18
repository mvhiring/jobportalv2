const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const validate = require("../middlewares/validator");
const { createContactSchema } = require("../validationSchema/contact.validator");

// Create new contact (public form submission)
router.post("/create", validate(createContactSchema), contactController.createContact);

// Get all contacts (with pagination + filters)
router.post("/list", contactController.getAllContacts);

module.exports = router;
