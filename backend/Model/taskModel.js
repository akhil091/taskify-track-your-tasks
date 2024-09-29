const mongoose = require("mongoose");

//schema for a Task
const TaskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    in_progress: { type: Boolean, default: false },
    is_completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
