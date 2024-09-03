import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function Progress() {
  const data = {
    labels: ["AI", "Web Development", "Data Science"],
    datasets: [
      {
        label: "Progress",
        data: [70, 50, 90],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Progress;
