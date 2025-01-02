const express = require("express");
const router = express.Router();
const CommunicationMethod = require("../models/CommunicationMethod");

// Add a communication method
router.post("/add", async (req, res) => {
  try {
    const method = new CommunicationMethod(req.body);
    await method.save();
    res.status(201).json({ message: "Communication method added", method });
  } catch (error) {
    res.status(500).json({ message: "Error adding communication method", error });
  }
});

// Get all methods
router.get("/", async (req, res) => {
  try {
    const methods = await CommunicationMethod.find().sort({ sequence: 1 });
    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching methods", error });
  }
});

module.exports = router;
