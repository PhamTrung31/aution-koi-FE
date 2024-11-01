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
        label: "Auction",
        data: [
          12, 15, 20, 30, 22, 19, 15, 31, 24, 28,
          20, 11,
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
        max: 50,
      },
    },
  };

  return (
    <div style={{ maxHeight: "400px" }}>

      <Bar data={data} options={options} height={300} />{" "}

    </div>
  );
}

export default BoardChart;
