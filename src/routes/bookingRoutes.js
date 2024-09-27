// src/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, bookingController.createBooking);
router.get("/:id", authMiddleware, bookingController.getBooking);
router.put(
  "/:id/status",
  authMiddleware,
  bookingController.updateBookingStatus
);
router.put(
  "/:id/payment",
  authMiddleware,
  bookingController.updatePaymentStatus
);
router.post("/:id/messages", authMiddleware, bookingController.sendMessage);
router.get("/:id/messages", authMiddleware, bookingController.getMessages);

module.exports = router;
