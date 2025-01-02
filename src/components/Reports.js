import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Reports = () => {
  const [frequencyData, setFrequencyData] = useState([]);

  useEffect(() => {
    const fetchFrequencyData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports/frequency");
        setFrequencyData(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchFrequencyData();
  }, []);

  const frequencyChartData = {
    labels: frequencyData.map((item) => item._id),
    datasets: [
      {
        label: "Frequency",
        data: frequencyData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h1>Reporting and Analytics</h1>
      <Bar data={frequencyChartData} />
    </div>
  );
};

export default Reports;
