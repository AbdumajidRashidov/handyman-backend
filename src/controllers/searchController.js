// src/controllers/searchController.js
const searchService = require("../services/searchService");

exports.searchTasks = async (req, res) => {
  try {
    const {
      category,
      minBudget,
      maxBudget,
      location,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;
    const tasks = await searchService.searchTasks(
      {
        category,
        minBudget: parseFloat(minBudget),
        maxBudget: parseFloat(maxBudget),
        location: location ? JSON.parse(location) : undefined,
      },
      parseInt(page),
      parseInt(limit),
      sortBy,
      sortOrder
    );
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchTaskers = async (req, res) => {
  try {
    const {
      skills,
      minHourlyRate,
      maxHourlyRate,
      minRating,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;
    const taskers = await searchService.searchTaskers(
      {
        skills: skills ? skills.split(",") : undefined,
        minHourlyRate: parseFloat(minHourlyRate),
        maxHourlyRate: parseFloat(maxHourlyRate),
        minRating: parseFloat(minRating),
      },
      parseInt(page),
      parseInt(limit),
      sortBy,
      sortOrder
    );
    res.json(taskers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
