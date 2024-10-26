import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function BoardChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [
          12000, 15000, 13000, 14000, 16000, 19000, 22000, 20000, 24000, 26000,
          21000, 25000,
        ],
        backgroundColor: "rgba(75, 123, 236, 0.5)",
        borderColor: "#4B7BEC",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 30000,
      },
    },
  };

  return (
    <div style={{ maxHeight: "400px" }}>
      {" "}
      {/* Set max height */}
      <Bar data={data} options={options} height={300} />{" "}
      {/* Adjust height if needed */}
    </div>
  );
}

export default BoardChart;
