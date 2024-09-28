const twilio = require("twilio");
const crypto = require("crypto");

let client;

try {
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
} catch (error) {
  console.warn("Twilio client not initialized. SMS will not be sent.");
}

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const otpStorage = new Map(); // In-memory storage for OTPs (replace with database in production)

const storeOTP = (phoneNumber, otp) => {
  const expirationTime = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  otpStorage.set(phoneNumber, { otp, expirationTime });
};

const verifyOTP = (phoneNumber, userEnteredOTP) => {
  const storedData = otpStorage.get(phoneNumber);
  if (!storedData) {
    return false; // No OTP found for this phone number
  }

  const { otp, expirationTime } = storedData;
  if (Date.now() > expirationTime) {
    otpStorage.delete(phoneNumber); // Remove expired OTP
    return false; // OTP has expired
  }

  if (otp === userEnteredOTP) {
    otpStorage.delete(phoneNumber); // Remove used OTP
    return true; // OTP is valid
  }

  return false; // Invalid OTP
};

const sendOTP = async (phoneNumber, otp) => {
  if (!client) {
    console.log(`Development mode: OTP for ${phoneNumber} is ${otp}`);
    storeOTP(phoneNumber, otp);
    return true;
  }

  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    storeOTP(phoneNumber, otp);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};

module.exports = { generateOTP, sendOTP, verifyOTP };
