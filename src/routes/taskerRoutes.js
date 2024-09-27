// src/routes/taskerRoutes.js
const express = require("express");
const router = express.Router();
const taskerController = require("../controllers/taskerController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/profile", authMiddleware, taskerController.createProfile);
router.get("/profile", authMiddleware, taskerController.getProfile);
router.put("/profile", authMiddleware, taskerController.updateProfile);
router.get("/all", taskerController.getAllTaskers);

module.exports = router;
