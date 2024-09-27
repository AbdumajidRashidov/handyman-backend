// src/services/bookingService.js
const Booking = require("../models/Booking");
const Message = require("../models/Message");

exports.createBooking = async (taskId, taskerId, userId) => {
  return Booking.create(taskId, taskerId, userId);
};

exports.getBookingById = async (bookingId) => {
  return Booking.findById(bookingId);
};

exports.updateBookingStatus = async (bookingId, status) => {
  return Booking.updateStatus(bookingId, status);
};

exports.updatePaymentStatus = async (bookingId, paymentStatus) => {
  return Booking.updatePaymentStatus(bookingId, paymentStatus);
};

exports.sendMessage = async (bookingId, senderId, content) => {
  return Message.create(bookingId, senderId, content);
};

exports.getMessagesByBookingId = async (bookingId) => {
  return Message.findByBookingId(bookingId);
};
