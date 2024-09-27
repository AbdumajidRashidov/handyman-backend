// src/services/taskerService.js
const Tasker = require("../models/Tasker");

exports.createProfile = async (userId, skills, hourlyRate, bio) => {
  return Tasker.create(userId, skills, hourlyRate, bio);
};

exports.getProfileByUserId = async (userId) => {
  return Tasker.findByUserId(userId);
};

exports.updateProfile = async (userId, skills, hourlyRate, bio) => {
  return Tasker.update(userId, skills, hourlyRate, bio);
};

exports.getAllTaskers = async () => {
  return Tasker.findAll();
};
