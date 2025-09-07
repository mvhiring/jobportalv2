const db = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generateToken } = require("../utils/jwt");
const nodemailer = require("nodemailer");

// Hash password
const hashPassword = async (password) => await bcrypt.hash(password, 10);

// Compare password
const comparePassword = async (password, hash) => await bcrypt.compare(password, hash);

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
//   await transporter.sendMail({
//     from: process.env.SMTP_USER,
//     to: data.email,
//     subject: "Verify your email",
//     html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
//   });

  return user?.id;
};

// ✅ Verify Email
exports.verifyEmail = async (token) => {
  const user = await db.User.findOne({ where: { verification_token: token } });
  if (!user) throw new Error("Invalid or expired token");

  if (user.verification_token_expiry < new Date()) throw new Error("Token expired");

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
    email: user.email
  }
  return { user:userInfo, token };
};
