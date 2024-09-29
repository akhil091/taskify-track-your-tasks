const express = require("express");
const { authenticateToken } = require("../Middleware/authMiddleware");
const { checkTaskOwnership } = require("../Middleware/taskMiddleware");
const TaskModel = require("../Model/taskModel");

const taskRoute = express.Router();

// Route to get all tasks with optional filters like search, sortBy, is_completed, and in_progress
taskRoute.get("/all", authenticateToken, async (req, res) => {
  try {
    const { search, sortBy, is_completed, in_progress } = req.query;
    let query = {};

    // Assigning userId based on the type of login (Google or custom login)
    if (req.user.googleId) {
      query.userId = req.user.googleId;
    } else {
      query.userId = req.user.userID;
    }

    if (search) {
      query.title = new RegExp(search, "i");
    }

    if (is_completed) {
      query.is_completed = is_completed === "true";
    }

    if (in_progress) {
      query.in_progress = in_progress === "true";
    }

    // Sort tasks based on the query params
    let sortOptions = {};
    if (sortBy) {
      switch (sortBy) {
        case "createdAt_asc":
          sortOptions.createdAt = 1;
          break;
        case "createdAt_desc":
          sortOptions.createdAt = -1;
          break;
        case "in_progress":
          sortOptions.in_progress = 1;
          break;
        case "is_completed":
          sortOptions.is_completed = 1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    }

    const tasks = await TaskModel.find(query).sort(sortOptions);

    // Categorize tasks into three categories: task, progress, and completed
    const categorizedTasks = {
      task: [],
      progress: [],
      completed: [],
    };

    // Categorize tasks based on their status
    tasks.forEach((task) => {
      if (!task.in_progress && !task.is_completed) {
        categorizedTasks.task.push(task);
      } else if (task.in_progress) {
        categorizedTasks.progress.push(task);
      } else if (task.is_completed) {
        categorizedTasks.completed.push(task);
      }
    });

    res.json(categorizedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a single task by its ID
taskRoute.get("/all/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new task
taskRoute.post("/add", authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  
  let userId = req.user.userID || req.user.googleId;

  const newTask = new TaskModel({
    userId: userId,
    title,
    description,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to edit a task by its ID, with task ownership check middleware
taskRoute.patch(
  "/edit/:taskId",
  authenticateToken,
  checkTaskOwnership,
  async (req, res) => {
    const { taskId } = req.params;
    const { title, description, in_progress, is_completed } = req.body;

    try {
      const task = await TaskModel.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      let updateFields = {};

      if (title) updateFields.title = title;
      if (description) updateFields.description = description;

      if (is_completed !== undefined) {
        updateFields.is_completed = is_completed;
        if (is_completed === true) {
          updateFields.in_progress = false;
        }
      } else if (in_progress !== undefined) {
        updateFields.in_progress = in_progress;
        if (in_progress === true) {
          updateFields.is_completed = false;
        }
      }

      if (is_completed == false && in_progress == false) {
        updateFields.is_completed = false;
        updateFields.in_progress = false;
      }

      const updatedTask = await TaskModel.findByIdAndUpdate(
        taskId,
        updateFields,
        { new: true }
      );

      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Route to delete a task by its ID, with task ownership check middleware
taskRoute.delete(
  "/delete/:taskId",
  authenticateToken,
  checkTaskOwnership,
  async (req, res) => {
    const { taskId } = req.params;

    try {
      await TaskModel.findByIdAndDelete(taskId); // Delete the task by its ID
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = taskRoute;
