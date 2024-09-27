const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
