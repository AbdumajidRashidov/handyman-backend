const taskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      budget,
      currency,
      dueDate,
    } = req.body;
    const userId = req.user.id; // Assuming you have authentication middleware that adds user to req
    const task = await taskService.createTask(
      title,
      description,
      category,
      location,
      budget,
      currency,
      dueDate,
      userId
    );
    res
      .status(201)
      .json({ message: "Task created successfully", taskId: task.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await taskService.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.getTasksByUserId(userId);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
