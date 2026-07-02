const express = require("express");
const { randomUUID } = require("crypto");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Temporary in-memory tasks
let tasks = [
    {
        id: randomUUID(),
        title: "Welcome to TaskFlow Pro!",
        priority: "Medium",
        completed: false
    },
    {
        id: randomUUID(),
        title: "Try adding a new task above",
        priority: "Low",
        completed: false
    }
];

// GET tasks
router.get("/", authMiddleware, (req, res) => {
    res.json(tasks);
});

// POST task
router.post("/", authMiddleware, (req, res) => {

    const { title, priority } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            error: "Task title is required."
        });
    }

    const newTask = {
        id: randomUUID(),
        title: title.trim(),
        priority: priority || "Medium",
        completed: false
    };

    tasks.unshift(newTask);

    res.status(201).json(newTask);

});

// Toggle task
router.put("/:id/toggle", authMiddleware, (req, res) => {

    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found."
        });
    }

    task.completed = !task.completed;

    res.json(task);

});

// Delete task
router.delete("/:id", authMiddleware, (req, res) => {

    const initialLength = tasks.length;

    tasks = tasks.filter(t => t.id !== req.params.id);

    if (tasks.length === initialLength) {
        return res.status(404).json({
            error: "Task not found."
        });
    }

    res.status(204).send();

});

module.exports = router;