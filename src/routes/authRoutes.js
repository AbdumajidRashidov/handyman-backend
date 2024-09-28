const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  sendOTPController,
  verifyOTPController,
  logoutController,
  refreshTokenController,
} = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.logoutController);
router.post("/send-otp", sendOTPController);
router.post("/verify-otp", verifyOTPController);
router.post("refresh-token", refreshTokenController);
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
