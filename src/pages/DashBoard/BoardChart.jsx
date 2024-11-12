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
import { useDispatch, useSelector } from "react-redux";
import { getBoardChart } from "../../redux/apiRequest";
import { useEffect } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function BoardChart() {
  const boardChart = useSelector((state) => state.dashboard.getBoardChart?.boardChart);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  
  useEffect(() => {
    getBoardChart(token, dispatch);
  }, []);

  // Transform the data
  const transformedData = {
    months: boardChart?.map(item => item.month) || [],
    auctionCounts: boardChart?.map(item => item.auctionCount) || []
  };

  const data = {
    labels: transformedData.months,
    datasets: [
      {
        label: "Auction",
        data: transformedData.auctionCounts,
        backgroundColor: "rgba(75, 123, 236, 0.5)",
        borderColor: "#4B7BEC",
        borderWidth: 1,
      }
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
    plugins: {
      datalabels: {
        display: (context) => context.dataset.data[context.dataIndex] !== 0,
        anchor: 'end',
        align: 'top',
        formatter: (value) => value,
        font: {
          size: 14
        },
        padding: 4
      }
    }
  };

  return (
    <div style={{ maxHeight: "400px" }}>
      <Bar data={data} options={options} plugins={[ChartDataLabels]} height={300} />
    </div>
  );
}

export default BoardChart;
