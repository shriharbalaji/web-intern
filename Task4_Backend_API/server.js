const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');

const taskRoutes = require("./routes/tasks");

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("TaskFlow Pro Backend is Running!");
});

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`TaskFlow Pro backend running at http://localhost:${PORT}`);
});
