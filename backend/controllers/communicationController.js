const CommunicationMethod = require("../models/CommunicationMethod");

// Create a new communication method
exports.createMethod = async (req, res) => {
  try {
    const { name, sequence, isMandatory } = req.body;
    const method = new CommunicationMethod({ name, sequence, isMandatory });
    await method.save();
    res.status(201).json({ message: "Communication method created successfully", method });
  } catch (error) {
    res.status(500).json({ message: "Error creating communication method", error: error.message });
  }
};

// Get all communication methods
exports.getMethods = async (req, res) => {
  try {
    const methods = await CommunicationMethod.find().sort({ sequence: 1 });
    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching communication methods", error: error.message });
  }
};

// Update a communication method
exports.updateMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const method = await CommunicationMethod.findByIdAndUpdate(id, updatedData, { new: true });
    if (!method) {
      return res.status(404).json({ message: "Communication method not found" });
    }
    res.status(200).json({ message: "Communication method updated successfully", method });
  } catch (error) {
    res.status(500).json({ message: "Error updating communication method", error: error.message });
  }
};

// Delete a communication method
exports.deleteMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const method = await CommunicationMethod.findByIdAndDelete(id);
    if (!method) {
      return res.status(404).json({ message: "Communication method not found" });
    }
    res.status(200).json({ message: "Communication method deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting communication method", error: error.message });
  }
};
