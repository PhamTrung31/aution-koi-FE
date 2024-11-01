import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateRequest.module.css";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs-plugin-utc";
import {
  getAllAuctionRequestByBreederID,
  addAuctionRequest,
  updateAuctionRequest,
  cancelAuctionRequest

} from "../../redux/apiRequest";
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
function CreateRequest() {
  dayjs.extend(utc);
  const [userId, setuserId] = useState("");
  const [fishId, setfishId] = useState("");
  const [buyOut, setbuyOut] = useState("");
  const [incrementStep, setincrementStep] = useState("");
  const [startPrice, setstartPrice] = useState("");
  const [methodType, setmethodType] = useState("");
  const [start_time, setstartTime] = useState("");
  const [end_time, setendTime] = useState("");

  const [selectedauctionrequest, setSelectedAuctionRequest] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const resetForm = () => {
    setuserId("");
    setfishId("");
    setbuyOut("");
    setincrementStep("");
    setstartPrice("");
    setmethodType("");
    setstartTime("");
    setendTime("");
  };

  const token = useSelector(
    (state) => state.auth.login?.currentToken.token
  );
  
  const aucionRequestList = useSelector(
    (state) => state.auctionrequest.auctionrequestbybreederid?.auctionrequestbybreederids
  );
  const { currentUser } = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  console.log(token);

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    return dayjs(dateTimeStr).format("YYYY-MM-DD HH:mm:ss");
  };

  const convertToUTCString = (dateTime) => {
    return dayjs(dateTime).utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
  };
  
  useEffect(() => {
    getAllAuctionRequestByBreederID(token, currentUser.id, dispatch);
  }, []);

  
  const handleSendRequest = async (e) => {
    e.preventDefault();
    const RequestData = {
      userId: parseInt(userId),
      fishId: parseInt(fishId),
      buyOut: parseFloat(buyOut),
      incrementStep: parseInt(incrementStep),
      startPrice: parseFloat(startPrice),
      methodType: methodType,
      start_time: start_time,
      end_time: end_time,
    };
    console.log(RequestData)
    await addAuctionRequest(dispatch, RequestData, token);
    resetForm();
    setShowAddModal(false);
  };
  const handleUpdateSendRequest = async (e) => {
    e.preventDefault();
    const RequestData = {
      userId: parseInt(userId),
      fishId: parseInt(fishId),
      buyOut: parseFloat(buyOut),
      incrementStep: parseInt(incrementStep),
      startPrice: parseFloat(startPrice),
      methodType: methodType,
      start_time: start_time,
      end_time: end_time,
    };
    await updateAuctionRequest(dispatch, selectedauctionrequest.id, RequestData, token);
    resetForm();
    setShowEditModal(false);
  };

  const openEditModal = (auctionrequest) => {
    setSelectedAuctionRequest(auctionrequest);
    setuserId(auctionrequest.user);
    setfishId(auctionrequest.fish);
    setbuyOut(auctionrequest.buyOut);
    setincrementStep(auctionrequest.incrementStep);
    setstartPrice(auctionrequest.startPrice);
    setmethodType(auctionrequest.methodType);
    setstartTime(auctionrequest.start_time);
    setendTime(auctionrequest.end_time);
    setShowEditModal(true);
  };

  const openDetailsModal = (auctionrequest) => {
    setSelectedAuctionRequest(auctionrequest);
    setShowDetailsModal(true);
  };
 
  const handleCancelSendRequest = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await cancelAuctionRequest(dispatch, id, currentUser.id, token);
    }
  };

  

  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Your Auction Request</h2>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4 overflow-auto">
        <tr className="table-dark ">
          <th>ID</th>
          <th>Fish ID</th>
          <th>Auction Detail </th>
          <th>Status</th>
          <th>Assigned Staff</th>
          <th>Auction</th>
          <th>Action</th>
          
        </tr>

        {aucionRequestList?.map((request) => {
          return (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.fish}</td>
              <td>
                <button
                  className={`${styles.actionBtn} ${styles.viewBtn}`}
                  onClick={() => openDetailsModal(request)}
                >
                  Detail
                </button></td>
              <td>{request.requestStatus}</td>
              <td>{request.assignedStaff}</td>
              <td>{request.auction}</td>
              <td>
                <button
                  className={styles.actionBtn + " " + styles.editBtn}
                  onClick={() => openEditModal(request)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className={styles.actionBtn + " " + styles.deleteBtn}
                  onClick={() => handleCancelSendRequest(request.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </td>
            </tr>
          );
        })}
      </table>

      <button
        className={styles.buttonkoi + " btn btn-outline-dark"}
        onClick={() => setShowAddModal(true)}
      >
        Create New Request
      </button>
      <Modal show={showAddModal}>
        <div className="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowAddModal(false)}
          ></button>
          <h1 className="text-body-emphasis">Create Request</h1>
          <div>
            <form onSubmit={handleSendRequest}>
              {/* User ID Field */}
              <input
                type="text"
                name="userId"
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
                placeholder="Your ID"
                className={styles.roundedInput}
              />

              {/* Method Type Field */}
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2">Method:</h5>
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="TraditionalMethod"
                    name="method"
                    value="TRADITIONAL"
                    checked={methodType === "TRADITIONAL"}
                    onChange={() => setmethodType("TRADITIONAL")}
                  />
                  <label className="form-check-label" htmlFor="TraditionalMethod">
                    TRADITIONAL
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="AnonymousMethod"
                    name="method"
                    value="ANONYMOUS"
                    checked={methodType === "ANONYMOUS"}
                    onChange={() => setmethodType("ANONYMOUS")}
                  />
                  <label className="form-check-label" htmlFor="AnonymousMethod">
                    ANONYMOUS
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="FixedPriceMethod"
                    name="method"
                    value="FIXED_PRICE"
                    checked={methodType === "FIXED_PRICE"}
                    onChange={() => setmethodType("FIXED_PRICE")}
                  />
                  <label className="form-check-label" htmlFor="FixedPriceMethod">
                    FIXED PRICE
                  </label>
                </div>
              </div>

              {/* Fish ID Field */}
              <input
                type="text"
                name="fishId"
                value={fishId}
                onChange={(e) => setfishId(e.target.value)}
                placeholder="Fish ID"
                className={styles.roundedInput}
              />

              {/* Buy Out Price Field */}
              <input
                type="number"
                name="buyOut"
                value={buyOut}
                onChange={(e) => setbuyOut(e.target.value)}
                placeholder="Buy Out Price"
                className={styles.roundedInput}
              />

              {/* Increment Step Field */}
              <input
                type="number"
                name="incrementStep"
                value={incrementStep}
                onChange={(e) => setincrementStep(e.target.value)}
                placeholder="Increment Step"
                className={styles.roundedInput}
              />

              {/* Start Price Field */}
              <input
                type="number"
                name="startPrice"
                value={startPrice}
                onChange={(e) => setstartPrice(e.target.value)}
                placeholder="Start Price"
                className={styles.roundedInput}
              />

              {/* Start Time Field */}
              <input
                type="text" // Changed from datetime-local to text
                name="start_time"
                value={start_time}
                onChange={(e) => setstartTime(e.target.value)}
                placeholder="Start Time (e.g., 2024-10-22T23:11:00Z)"
                className={styles.roundedInput}
              />

              {/* End Time Field */}
              <input
                type="text" // Changed from datetime-local to text
                name="end_time"
                value={end_time}
                onChange={(e) => setendTime(e.target.value)}
                placeholder="End Time (e.g., 2024-10-22T23:11:00Z)"
                className={styles.roundedInput}
              />

              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
      </form>
    </div>
  </div>
      </Modal>

      <Modal show={showEditModal}>
        <div class="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowEditModal(false)}
          ></button>
          <h1 class="text-body-emphasis">Edit User</h1>
          <div>
            <form onSubmit={handleUpdateSendRequest}>
            {/* User ID Field */}
            <input
                type="text"
                name="userId"
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
                placeholder="Your ID"
                className={styles.roundedInput}
              />

              {/* Method Type Field */}
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-2">Method:</h5>
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="TraditionalMethod"
                    name="method"
                    value="TRADITIONAL"
                    checked={methodType === "TRADITIONAL"}
                    onChange={() => setmethodType("TRADITIONAL")}
                  />
                  <label className="form-check-label" htmlFor="TraditionalMethod">
                    TRADITIONAL
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="AnonymousMethod"
                    name="method"
                    value="ANONYMOUS"
                    checked={methodType === "ANONYMOUS"}
                    onChange={() => setmethodType("ANONYMOUS")}
                  />
                  <label className="form-check-label" htmlFor="AnonymousMethod">
                    ANONYMOUS
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="FixedPriceMethod"
                    name="method"
                    value="FIXED_PRICE"
                    checked={methodType === "FIXED_PRICE"}
                    onChange={() => setmethodType("FIXED_PRICE")}
                  />
                  <label className="form-check-label" htmlFor="FixedPriceMethod">
                    FIXED PRICE
                  </label>
                </div>
              </div>

              {/* Fish ID Field */}
              <input
                type="text"
                name="fishId"
                value={fishId}
                onChange={(e) => setfishId(e.target.value)}
                placeholder="Fish ID"
                className={styles.roundedInput}
              />

              {/* Buy Out Price Field */}
              <input
                type="number"
                name="buyOut"
                value={buyOut}
                onChange={(e) => setbuyOut(e.target.value)}
                placeholder="Buy Out Price"
                className={styles.roundedInput}
              />

              {/* Increment Step Field */}
              <input
                type="number"
                name="incrementStep"
                value={incrementStep}
                onChange={(e) => setincrementStep(e.target.value)}
                placeholder="Increment Step"
                className={styles.roundedInput}
              />

              {/* Start Price Field */}
              <input
                type="number"
                name="startPrice"
                value={startPrice}
                onChange={(e) => setstartPrice(e.target.value)}
                placeholder="Start Price"
                className={styles.roundedInput}
              />

              {/* Start Time Field */}
              <input
                type="text" // Changed from datetime-local to text
                name="start_time"
                value={start_time}
                onChange={(e) => setstartTime(e.target.value)}
                placeholder="Start Time (e.g., 2024-10-22T23:11:00Z)"
                className={styles.roundedInput}
              />

              {/* End Time Field */}
              <input
                type="text" // Changed from datetime-local to text
                name="end_time"
                value={end_time}
                onChange={(e) => setendTime(e.target.value)}
                placeholder="End Time (e.g., 2024-10-22T23:11:00Z)"
                className={styles.roundedInput}
              />

              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal show={showDetailsModal}>
        <div className="position-relative p-4 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowDetailsModal(false)}
          ></button>
          <h1 className="text-body-emphasis">Auction Request Details</h1>
          {selectedauctionrequest && (
            <div>
              <p><strong>Increment Step:</strong> {selectedauctionrequest.incrementStep}</p>
              <p><strong>Method:</strong> {selectedauctionrequest.methodType}</p>
              <p><strong>Start Price:</strong> {selectedauctionrequest.startPrice}</p>
              <p><strong>Buy Out Price:</strong> {selectedauctionrequest.buyOut}</p>
              <p><strong>Start Time:</strong> {formatDateTime(selectedauctionrequest.start_time)}</p>
             <p><strong>End Time:</strong> {formatDateTime(selectedauctionrequest.end_time)}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CreateRequest;
