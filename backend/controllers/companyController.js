const Company = require("../models/Company");

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const { name, address, contactEmail } = req.body;
    const company = new Company({ name, address, contactEmail });
    await company.save();
    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    res.status(500).json({ message: "Error creating company", error: error.message });
  }
};

// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error: error.message });
  }
};

// Update a company
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const company = await Company.findByIdAndUpdate(id, updatedData, { new: true });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company updated successfully", company });
  } catch (error) {
    res.status(500).json({ message: "Error updating company", error: error.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error: error.message });
  }
};
