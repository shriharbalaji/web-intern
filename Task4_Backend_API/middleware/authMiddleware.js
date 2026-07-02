const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const SECRET_KEY = "taskflow_secret_key";
const usersFile = path.join(__dirname, "../users.json");

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, SECRET_KEY);

        const users = JSON.parse(fs.readFileSync(usersFile));

        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found."
            });
        }

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token."
        });

    }

}

module.exports = authMiddleware;