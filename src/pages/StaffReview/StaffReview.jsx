import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./StaffReview.module.css";
import { useDispatch, useSelector } from "react-redux";
import {  getKoiFishById, getAuctionRequestForStaffToAssign, staffReview } from "../../redux/apiRequest";

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

function StaffReview() {
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const aucionRequestList = useSelector(
    (state) => state.auctionrequest.auctionrequestforstafftoassign?.auctionrequestforstafftoassigns
  );
  const koifishById = useSelector(
    (state) => state.koifish.koifishs?.koifishById
  );
  const { currentUser } = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    getAuctionRequestForStaffToAssign(token, currentUser.id, dispatch);
  }, []);

  const [infoKoiFishModal, setinfoKoiFishModal] = useState(false);
  const [infoAuctionModal, setinfoAuctionModal] = useState(false);
  const [showReviewModal, setshowReviewModal] = useState(false);
  const [selectedAuctionRequest, setSelectedAuctionRequest] = useState(null);
  const [auctionRequestId, setauctionRequestId] = useState("");
  const [staffId, setstaffId] = useState("");
  const [isApproved, setisApproved] = useState(false);


  const handleReview = async () => {
    const ReviewData = {
      auctionRequestId: auctionRequestId,
      staffId: staffId,
      isApproved: isApproved,
    };
    await staffReview(dispatch, ReviewData, token);
    resetForm();
    setshowReviewModal(false);
  };

  const resetForm = () => {
    setauctionRequestId("");
    setstaffId("");
    setisApproved(false);
  };

  const handleOpenKoiFishModal = (AuctionRequest) => {
    setSelectedAuctionRequest(AuctionRequest);
    getKoiFishById(token, AuctionRequest.fish, dispatch);
    setinfoKoiFishModal(true);
  };

  const handleOpenAuctionModal = (AuctionRequest) => {
    setSelectedAuctionRequest(AuctionRequest);
    setinfoAuctionModal(true);
  };

  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Review Auction Requests</h2>
      <table className="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
        <tr className="table-dark">
          <th>ID</th>
          <th>Breeder</th>
          <th>Koi Fish Detail</th>
          <th>Auction Detail</th>
          <th>Actions</th>
        </tr>
        {aucionRequestList?.map((aucionRequest) => {
          return (
            <tr key={aucionRequest.id}>
              <td>{aucionRequest.id}</td>
              <td>{aucionRequest.user}</td>
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
                  className={styles.actionBtn}
                  onClick={() => setshowReviewModal(true)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </td>
            </tr>
          );
        })}
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
          <h1 class="text-body-emphasis text-start">Auction</h1>
          <div>
            {selectedAuctionRequest && (
              <div>
                <div>
                  <label className="form-label"><strong>Buy Out Price:</strong></label>
                  <input
                    readOnly
                    value={selectedAuctionRequest.buyOut}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Start Price:</strong></label>
                  <input
                    readOnly
                    value={selectedAuctionRequest.startPrice}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Method Type:</strong></label>
                  <input
                    readOnly
                    value={selectedAuctionRequest.methodType}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Start Time:</strong></label>
                  <input
                    readOnly
                    value={selectedAuctionRequest.startTime}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>End Time:</strong></label>
                  <input
                    readOnly
                    value={selectedAuctionRequest.endTime}
                    className={styles.roundedInput}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal show={showReviewModal}>
        <div className="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setshowReviewModal(false)}
          ></button>
          <h1 className="text-body-emphasis">Review Request</h1>
          <form onSubmit={handleReview}>
            <input
              type="text"
              name="auctionRequestId"
              onChange={(e) => setauctionRequestId(e.target.value)}
              placeholder="AuctionRequest ID"
              className={styles.roundedInput}
            />
            <input
              type="text"
              name="staffId"
              onChange={(e) => setstaffId(e.target.value)}
              placeholder="Staff ID"
              className={styles.roundedInput}
            />

            <div className="col-auto d-flex align-items-center">
              <h5 className="mb-0 me-2">Approve:</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ApproveCheckbox"
                  checked={isApproved}
                  onChange={(e) => setisApproved(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="ApproveCheckbox">
                  {isApproved ? "true" : "false"}
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-dark">
              Submit Review
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default StaffReview;
