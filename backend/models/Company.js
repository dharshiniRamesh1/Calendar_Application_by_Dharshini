const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  linkedInProfile: { type: String },
  emails: { type: [String], required: true },
  phoneNumbers: { type: [String], required: true },
  comments: { type: String },
  communicationPeriodicity: { type: String, default: "2 weeks" },
});

module.exports = mongoose.model("Company", companySchema);
