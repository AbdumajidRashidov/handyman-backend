const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");

exports.registerUser = async (
  phoneNumber,
  firstName,
  lastName,
  email,
  password
) => {
  const existingUser = await User.findByPhoneNumber(phoneNumber);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create(phoneNumber, firstName, lastName, email, hashedPassword);
};

exports.loginUser = async (phoneNumber, password) => {
  const user = await User.findByPhoneNumber(phoneNumber);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// In-memory token blacklist (replace with Redis or a database in production)
const tokenBlacklist = new Set();

exports.addToBlacklist = (token) => {
  tokenBlacklist.add(token);
};

exports.isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};

// You might already have this function in your auth middleware
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

// In-memory storage for refresh tokens (replace with a database in production)
const refreshTokens = new Map();

exports.generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

exports.generateRefreshToken = (userId) => {
  const refreshToken = crypto.randomBytes(40).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  refreshTokens.set(refreshToken, { userId, expiresAt });
  return refreshToken;
};

exports.verifyRefreshToken = (refreshToken) => {
  const storedToken = refreshTokens.get(refreshToken);
  if (!storedToken) return null;

  if (new Date() > storedToken.expiresAt) {
    refreshTokens.delete(refreshToken);
    return null;
  }

  return storedToken.userId;
};

exports.deleteRefreshToken = (refreshToken) => {
  refreshTokens.delete(refreshToken);
};
