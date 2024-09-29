const TaskModel = require("../Model/taskModel");

// Middleware function to check if the user owns the specific task
const checkTaskOwnership = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { userID, googleId } = req.user;

    // Check if the logged-in user is the owner of the task
    if (task.userId !== userID && task.userId !== googleId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    console.error("Error checking task ownership:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkTaskOwnership };
