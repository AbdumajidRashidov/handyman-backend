// src/controllers/taskerController.js
const taskerService = require("../services/taskerService");

exports.createProfile = async (req, res) => {
  try {
    const { skills, hourlyRate, bio } = req.body;
    const userId = req.user.id;
    const tasker = await taskerService.createProfile(
      userId,
      skills,
      hourlyRate,
      bio
    );
    res
      .status(201)
      .json({
        message: "Tasker profile created successfully",
        taskerId: tasker.id,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasker = await taskerService.getProfileByUserId(userId);
    if (!tasker) {
      return res.status(404).json({ message: "Tasker profile not found" });
    }
    res.json(tasker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { skills, hourlyRate, bio } = req.body;
    const userId = req.user.id;
    const tasker = await taskerService.updateProfile(
      userId,
      skills,
      hourlyRate,
      bio
    );
    res.json({ message: "Tasker profile updated successfully", tasker });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTaskers = async (req, res) => {
  try {
    const taskers = await taskerService.getAllTaskers();
    res.json(taskers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
