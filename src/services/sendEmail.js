const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mvsolutionshub.com", // or mail.yourdomain.com
  port: 587,
  secure: false,
  auth: {
    user:"noreply@mvsolutionshub.com",
    pass: "Admin@1234",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Send email
 * @param {string} to - Recipient email
 * @param {string} subject - Subject of email
 * @param {string} html - Email content
 */
const sendEmail = async (to, subject, html) => {
  try {

    const info = await transporter.sendMail({
      from: "noreply@mvsolutionshub.com",
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
