// src/controllers/bookingController.js
const bookingService = require("../services/bookingService");
const notificationService = require("../services/notificationService");

exports.createBooking = async (req, res) => {
  try {
    const { taskId, taskerId } = req.body;
    const userId = req.user.id;
    const booking = await bookingService.createBooking(
      taskId,
      taskerId,
      userId
    );
    await notificationService.notifyNewBooking(booking);
    res
      .status(201)
      .json({ message: "Booking created successfully", bookingId: booking.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;
    const booking = await bookingService.updateBookingStatus(bookingId, status);
    await notificationService.notifyBookingStatusUpdate(booking);
    res.json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const bookingId = req.params.id;
    const booking = await bookingService.updatePaymentStatus(
      bookingId,
      paymentStatus
    );
    await notificationService.notifyPaymentStatusUpdate(booking);
    res.json({ message: "Payment status updated successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { bookingId, content } = req.body;
    const senderId = req.user.id;
    const message = await bookingService.sendMessage(
      bookingId,
      senderId,
      content
    );
    await notificationService.notifyNewMessage(message);
    res
      .status(201)
      .json({ message: "Message sent successfully", messageId: message.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const messages = await bookingService.getMessagesByBookingId(bookingId);
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
