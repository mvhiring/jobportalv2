const db = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generateToken } = require("../utils/jwt");
const nodemailer = require("nodemailer");
const sendEmail = require("./sendEmail");

// Hash password
const hashPassword = async (password) => await bcrypt.hash(password, 10);

// Compare password
const comparePassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

// Email transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ Register User
exports.registerUser = async (data) => {
  const existing = await db.User.findOne({ where: { email: data.email } });
  if (existing) throw new Error("Email already exists");

  const hashed = await hashPassword(data.password);

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hrs

  const user = await db.User.create({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: hashed,
    verification_token: token,
    verification_token_expiry: expiry,
  });

  // Send email
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  let html = `
  <!-- HTML Email (mobile-responsive) -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Verify your email</title>

    <!-- Preview text (hidden in email body but shown in inbox preview) -->
    <style>
      .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; }
      /* Basic reset */
      body,table,td,a{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
      table,td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
      img{ -ms-interpolation-mode:bicubic; }
      body{ margin:0; padding:0; width:100% !important; height:100% !important; background-color:#f4f6f8; font-family:system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
      .email-container{ max-width:600px; margin:0 auto; }
      .btn{
        display:inline-block;
        padding:12px 20px;
        border-radius:8px;
        text-decoration:none;
        font-weight:600;
      }
      /* Responsive */
      @media screen and (max-width:480px) {
        .stack { display:block !important; width:100% !important; }
        .p-sm { padding:16px !important; }
      }
    </style>
  </head>

  <body>
    <!-- Preview text -->
    <div class="preheader">Confirm your email address to complete registration.</div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
            <!-- Header / Branding -->
            <tr>
              <td style="padding:24px; text-align:center; background: linear-gradient(90deg,#0f172a,#0ea5a3); color:#ffffff;">
                <!-- Replace src with your logo -->
                <img src="https://via.placeholder.com/120x40?text=LOGO" width="120" height="40" alt="Company logo" style="display:block;margin:0 auto 12px auto;">
                <h1 style="margin:0;font-size:20px;line-height:1.2;font-weight:700;">Welcome to <span style="color:#fff">YourCompany</span></h1>
                <p style="margin:8px 0 0;font-size:13px;opacity:0.92;">Please confirm your email to activate your account</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 32px;" class="p-sm">
                <p style="margin:0 0 16px;font-size:15px;color:#0f172a;">Hi there,</p>

                <p style="margin:0 0 20px;font-size:15px;color:#334155;">
                  Thanks for registering with <strong>YourCompany</strong>. Click the button below to verify your email address and finish setting up your account.
                </p>

                <!-- CTA -->
                <div style="text-align:center;margin:26px 0;">
                  <!-- Replace the href value with the verifyUrl variable value in your code -->
                  <a href="${verifyUrl}" class="btn" style="background:#0ea5a3;color:#ffffff;border-radius:10px;">Verify your email</a>
                </div>

                <p style="margin:0 0 8px;font-size:13px;color:#64748b;">
                  If the button doesn't work, copy and paste the following link into your browser:
                </p>

                <!-- Fallback link -->
                <p style="word-break:break-all;margin:0 0 18px;font-size:13px;color:#0f172a;">
                  <a href="${verifyUrl}" style="color:#0ea5a3;text-decoration:underline;">${verifyUrl}</a>
                </p>

                <hr style="border:none;border-top:1px solid #eef2f7;margin:18px 0;">

                <p style="margin:0 0 8px;font-size:13px;color:#475569;">
                  Didn't create an account with us? No problem — you can safely ignore this email or contact our support team.
                </p>

                <p style="margin:12px 0 0;font-size:13px;color:#475569;">
                  This link will expire in 24 hours.
                </p>

                <!-- Signature -->
                <div style="margin-top:18px;">
                  <p style="margin:0;font-size:13px;color:#334155;">Cheers,<br><strong>YourCompany Team</strong></p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:18px 24px;text-align:center;font-size:12px;color:#94a3b8;">
                <p style="margin:0 0 8px;">Need help? <a href="mailto:support@Mv Hiring.com" style="color:#0ea5a3;text-decoration:none;">support@yourcompany.com</a></p>
                <p style="margin:0;">© ${new Date().getFullYear()} MV Hiring. All rights reserved.</p>

                <p style="margin:10px 0 0;">
                  <a href="${
                    process.env.FRONTEND_URL
                  }/privacy" style="color:#94a3b8;text-decoration:underline;margin-right:10px;">Privacy</a> |
                  <a href="${
                    process.env.FRONTEND_URL
                  }/terms" style="color:#94a3b8;text-decoration:underline;margin-left:10px;">Terms</a>
                </p>
              </td>
            </tr>
          </table>

          <!-- Small disclaimer area -->
          <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin-top:14px;">
            <tr>
              <td style="font-size:11px;color:#9aa4b2;text-align:center;padding:8px 12px;">
                If you no longer want to receive these emails, you can <a href="${
                  process.env.FRONTEND_URL
                }/unsubscribe" style="color:#0ea5a3;text-decoration:underline;">unsubscribe</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
  sendEmail(data.email, "Verify your email", html)
    .then(() => console.log(`📧 Verification email sent to ${data.email}`))
    .catch((err) => console.error("❌ Email sending failed:", err));
  return user?.id;
};

// ✅ Verify Email
exports.verifyEmail = async (token) => {
  const user = await db.User.findOne({ where: { verification_token: token } });
  if (!user) throw new Error("Invalid or expired token");

  if (user.verification_token_expiry < new Date())
    throw new Error("Token expired");

  user.is_verified = true;
  user.verification_token = null;
  user.verification_token_expiry = null;
  await user.save();

  return user.id;
};

// ✅ Login
exports.loginUser = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");
  if (!user.is_verified) throw new Error("Email not verified");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken({ id: user.id, email: user.email });
  const userInfo = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role_id,
    email: user.email,
  };
  return { user: userInfo, token };
};
