import React from "react";
import StatCard from "./StatCard";
import BarChart from "./BoardChart";
import DonutChart from "./DonutChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashBoard.modules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faUser,
  faTasks,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

function DashBoard() {
  return (
    <div className="container my-5">
      <div className="row g-3 mb-4">
        <StatCard
          title="Budget"
          value="$24k"
          icon={<FontAwesomeIcon icon={faDollarSign} />}
          percentageChange={12}
          changeDirection="up"
        />
        <StatCard
          title="Total Customers"
          value="1.6k"
          icon={<FontAwesomeIcon icon={faUser} />}
          percentageChange={-16}
          changeDirection="down"
        />
        <StatCard
          title="Task Progress"
          value="75%"
          icon={<FontAwesomeIcon icon={faTasks} />}
          percentageChange={5}
          changeDirection="up"
          className="task-progress"
        />
        <StatCard
          title="Total Profit"
          value="$15k"
          icon={<FontAwesomeIcon icon={faMoneyBill} />}
          percentageChange={8}
          changeDirection="up"
        />
      </div>

      <div className="row">
        <div className="col-md-8">
          <h5>Sales</h5>
          <BarChart />
        </div>
        <div className="col-md-4">
          <h5>Traffic Source</h5>
          <DonutChart />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
