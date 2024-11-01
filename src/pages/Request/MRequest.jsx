import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Request.module.css";
const Modal = ({ show, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalsContent}>{children}</div>
    </div>
  );
};



function Request() {
  const [AuctionRequest, setAuctionRequest] = useState([
    {
      id: 1,
      user_id: "John",
      approved_status: null,
      fish_id: 1,
      auction_id: null,
      buy_out: 1200,
      start_price: 1000,
      method_type: 0,
      start_time: "2024-10-25 15:12:54",
      end_time: "2024-11-01 15:12:54",
      request_status: 1,
      request_created_date: "2024-10-25 15:12:54.120",
      request_updated_date: "2024-10-25 22:22:35.963",
    },
    {
      id: 2,
      user_id: "Scarlet",
      approved_status: null,
      fish_id: 2,
      auction_id: null,
      buy_out: 1800,
      start_price: 1500,
      method_type: 1,
      start_time: "2024-10-25 15:12:54",
      end_time: "2024-11-01 15:12:54",
      request_status: 0,
      request_created_date: "2024-10-25 15:12:54.120",
      request_updated_date: "2024-10-25 15:12:54.120",
    },
    {
      id: 3,
      user_id: "Stone",
      approved_status: null,
      fish_id: 3,
      auction_id: null,
      buy_out: 1300,
      start_price: 1200,
      method_type: 2,
      start_time: "2024-10-25 15:12:54",
      end_time: "2024-11-01 15:12:54",
      request_status: 0,
      request_created_date: "2024-10-25 15:12:54.120",
      request_updated_date: "2024-10-25 15:12:54.120",
    },
    {
      id: 4,
      user_id: "Kevin",
      approved_status: null,
      fish_id: 4,
      auction_id: null,
      buy_out: 1900,
      start_price: 1800,
      method_type: 0,
      start_time: "2024-10-25 15:12:54",
      end_time: "2024-11-01 15:12:54",
      request_status: 1,
      request_created_date: "2024-10-25 15:12:54.120",
      request_updated_date: "2024-10-26 09:07:06.927",
    },
    {
      id: 5,
      user_id: "DAT",
      approved_status: null,
      fish_id: 5,
      auction_id: null,
      buy_out: 2100,
      start_price: 2000,
      method_type: 1,
      start_time: "2024-10-25 15:12:54",
      end_time: "2024-11-01 15:12:54",
      request_status: 0,
      request_created_date: "2024-10-25 15:12:54.120",
      request_updated_date: "2024-10-25 15:12:54.120",
    },
    {
      id: 6,
      user_id: "Phuc",
      approved_status: null,
      fish_id: 6,
      auction_id: null,
      buy_out: 1750,
      start_price: 1700,
      method_type: 2,
      start_time: "2024-10-25 15:12:54",
      end_time: "2024-11-01 15:12:54",
      request_status: 0,
      request_created_date: "2024-10-25 15:12:54.120",
      request_updated_date: "2024-10-25 15:12:54.120",
    },
  ]);
  const [koifish, setKoifish] = useState([
    {
      id: 1,
      name: "Koi Fish A",
      species: "Kohaku",
      age: 2,
      size: "30 cm",
      description: "A beautiful Kohaku koi fish with bright red markings.",
    },
    {
      id: 2,
      name: "Koi Fish B",
      species: "Sanke",
      age: 3,
      size: "35 cm",
      description:
        "A graceful Sanke koi with a combination of red, black, and white colors.",
    },
    {
      id: 3,
      name: "Koi Fish C",
      species: "Showa",
      age: 4,
      size: "40 cm",
      description:
        "A stunning Showa koi with dark black and vibrant orange patterns.",
    },
  ]);
  const [infoKoiFishModal, setinfoKoiFishModal] = useState(false);
  const [infoAuctionModal, setinfoAuctionModal] = useState(false);
  const [selectedAuctionRequest, setSelectedAuctionRequest] = useState(null);
  const [selectedKoifish, setselectedKoifish] = useState(null);
  const handleOpenKoiFishModal = (AuctionRequest) => {
    const koiFishData = koifish.find((fish) => fish.id === AuctionRequest.fish_id);
    if (koiFishData) {
      setselectedKoifish(koiFishData);
      setinfoKoiFishModal(true);
    }
  };
  const handleOpenAuctionModal = (AuctionRequest) => {
    setSelectedAuctionRequest(AuctionRequest);
    setinfoAuctionModal(true);
  };

  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Manage Auction Request</h2>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
        <tr className="table-dark">
          <th>ID</th>
          <th>Breeder</th>
          <th>Auction Detail</th>
          <th>Koi Fish Detail</th>
          <th>Actions</th>
        </tr>
        {AuctionRequest?.map((aucionRequest, index) => {
          return (
            <tr key={index}>
              <td>{aucionRequest.id}</td>
              <td>{aucionRequest.user_id}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleOpenKoiFishModal(aucionRequest)}
                >
                  Detail
                </button>
              </td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleOpenAuctionModal(aucionRequest)}
                >
                  Detail
                </button>
              </td>
              <td>
              <button 
               className={styles.actionBtn + " " + styles.deleteBtn}
                >
                 <FontAwesomeIcon icon={faCheck} />
                </button>
                <button 
                className={styles.actionBtn + " " + styles.deleteBtn}
                >
                 <FontAwesomeIcon icon={faXmark} />
                </button>
              </td>
            </tr>
          );
        })}
      </table>

      <Modal show={infoKoiFishModal}>
        <div class="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setinfoKoiFishModal(false)}
          ></button>
          <h1 class="text-body-emphasis">Koi Fish</h1>
          <div>
            {selectedKoifish && (
              <div>
                <input
                  readOnly
                  type="text"
                  name="id"
                  placeholder="ID"
                  value={selectedKoifish.id}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={selectedKoifish.name}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="species"
                  placeholder="Species"
                  value={selectedKoifish.species}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={selectedKoifish.age}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={selectedKoifish.size}
                  className={styles.roundedInput}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
      <Modal show={infoAuctionModal}>
        <div class="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setinfoAuctionModal(false)}
          ></button>
          <h1 class="text-body-emphasis">Auction</h1>
          <div>
            {selectedAuctionRequest && (
              <div>
                <input
                  readOnly
                  type="text"
                  name="buy_out"
                  placeholder="Buy Out"
                  value={selectedAuctionRequest.buy_out}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="start_price"
                  placeholder="Start Price "
                  value={selectedAuctionRequest.start_price}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="method_type"
                  placeholder="Method Type"
                  value={selectedAuctionRequest.method_type}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="start_time"
                  placeholder="Start Date"
                  value={selectedAuctionRequest.start_time}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="end_time"
                  placeholder="End Date"
                  value={selectedAuctionRequest.end_time}
                  className={styles.roundedInput}
                />
              
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Request;
