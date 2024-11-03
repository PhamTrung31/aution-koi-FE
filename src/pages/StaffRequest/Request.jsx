import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Request.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuction, apporve, getKoiFishById } from "../../redux/apiRequest";


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
  const token = useSelector(
    (state) => state.auth.login?.currentToken.token
  );
  
  const aucionRequestList = useSelector(
    (state) => state.auctionrequest.auctionrequests?.allauctionrequests
  );
  const koifishById = useSelector(
    (state) => state.koifish.koifishs?.koifishById
  );
  const dispatch = useDispatch();
  console.log(token);

  useEffect(() => {
    getAllAuction(token, dispatch);
    console.log(aucionRequestList);
  }, []);
    
  const [infoKoiFishModal, setinfoKoiFishModal] = useState(false);
  const [infoAuctionModal, setinfoAuctionModal] = useState(false);
  const [showApproveModal, setshowApproveModal] = useState(false);
  const [selectedAuctionRequest, setSelectedAuctionRequest] = useState(null);
  const [auctionRequestId, setauctionRequestId] = useState("");
  const [staffId, setstaffId] = useState("");
  const [isSendToManager, setisSendToManager] = useState(false);

  
  
  const handleApprove = async () => {
    const ApproveData = {
      auctionRequestId: auctionRequestId,
      staffId: staffId,
      isSendToManager: isSendToManager,
    };
    await apporve(dispatch, ApproveData, token);
    resetForm();
    setshowApproveModal(false);
  };

  const resetForm = () => {
    setauctionRequestId("");
    setstaffId("");
    setisSendToManager("");
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
      <h2 className="mb-5 text-center">Manage Auction Request</h2>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
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
               className={styles.actionBtn }
               onClick={() => setshowApproveModal(true)}
                >
                 <FontAwesomeIcon icon={faCheck} />
                </button> 
              </td>
            </tr>
          );
        })}
      </table>

      <Modal show={infoKoiFishModal}>
        <div className="position-relative p-4 text-start text-muted bg-body border border-dashed rounded-5"> 
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setinfoKoiFishModal(false)}
          ></button>
          <h1 className="text-body-emphasis text-start">Koi Fish Detail</h1>
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
            )}</div>
      </div>
        </Modal>
      

      <Modal show={showApproveModal}>
        <div className="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setshowApproveModal(false)}
          ></button>
          <h1 className="text-body-emphasis">Create Request</h1>
          <div>
            <form onSubmit={handleApprove}>
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
                    <h5 className="mb-0 me-2">Send To Manager:</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="YesNoCheckbox"
                        checked={isSendToManager}
                        onChange={(e) => setisSendToManager(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="YesNoCheckbox"
                      >
                        {isSendToManager ? "true" : "false"}
                      </label>
                    </div>
                  </div>
              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
      </form>
    </div>
  </div>
      </Modal>
    </div>
  );
}

export default Request;
