const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    name: String ,
    User: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
})

module.exports = boardSchema ; 