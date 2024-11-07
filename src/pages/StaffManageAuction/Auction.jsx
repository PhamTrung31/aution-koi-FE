import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionRequestByAssignedStaff, getKoiFishById, setTime } from "../../redux/apiRequest";

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

  const koifishById = useSelector(
    (state) => state.koifish.koifishs?.koifishById
  );
  const { currentUser } = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    getAuctionRequestByAssignedStaff(token, currentUser.id, dispatch);
  }, []);
  console.log(aucionRequestList);



  const [infoKoiFishModal, setinfoKoiFishModal] = useState(false);
  const [infoAuctionModal, setinfoAuctionModal] = useState(false);
  const [setTimeModal, setSetTimeModal] = useState(false);
  const [timeForm, setTimeForm] = useState({
    startTime: '',
    endTime: ''
  });
  const [incrementStep, setIncrementStep] = useState(0);
  const [selectedAuction, setSelectedAuction] = useState(null);



  const handleOpenKoiFishModal = (AuctionRequest) => {
    getKoiFishById(token, AuctionRequest.fish, dispatch);
    setinfoKoiFishModal(true);
  };

  const handleOpenAuctionModal = (auctionRequest) => {
    setSelectedAuction(auctionRequest);
    setinfoAuctionModal(true);
  };

  const handleOpenSetTimeModal = (auctionRequest) => {
    setSelectedAuction(auctionRequest);
    setSetTimeModal(true);
  };

  const handleSetTime = async (e) => {
    e.preventDefault();
    const data = {
      auctionRequestId: selectedAuction.id,
      staffId: currentUser.id,
      start_time: new Date(timeForm.startTime).toISOString(),
      end_time: new Date(timeForm.endTime).toISOString(),
      incrementStep: incrementStep
    };
    setTime(dispatch, data, currentUser.id, token);
    setSetTimeModal(false);
    setSelectedAuction(null);
    setTimeForm({ startTime: '', endTime: '' });
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
          <th>Action</th>
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
            <td>
              <button 
                className={styles.viewBtn} 
                onClick={() => handleOpenSetTimeModal(aucionRequest)}
              >
                Set Time
              </button>
            </td>
          </tr>
        ))}
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
          {koifishById && (
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
          )}
        </div>
      </Modal>

      <Modal show={infoAuctionModal}>
        <div class="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => {
              setinfoAuctionModal(false);
              setSelectedAuction(null);
            }}
          ></button>
          <h1 class="text-body-emphasis text-start">Auction Detail</h1>
          <div>
            {selectedAuction && (
              <div>
                <div>
                  <label className="form-label"><strong>Buy Out:</strong></label>
                  <input
                    readOnly
                    value={selectedAuction.buyOut}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Start Price:</strong></label>
                  <input
                    readOnly
                    value={selectedAuction.startPrice}
                    className={styles.roundedInput}
                  />
                </div>
                <div>
                  <label className="form-label"><strong>Method Type:</strong></label>
                  <input
                    readOnly
                    value={selectedAuction.methodType}
                    className={styles.roundedInput}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal show={setTimeModal}>
        <div className="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => {
              setSetTimeModal(false);
              setSelectedAuction(null);
              setTimeForm({ startTime: '', endTime: '' });
            }}
          ></button>
          <h1 className="text-body-emphasis text-start">Set Auction Time</h1>
          <form onSubmit={handleSetTime}>
            <div className="mb-3">
              <label className="form-label"><strong>Start Time:</strong></label>
              <input
                type="datetime-local"
                className={styles.roundedInput}
                value={timeForm.startTime}
                onChange={(e) => setTimeForm({...timeForm, startTime: e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><strong>End Time:</strong></label>
              <input
                type="datetime-local"
                className={styles.roundedInput}
                value={timeForm.endTime}
                onChange={(e) => setTimeForm({...timeForm, endTime: e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><strong>Increment Step:</strong></label>
              <input
                type="number"
                className={styles.roundedInput}
                value={incrementStep}
                onChange={(e) => setIncrementStep(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Auction;
