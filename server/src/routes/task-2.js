const express = require('express')
const Task = require('../models/Task')

const router = express.Router()

// CREATE a new Task
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all tasks
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query; 
        if(!userId){
           return res.status(400).json({message: "UserID Missing"})
        }
        const tasks = await Task.find({ assignedTo: userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ single task by ID
router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a task
router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// DELETE by custom id
router.delete("/:id", async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        if (isNaN(taskId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const deletedTask = await Task.findOneAndDelete({ id: taskId });
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router