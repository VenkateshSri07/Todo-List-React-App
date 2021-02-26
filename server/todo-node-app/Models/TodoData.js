const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    Id:Number,
    Task:String,
    IsComplete:Boolean
});

const Todo = mongoose.model("todo",todoSchema);

module.exports = Todo;