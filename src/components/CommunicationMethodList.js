import React, { useState, useEffect } from "react";
import axios from "axios";

const CommunicationMethodList = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({ name: "", sequence: 0 });

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/communication-methods");
        setMethods(response.data);
      } catch (error) {
        console.error("Error fetching communication methods:", error);
      }
    };
    fetchMethods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/communication-methods/add", form);
      setMethods([...methods, response.data]);
      setForm({ name: "", sequence: 0 });
    } catch (error) {
      console.error("Error adding communication method:", error);
    }
  };

  return (
    <div>
      <h2>Communication Methods</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Sequence"
          value={form.sequence}
          onChange={(e) => setForm({ ...form, sequence: Number(e.target.value) })}
        />
        <button type="submit">Add Method</button>
      </form>
      <ul>
        {methods.map((method) => (
          <li key={method._id}>
            {method.name} (Sequence: {method.sequence})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunicationMethodList;
