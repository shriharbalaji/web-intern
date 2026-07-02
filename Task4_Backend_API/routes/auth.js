const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersFile = path.join(__dirname, "../users.json");

// REGISTER
router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    let users = [];

    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile));
    }

    const exists = users.find(user => user.email === email);

    if (exists) {
        return res.status(400).json({
            message: "Email already registered."
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        id: Date.now(),
        name,
        email,
        password: hashedPassword,
        tasks: []
    });

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.status(201).json({
        message: "Registration successful."
    });

});

const jwt = require("jsonwebtoken");

const SECRET_KEY = "taskflow_secret_key";

// LOGIN
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    let users = [];

    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile));
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password."
        });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({
            message: "Invalid email or password."
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Login successful.",
        token,
        name: user.name
    });

});

module.exports = router;