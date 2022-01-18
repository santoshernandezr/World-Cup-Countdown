const mongoose = require("mongoose");

const userTaskSchema = mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
    },
});

module.exports = mongoose.model("userTaskModel", userTaskSchema);