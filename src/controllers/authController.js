const authService = require("../services/authService");
const { generateOTP, sendOTP, verifyOTP } = require("../services/otpService");
const {
  addToBlacklist,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
} = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { phoneNumber, firstName, lastName, email, password } = req.body;
    const user = await authService.registerUser(
      phoneNumber,
      firstName,
      lastName,
      email,
      password
    );
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const token = await authService.loginUser(phoneNumber, password);
    res.json({ token });

    const userId = req.user.id; // You should have the user object after OTP verification

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.sendOTPController = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const otp = generateOTP();

  // In a real application, you should save this OTP in your database
  // associated with the phone number and with an expiration time

  const sent = await sendOTP(phoneNumber, otp);

  if (sent) {
    res.status(200).json({ message: "OTP sent successfully" });
  } else {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

exports.verifyOTPController = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  const isValid = verifyOTP(phoneNumber, otp);

  if (isValid) {
    // OTP is valid, proceed with user authentication or registration
    // You might want to generate a JWT token here or update user status in the database
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid or expired OTP" });
  }
};
exports.refreshTokenController = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  const userId = verifyRefreshToken(refreshToken);

  if (!userId) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }

  const newAccessToken = generateAccessToken(userId);
  const newRefreshToken = generateRefreshToken(userId);

  // Invalidate the old refresh token
  deleteRefreshToken(refreshToken);

  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
};

exports.logoutController = (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    deleteRefreshToken(refreshToken);
  }

  res.status(200).json({ message: "Logged out successfully" });
};
