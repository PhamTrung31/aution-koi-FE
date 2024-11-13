import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getDonutChart } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const donutChart = useSelector((state) => state.dashboard.getDonutChart?.donutChart);
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const dispatch = useDispatch();

  useEffect(() => {
    getDonutChart(token, dispatch);
  }, [token, dispatch]);

  console.log(donutChart);

  const total = (donutChart?.ANONYMOUS || 0) + (donutChart?.TRADITIONAL || 0) + (donutChart?.BUYOUT || 0);

  const data = {
    labels: ["Anonymous", "Traditional"],
    datasets: [
      {
        label: "Auction Method",
        data: [
          donutChart?.ANONYMOUS || 0,
          donutChart?.TRADITIONAL || 0,
        ],
        backgroundColor: ["#4B7BEC", "#F7B924"],
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxHeight: "300px" }}>
      <Doughnut data={data} options={options} height={250} />
    </div>
  );
}

export default DonutChart;
