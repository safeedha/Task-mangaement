import Task from "../models/Task.js";

// GET all tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// CREATE new task
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      const error = new Error("Title is required");
      error.statusCode = 400;
      throw error;
    }

    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};


export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE a task
export const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
