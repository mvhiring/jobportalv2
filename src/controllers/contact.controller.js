const contactService = require("../services/contact.service");
const sendEmail = require("../services/sendEmail");
const sendResponse = require("../utils/response");

exports.createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);
    const { full_name, email, subject, message } = req.body;
    const adminHtml = `
      <h2>📩 New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${full_name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    sendEmail("vivek7292932052@gmail.com", `New Contact Message from ${full_name}`, adminHtml)
      .then(() => console.log(`email sent to ${full_name}`))
      .catch((err) => console.error("Email sending failed:", err));
    return sendResponse(
      res,
      200,
      true,
      "Contact created successfully",
      contact
    );
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, filters = {} } = req.body;
    const contacts = await contactService.getAllContacts(page, limit, filters);

    return sendResponse(
      res,
      200,
      true,
      "Contacts fetched successfully",
      contacts
    );
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};
