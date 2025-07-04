const Board = require("../models/Board");

exports.getBoards = async (req, res) => {
  const boards = await Board.find({ user: req.user });
  res.json(boards);
};

exports.createBoard = async (req, res) => {
  const board = await Board.create({ name: req.body.name, user: req.user });
  res.status(201).json(board);
};

exports.renameBoard = async (req, res) => {
  const board = await Board.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { name: req.body.name },
    { new: true }
  );
  res.json(board);
};

exports.deleteBoard = async (req , res) =>{
    const board = await Board.findOneAndDelete({
        _id: req.params.id ,
        user: req.user }
    )
    res.json({ message: "Board deleted" });}