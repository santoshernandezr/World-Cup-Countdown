const express = require("express");
const router = express.Router();
const UserTaskModel = require("../models/user_task_models");
router.post("/createUserTask", async(req, res) => {
    const userTask = new UserTaskModel({
        taskTitle: req.body.myTaskTitle,
        taskDescription: req.body.myTaskDescription,
    });
    try {
        const newUserTask = await userTask.save();
        res.status(201).json(newUserTask);
    } catch (error) {
        res.status(400).json({ msg: error });
    };
});

module.exports = router;