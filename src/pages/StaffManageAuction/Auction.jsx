import React, { useState } from "react";
import styles from "./Auction.module.css";
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
function Auction() {
  const [auctions, setAuctions] = useState([
    {
      name: "John Carter",
      status: "ACTIVE",
      koiFishId: 1,
      startDate: "14/02/2025 20:00",
      endDate: "14/02/2025 20:00",
    },
    {
      name: "Emily Nguyen",
      status: "ACTIVE",
      koiFishId: 2,
      startDate: "14/02/2025 20:00",
      endDate: "14/02/2025 20:00",
    },
    {
      name: "Michael Thompson",
      status: "ACTIVE",
      koiFishId: 3,
      startDate: "14/02/2025 20:00",
      endDate: "14/02/2025 20:00",
    },
    {
      name: "Sophia Lee",
      status: "ACTIVE",
      koiFishId: 2,
      startDate: "14/02/2025 20:00",
      endDate: "14/02/2025 20:00",
    },
    {
      name: "David Johnson",
      status: "END",
      koiFishId: 2,
      startDate: "14/02/2025 20:00",
      endDate: "14/02/2025 20:00",
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
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [selectedKoifish, setselectedKoifish] = useState(null);

  const handleOpenKoiFishModal = (auction) => {
    const koiFishData = koifish.find((fish) => fish.id === auction.koiFishId);
    if (koiFishData) {
      setselectedKoifish(koiFishData);
      setinfoKoiFishModal(true);
    }
  };

  const handleOpenAuctionModal = (auction) => {
    setSelectedAuction(auction);
    setinfoAuctionModal(true);
  };
  return (
    <div>
      <div className="container py-3 table">
        <h2 className="mb-5 text-center">Manage Auction </h2>
        <table class="table table-light  border border-dark shadow p-3 mb-5 rounded-4">
          <tr className="table-dark">
            <th>Name</th>
            <th>Status</th>
            <th>Koi Fish Detail</th>
            <th>Auction Detail</th>
          </tr>
          {auctions?.map((auction, index) => {
            return (
              <tr key={index}>
                <td>{auction.name}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      auction.status === "ACTIVE"
                        ? styles.statusActive
                        : styles.statusEnd
                    }`}
                  >
                    {auction.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() => handleOpenKoiFishModal(auction)}
                  >
                    Detail
                  </button>
                </td>
                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() => handleOpenAuctionModal(auction)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
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
            {selectedAuction && (
              <div>
                <input
                  readOnly
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={selectedAuction.name}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="status"
                  placeholder="Status"
                  value={selectedAuction.status}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="startDate"
                  placeholder="Start Date"
                  value={selectedAuction.startDate}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="endDate"
                  placeholder="End Date"
                  value={selectedAuction.endDate}
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

export default Auction;
