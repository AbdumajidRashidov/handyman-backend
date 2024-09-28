// src/services/searchService.js
const Task = require("../models/Task");
const Tasker = require("../models/Tasker");

exports.searchTasks = async (
  criteria,
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortOrder = "DESC"
) => {
  return Task.search(criteria, page, limit, sortBy, sortOrder);
};

exports.searchTaskers = async (
  criteria,
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortOrder = "DESC"
) => {
  return Tasker.search(criteria, page, limit, sortBy, sortOrder);
};
