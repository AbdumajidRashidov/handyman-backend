const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, taskController.createTask);
router.get("/:id", taskController.getTask);
router.get("/user/tasks", authMiddleware, taskController.getUserTasks);

module.exports = router;
