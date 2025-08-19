const express = require('express')
const Log = require('../models/Log')

const router = express.Router()

// CREATE a new Log
router.post("/", async (req, res) => {
    try {
        const log = new Log(req.body);
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all logs
router.get("/", async (req, res) => {
    try {
        const logs = await Log.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ one log by custom numeric id
router.get("/:id", async (req, res) => {
    try {
        const logId = Number(req.params.id);
        if (isNaN(logId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const log = await Log.findOne({ id: logId });
        if (!log) return res.status(404).json({ message: "Log not found" });

        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE log by custom numeric id
router.put("/:id", async (req, res) => {
    try {
        const logId = Number(req.params.id);
        if (isNaN(logId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const updatedLog = await Log.findOneAndUpdate(
            { id: logId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedLog) return res.status(404).json({ message: "Log not found" });

        res.status(200).json(updatedLog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE log by custom numeric id
router.delete("/:id", async (req, res) => {
    try {
        const logId = Number(req.params.id);
        if (isNaN(logId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const deletedLog = await Log.findOneAndDelete({ id: logId });
        if (!deletedLog) return res.status(404).json({ message: "Log not found" });

        res.status(200).json({ message: "Log deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router