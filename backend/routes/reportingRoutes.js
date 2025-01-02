const express = require("express");
const router = express.Router();
const CommunicationLog = require("../models/CommunicationLog");
const CommunicationMethod = require("../models/CommunicationMethod");

// Communication Frequency Report
router.get("/frequency-report", async (req, res) => {
  try {
    const { startDate, endDate, method } = req.query;

    const filter = {};
    if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    if (method) filter.type = method;

    const logs = await CommunicationLog.aggregate([
      { $match: filter },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error generating frequency report", error });
  }
});

// Engagement Effectiveness Dashboard
router.get("/engagement-effectiveness", async (req, res) => {
  try {
    const logs = await CommunicationLog.aggregate([
      { $group: { _id: "$type", successRate: { $avg: "$success" } } }, // Assuming a "success" field in logs
    ]);

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error generating engagement report", error });
  }
});

// Overdue Communication Trends
router.get("/overdue-trends", async (req, res) => {
  try {
    const logs = await CommunicationLog.aggregate([
      { $match: { isOverdue: true } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error generating overdue trends", error });
  }
});

// Real-Time Activity Log
router.get("/activity-log", async (req, res) => {
  try {
    const { company, user, startDate, endDate } = req.query;

    const filter = {};
    if (company) filter.company = company;
    if (user) filter.user = user;
    if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };

    const logs = await CommunicationLog.find(filter).sort({ date: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activity log", error });
  }
});

module.exports = router;
