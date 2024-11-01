import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Request.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuction, apporve } from "../../redux/apiRequest";

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

  const token = useSelector(
    (state) => state.auth.login?.currentToken.token
  );
  
  const aucionRequestList = useSelector(
    (state) => state.auctionrequest.auctionrequests?.allauctionrequests
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
  const [selectedKoifish, setselectedKoifish] = useState(null);
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
                  name="buyOut"
                  placeholder="Buy Out"
                  value={selectedAuctionRequest.buyOut}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="startPrice"
                  placeholder="Start Price "
                  value={selectedAuctionRequest.startPrice}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="incrementStep"
                  placeholder="Increment Step "
                  value={selectedAuctionRequest.incrementStep}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="methodType"
                  placeholder="Method Type"
                  value={selectedAuctionRequest.methodType}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="startTime"
                  placeholder="Start Time"
                  value={selectedAuctionRequest.startTime}
                  className={styles.roundedInput}
                />
                <input
                  readOnly
                  type="text"
                  name="endTime"
                  placeholder="End Time"
                  value={selectedAuctionRequest.endTime}
                  className={styles.roundedInput}
                />
              
              </div>
            )}
          </div>
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
                        {isSendToManager ? "True" : "False"}
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
