const nodemailer = require("nodemailer");

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mvhirings@gmail.com", // Your Gmail address
    pass: "eqom pist vprv exvl",   // App password (not your Gmail password)
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
    // Verify connection
    transporter.verify((err, success) => {
      if (err) console.error("SMTP connection failed:", err);
      else console.log("✅ Gmail ready to send:", success);
    });

    const info = await transporter.sendMail({
      from: "mvhirings@gmail.com",
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
