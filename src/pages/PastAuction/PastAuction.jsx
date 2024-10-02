import React, { useState } from "react";
import "./Auction.css"; // Make sure to create this CSS file
import { useHref } from "react-router-dom";

const auctions = [
  "Auction #1",
  "Auction #2",
  "Auction #3",
  "Auction #4",
  "Auction #5",
  "Auction #6",
  "Auction #7",
  "Auction #8",
  "Lunar New Year Auction",
  "Auction #10",
  "Auction #11",
  "Auction #12",
  "Auction #12",
  "Auction #12",
  "Auction #12",
  "Auction #12",
  "Auction #12",
  "Auction #12",
  "Auction #12",
];

const PastAuction = () => {
  const [showMore, setShowMore] = useState(false);

  const auctionsToDisplay = showMore ? auctions : auctions.slice(0, 12);

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className="auction-container">
      <div className="auction-grid">
        {auctionsToDisplay.map((auction, index) => (
          <div className="auction-card" key={index}>
            <h3 onClick={useHref}>{auction}</h3>
            <p>dd/MM/yyyy, hh:MM - dd/MM/yyyy, hh:MM</p>
          </div>
        ))}
      </div>
      {!showMore && (
        <div className="button-container">
          <button className="view-auctions-btn" onClick={handleShowMore}>
            View scheduled auctions
          </button>
        </div>
      )}
    </div>
  );
};

export default PastAuction;
