import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionRequestByAssignedStaff, getKoiFishById, getAuctionById } from "../../redux/apiRequest";

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
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const aucionRequestList = useSelector(
    (state) => state.auctionrequest.auctionrequestbyassignedstaff?.auctionrequestbyassignedstaffs
  );
  const auctionById = useSelector(
    (state) => state.auction.getAuction?.allAuctions
  );
  const koifishById = useSelector(
    (state) => state.koifish.koifishs?.koifishById
  );
  const { currentUser } = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    getAuctionRequestByAssignedStaff(token, currentUser.id, dispatch);
  }, []);
  console.log(aucionRequestList);
  console.log(auctionById);


  const [infoKoiFishModal, setinfoKoiFishModal] = useState(false);
  const [infoAuctionModal, setinfoAuctionModal] = useState(false);
  const [selectedAuctionRequest, setSelectedAuctionRequest] = useState(null);



  const handleOpenKoiFishModal = (AuctionRequest) => {
    setSelectedAuctionRequest(AuctionRequest);
    getKoiFishById(token, AuctionRequest.fish, dispatch);
    setinfoKoiFishModal(true);
  };

  const handleOpenAuctionModal = (AuctionRequest) => {
    getAuctionById(token, AuctionRequest.auction, dispatch);
    setinfoAuctionModal(true);
  };
  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Manage Auction Request</h2>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
        <tr className="table-dark">
          <th>ID</th>
          <th>Breeder</th>
          <th>Status</th>
          <th>Koi Fish Detail</th>
          <th>Auction Detail</th>
        </tr>
        {aucionRequestList?.map((aucionRequest) => (
          <tr key={aucionRequest.id}>
            <td>{aucionRequest.id}</td>
            <td>{aucionRequest.user}</td>
            <td>{aucionRequest.requestStatus}</td>
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
            
          </tr>
        ))}
      </table>

      <Modal show={infoKoiFishModal}>
        <div class="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setinfoKoiFishModal(false)}
          ></button>
          <h1 class="text-body-emphasis text-start">Koi Fish Detail</h1>
          <div>
            {koifishById && (
              <div>
                <div>
                  <label className="form-label"><strong>Name:</strong></label>
                  <input
                    readOnly
                    value={koifishById.name}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Sex:</strong></label>
                  <input
                    readOnly
                    value={koifishById.sex}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Size:</strong></label>
                  <input
                    readOnly
                    value={koifishById.size}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Age:</strong></label>
                  <input
                    readOnly
                    value={koifishById.age}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Description:</strong></label>
                  <input
                    readOnly
                    value={koifishById.description}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Status:</strong></label>
                  <input
                    readOnly
                    value={koifishById.status}
                    className={styles.roundedInput}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal show={infoAuctionModal}>
        <div class="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setinfoAuctionModal(false)}
          ></button>
          <h1 class="text-body-emphasis text-start">Auction Detail</h1>
          <div>
            {auctionById && (
              <div>
                <div>
                  <label className="form-label"><strong>ID:</strong></label>
                  <input
                    readOnly
                    value={auctionById.id}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Winner:</strong></label>
                  <input
                    readOnly
                    value={auctionById.winner}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Current Price:</strong></label>
                  <input
                    readOnly
                    value={auctionById.currentPrice}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Extension Seconds:</strong></label>
                  <input
                    readOnly
                    value={auctionById.extensionSeconds}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Highest Price:</strong></label>
                  <input
                    readOnly
                    value={auctionById.highestPrice}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Deposit Amount:</strong></label>
                  <input
                    readOnly
                    value={auctionById.depositAmount}
                    className={styles.roundedInput}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
      
    </div>
  );
}

export default Auction;
