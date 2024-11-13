import React from "react";
import StatCard from "./StatCard";
import BarChart from "./BoardChart";
import DonutChart from "./DonutChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashBoard.modules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTasks,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getStatCard } from "../../redux/apiRequest";
import { useEffect } from "react";

function DashBoard() {
  const dispatch = useDispatch();
  const statCard = useSelector((state) => state.dashboard.getStatCard?.statCard);
  
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  useEffect(() => {
    getStatCard(token, dispatch);
  }, [])
  return (
    
    <div className="container my-5">
      <div className="row g-3 mb-4">
        <StatCard
          title="Total Koi breeder"
          icon={<FontAwesomeIcon icon={faUser} />}
          amount={statCard?.totalBreeders}
          color="text-success"
        />
        <StatCard
          title="Total User"
          amount={statCard?.totalMembers}
          icon={<FontAwesomeIcon icon={faUser} />}
          color="text-danger"
        />
        <StatCard
          title="Total Auction Happen In Web"
          amount={statCard?.totalAuctions}
          icon={<FontAwesomeIcon icon={faTasks} />}
          color="text-success"
        />
        <StatCard
          title="Total Profit"
          amount={Intl.NumberFormat("de-DE").format(statCard?.profit)}
          icon={<FontAwesomeIcon icon={faMoneyBill} />}
          color="text-success"
        />
      </div>

      <div className="row">
        <div className="col-md-8">
          <h5>Auction</h5>
          <BarChart />
        </div>
        <div className="col-md-4">
          <h5>Auction Method</h5>
          <DonutChart />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
