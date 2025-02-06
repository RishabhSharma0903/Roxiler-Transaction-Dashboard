import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the plugin
ChartJS.register(ChartDataLabels);

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  // Generate distinct colors for each bar
  const generateColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${hueStep * i}, 70%, 50%)`);
    }
    return colors;
  };

  useEffect(() => {
    fetchBarData();
  }, [month]);

  const fetchBarData = async () => {
    try {
      const response = await axios.get(
        `https://roxiler-transaction-dashboard-backend.onrender.com/bar-chart?month=${month}`
      );
      setBarData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const data = {
    labels: barData.map((item) => item.range),
    datasets: [
      {
        label: "Number of Items",
        data: barData.map((item) => item.count),
        backgroundColor: generateColors(barData.length),
        borderColor: "rgba(0,0,0,0.3)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => `${value} items`,
        color: '#444',
        font: {
          weight: 'bold',
          size: 12
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            return `${label}: ${context.raw} items (${context.label})`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Price Ranges',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#666',
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 12
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Items',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#666',
          precision: 0,
          font: {
            size: 12
          }
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Price Range Distribution - {month}
      </h2>
      <div className="h-96">
        <Bar 
          data={data} 
          options={options}
          plugins={[ChartDataLabels]}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
        {barData.map((item, index) => (
          <div key={item.range} className="flex items-center">
            <div 
              className="w-4 h-4 mr-2 rounded-sm"
              style={{ backgroundColor: generateColors(barData.length)[index] }}
            ></div>
            <span className="text-sm">
              {item.range}: {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
