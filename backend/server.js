const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Importing Routes
const reportingRoutes = require("./routes/reportingRoutes");
const companyRoutes = require("./routes/companyRoutes");
const communicationRoutes = require("./routes/communicationRoutes");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/communication-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/reports", reportingRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/communication-methods", communicationRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Models
const Report = mongoose.model("Report", {
  company: String,
  method: String, // E.g., LinkedIn Post, Email, etc.
  date: Date,
  responses: Number,
  overdue: Boolean,
});

// Routes

// Create a report
app.post("/api/reports", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ message: "Report created successfully." });
  } catch (err) {
    console.error("Error creating report:", err);
    res.status(500).json({ error: "Error creating report." });
  }
});

// Get communication frequency report
app.get("/api/reports/frequency", async (req, res) => {
  try {
    const frequencyReport = await Report.aggregate([
      { $group: { _id: "$method", count: { $sum: 1 } } },
    ]);
    res.json(frequencyReport);
  } catch (err) {
    console.error("Error fetching frequency report:", err);
    res.status(500).json({ error: "Error fetching frequency report." });
  }
});

// Engagement effectiveness dashboard
app.get("/api/reports/effectiveness", async (req, res) => {
  try {
    const effectiveness = await Report.aggregate([
      { $group: { _id: "$method", successRate: { $avg: "$responses" } } },
    ]);
    res.json(effectiveness);
  } catch (err) {
    console.error("Error fetching effectiveness data:", err);
    res.status(500).json({ error: "Error fetching effectiveness data." });
  }
});

// Overdue communication trends
app.get("/api/reports/overdue-trends", async (req, res) => {
  try {
    const trends = await Report.aggregate([
      { $match: { overdue: true } },
      { $group: { _id: { date: "$date", company: "$company" }, count: { $sum: 1 } } },
    ]);
    res.json(trends);
  } catch (err) {
    console.error("Error fetching overdue trends:", err);
    res.status(500).json({ error: "Error fetching overdue trends." });
  }
});

// Real-time activity log
app.get("/api/reports/activity-log", async (req, res) => {
  try {
    const logs = await Report.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error("Error fetching activity log:", err);
    res.status(500).json({ error: "Error fetching activity log." });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
