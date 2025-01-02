const CommunicationLog = require("../models/CommunicationLog");

// Frequency report
exports.getFrequencyReport = async (req, res) => {
  try {
    const report = await CommunicationLog.aggregate([
      { $group: { _id: "$communicationMethod", count: { $sum: 1 } } },
    ]);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error generating frequency report", error: error.message });
  }
};

// Engagement effectiveness
exports.getEngagementEffectiveness = async (req, res) => {
  try {
    const report = await CommunicationLog.aggregate([
      { $match: { outcome: "success" } },
      { $group: { _id: "$communicationMethod", successCount: { $sum: 1 } } },
    ]);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error generating engagement effectiveness report", error: error.message });
  }
};

// Overdue trends
exports.getOverdueTrends = async (req, res) => {
  try {
    const now = new Date();
    const report = await CommunicationLog.aggregate([
      { $match: { dueDate: { $lt: now }, isCompleted: false } },
      { $group: { _id: { year: { $year: "$dueDate" }, month: { $month: "$dueDate" } }, count: { $sum: 1 } } },
    ]);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error generating overdue trends report", error: error.message });
  }
};

// Real-time logs
exports.getRealTimeLogs = async (req, res) => {
  try {
    const logs = await CommunicationLog.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching real-time logs", error: error.message });
  }
};
