import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Request.css";

const requests = [
  {
    breeder: "Sakura Ginnin",
    fishName: "Kohaku",
    auctionMethod: 1,
    startPrice: "$150",
    buyoutPrice: "$150",
    time: "14/02/2025 20:00",
  },
  {
    breeder: "Midori Showa",
    fishName: "Taisho Sanke",
    auctionMethod: 1,
    startPrice: "$150",
    buyoutPrice: "$150",
    time: "14/02/2025 20:00",
  },
  {
    breeder: "Aka Matsuba",
    fishName: "Showa",
    auctionMethod: 1,
    startPrice: "$150",
    buyoutPrice: "$150",
    time: "14/02/2025 20:00",
  },
  {
    breeder: "Yamabuki Ogon",
    fishName: "Asagi",
    auctionMethod: 1,
    startPrice: "$150",
    buyoutPrice: "$150",
    time: "14/02/2025 20:00",
  },
  {
    breeder: "Shiro Utsuri",
    fishName: "Shusui",
    auctionMethod: 1,
    startPrice: "$150",
    buyoutPrice: "$150",
    time: "14/02/2025 20:00",
  },
  {
    breeder: "Kohaku Hikari",
    fishName: "Bekko",
    auctionMethod: 1,
    startPrice: "$150",
    buyoutPrice: "$150",
    time: "14/02/2025 20:00",
  },
  {
    breeder: "Beni Kikokuryu",
    fishName: "Goshiki",
    auctionMethod: 1,
    startPrice: "$150",
    buyoutPrice: "$150",
    time: "14/02/2025 20:00",
  },
];

function Request() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Koi Breeder</th>
            <th>Fish Name</th>
            <th>Details</th>
            <th>Auction Method</th>
            <th>StartPrice</th>
            <th>BuyOut Price</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.breeder}</td>
              <td>{request.fishName}</td>
              <td>
                <button className="view-btn">View</button>
              </td>
              <td>{request.auctionMethod}</td>
              <td>{request.startPrice}</td>
              <td>{request.buyoutPrice}</td>
              <td>{request.time}</td>
              <td className="action-icons">
                <FontAwesomeIcon icon={faArrowRight} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Request;
