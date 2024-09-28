// src/routes/searchRoutes.js
const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.get("/tasks", searchController.searchTasks);
router.get("/taskers", searchController.searchTaskers);

module.exports = router;
