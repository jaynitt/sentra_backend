const express = require("express");
const cors = require("cors");

const analyzeRoutes = require("./routes/analyze.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

// 🔹 Register routes
app.use("/api/analyze", analyzeRoutes);

module.exports = app;
