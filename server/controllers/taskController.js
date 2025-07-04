const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ board: req.params.boardId });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    board: req.params.boardId,
  });
  res.status(201).json(task);
};
