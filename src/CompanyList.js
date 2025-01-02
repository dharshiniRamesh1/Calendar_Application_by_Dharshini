import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", emails: [], phoneNumbers: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/api/companies").then((response) => setCompanies(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/companies/add", form).then(() => {
      setCompanies([...companies, form]);
      setForm({ name: "", location: "", emails: [], phoneNumbers: [] });
    });
  };

  return (
    <div>
      <h2>Companies</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <button type="submit">Add Company</button>
      </form>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
