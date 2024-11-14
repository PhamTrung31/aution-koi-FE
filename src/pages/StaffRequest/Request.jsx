import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Request.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuction, apporve, getKoiFishById, sendToManager,getUserByUserId } from "../../redux/apiRequest";


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
  const breederUser = useSelector(
    (state) => state.user.getUserByUserId?.user
  );
  const aucionRequestList = useSelector(
    (state) => state.auctionrequest.auctionrequests?.allauctionrequests
  );
  const koifishById = useSelector(
    (state) => state.koifish.koifishs?.koifishById
  );
  const {currentUser} = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  console.log(token);

  useEffect(() => {
    getAllAuction(token, dispatch);
    console.log(aucionRequestList);
  }, []);
    
  const [infoKoiFishModal, setinfoKoiFishModal] = useState(false);
  const [infoAuctionModal, setinfoAuctionModal] = useState(false);
  const [showBreederModal, setShowBreederModal] = useState(false);
  const [selectedAuctionRequest, setSelectedAuctionRequest] = useState(null);

  
  
  const handleApprove = async (id) => {
    const ApproveData = {
      auctionRequestId: id,
      staffId: currentUser.id,
    };
    console.log(ApproveData);
    if (window.confirm("Are you sure you want to approve this auction request?")) {
      await apporve(dispatch, ApproveData, token);
    }
  };
  
  const handleSendToManager = async (id) => {
    const sendToManagerData = {
      auctionRequestId: id,
      staffId: currentUser.id,
    };
    console.log(sendToManagerData);
    if (window.confirm("Are you sure you want to send this auction request to manager?")) {
      await sendToManager(dispatch, sendToManagerData, token);
    }
  };

  const handleOpenKoiFishModal = (AuctionRequest) => {
    getKoiFishById(token, AuctionRequest.fish, dispatch);
    setinfoKoiFishModal(true);
  };

  const handleOpenAuctionModal = (AuctionRequest) => {
    setSelectedAuctionRequest(AuctionRequest);
    setinfoAuctionModal(true);
  };

  const handleOpenBreederModal = (userId) => {
    getUserByUserId(token, userId, dispatch);
    setShowBreederModal(true);
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
              <td>
              <button className={styles.viewBtn}
               onClick={() => handleOpenBreederModal(aucionRequest.user)}>
                View Breeder
                </button>
              </td>
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
               onClick={() => handleApprove(aucionRequest.id)}
                >
                 <FontAwesomeIcon icon={faCheck} />
                </button> 

                <button 
                className={styles.actionBtn }
                onClick={() => handleSendToManager(aucionRequest.id)}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </td>
            </tr>
          );
        })}
      </table>

      <Modal show={infoKoiFishModal}>
      <div className="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setinfoKoiFishModal(false)}
          ></button>
          <h1 className="text-body-emphasis text-start">Koi Fish Detail</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <img 
                    src={koifishById.imageUrl}
                    alt={koifishById.name}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                  />
                  {koifishById.videoUrl && (
                    <div className="mt-3">
                      <video 
                        controls
                        className="img-fluid rounded"
                        style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                      >
                        <source src={koifishById.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
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
                
              </div>
            )}</div>
      </div>
      </Modal>
      <Modal show={showBreederModal}>
        <div class="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowBreederModal(false)}
          ></button>
          <h1 class="text-body-emphasis">User Profile</h1>
          <div>
          <label className="form-label"><strong>Fullname:</strong></label>
              <input
                type="text"
                value={breederUser?.fullname}
                className={styles.roundedInput}
                readOnly
              />
              <label className="form-label"><strong>Phone:</strong></label>
              <input
                type="text"
                value={breederUser?.phone}
                className={styles.roundedInput}
                readOnly
              />
              <label className="form-label"><strong>Role:</strong></label>
              <input
                type="text"
                value={breederUser?.role}
                className={styles.roundedInput}
                readOnly
              />
              <label className="form-label"><strong>Address:</strong></label>
              <input
                type="text"
                value={breederUser?.address}
                className={styles.roundedInput}
                readOnly
              />

          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Request;
