import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const data = {
    labels: ["Blind", "Traditional", "Buy Out"],
    datasets: [
      {
        label: "Auction Method",
        data: [45, 25, 30],
        backgroundColor: ["#4B7BEC", "#F7B924", "#38ADA9"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ maxHeight: "300px" }}>
      <Doughnut data={data} options={options} height={250} />{" "}
    </div>
  );
}

export default DonutChart;
