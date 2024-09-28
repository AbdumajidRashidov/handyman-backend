const authService = require("../services/authService");
const { generateOTP, sendOTP } = require("../services/otpService");

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
