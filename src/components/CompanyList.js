import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", emails: [], phoneNumbers: [] });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/companies/add", form);
      setCompanies([...companies, response.data]);
      setForm({ name: "", location: "", emails: [], phoneNumbers: [] });
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <div>
      <h2>Companies</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button type="submit">Add Company</button>
      </form>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            {company.name} - {company.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
