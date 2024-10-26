import React from "react";

function StatCard({ title, amount, percentage, icon, color }) {
  return (
    <div className={`col-md-3 ${color}`}>
      <div className="p-4 rounded shadow-sm text-center">
        <div className="stat-icon">{icon}</div>
        <h6 className="mt-2">{title}</h6>
        <h3>{amount}</h3>
        {percentage && (
          <p className="stat-percentage">{percentage} Since last month</p>
        )}
      </div>
    </div>
  );
}

export default StatCard;
