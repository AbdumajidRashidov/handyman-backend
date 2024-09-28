const twilio = require('twilio');
const crypto = require('crypto');

let client;

try {
  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
} catch (error) {
  console.warn('Twilio client not initialized. SMS will not be sent.');
}

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTP = async (phoneNumber, otp) => {
  if (!client) {
    console.log(`Development mode: OTP for ${phoneNumber} is ${otp}`);
    return true;
  }

  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};

module.exports = { generateOTP, sendOTP };