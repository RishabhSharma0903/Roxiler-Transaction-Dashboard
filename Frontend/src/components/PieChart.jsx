import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetchPieData();
  }, [month]);

  const fetchPieData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pie-chart?month=${month}`
      );
      setPieData(response.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const data = {
    labels: pieData.map((item) => item._id),
    datasets: [
      {
        label: "Number of Items",
        data: pieData.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;