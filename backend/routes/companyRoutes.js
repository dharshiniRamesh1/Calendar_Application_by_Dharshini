const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Create a new company
router.post("/add", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json({ message: "Company added successfully", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: "Error adding company", error });
  }
});

// Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
});

// Update a company
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Company updated successfully", company: updatedCompany });
  } catch (error) {
    res.status(500).json({ message: "Error updating company", error });
  }
});

// Delete a company
router.delete("/delete/:id", async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
});

module.exports = router;
