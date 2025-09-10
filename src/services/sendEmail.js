const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mvsolutionshub.com", // or mail.yourdomain.com
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
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
      from: process.env.SMTP_USER,
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
