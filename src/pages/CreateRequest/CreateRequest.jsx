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
  cancelAuctionRequest,
  getKoiFishById,
  getKoiFishByBreederId,
  addKoiFish
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

  const [name, setname] = useState("");
  const [sex, setsex] = useState("");
  const [size, setsize] = useState("");
  const [age, setage] = useState("");
  const [description, setdescription] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [videoUrl, setvideoUrl] = useState("");

  const [selectedauctionrequest, setSelectedAuctionRequest] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFishDetailModal, setShowFishDetailModal] = useState(false);
  const [showAddKoiFishModal, setShowAddKoiFishModal] = useState(false);



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
  const koifishById = useSelector(
    (state) => state.koifish.koifishs?.koifishById
  );
  const koiFishList = useSelector(
    (state) => state.koifish.koifishByBreederId?.koifishByBreederId
  );
  const { currentUser } = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  console.log(token);

 
  useEffect(() => {
    getAllAuctionRequestByBreederID(token, currentUser.id, dispatch);
    getKoiFishByBreederId(token, currentUser.id, dispatch);
  }, []);
  
 
  
  const handleSendRequest = async (e) => {
    e.preventDefault();
    const RequestData = {
      userId: parseInt(currentUser.id),
      fishId: parseInt(fishId),
      buyOut: parseFloat(buyOut),
      startPrice: parseFloat(startPrice),
      methodType: methodType,
    };
    console.log(RequestData)
    await addAuctionRequest(dispatch, RequestData, token);
    resetForm();
    setShowAddModal(false);
  };
  const handleUpdateSendRequest = async (e) => {
    e.preventDefault();
    const RequestData = {
      userId: parseInt(currentUser.id),
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
  const openFishDetailModal = (auctionrequest) => {
    setSelectedAuctionRequest(auctionrequest);
    getKoiFishById(token, auctionrequest.fish, dispatch);
    setShowFishDetailModal(true);
  };

  const handleCancelSendRequest = async (id) => {
    if (window.confirm("Are you sure you want to cancel this auction reuquest?")) {
      await cancelAuctionRequest(dispatch, id, currentUser.id, token);
    }
  };

  const handleAddKoiFish = async (e) => {
    e.preventDefault();
    const koiFishData = {
      name: name,
      sex: sex,
      size: size,
      age: age,
      description: description,
      imageUrl: imageUrl,
      videoUrl: videoUrl,
    };
    await addKoiFish(dispatch, koiFishData, currentUser.id, token);
    setShowAddKoiFishModal(false);
  };

  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Your Auction Request</h2>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4 overflow-auto">
        <tr className="table-dark ">
          <th>ID</th>
          <th>Fish Detail</th>
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
              <td>
                <button
                  className={`${styles.actionBtn} ${styles.viewBtn}`}
                  onClick={() => openFishDetailModal(request)}
                >
                  Detail
                </button>
                </td>
              <td>
                <button
                  className={`${styles.actionBtn} ${styles.viewBtn}`}
                  onClick={() => openDetailsModal(request)}
                >
                  Detail
                </button>
                </td>
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
          <h1 className="text-body-emphasis">Create New Request</h1>
            <div>
              <form onSubmit={handleSendRequest}>
                <div className="form-group mb-3">
                  <select
                    className="form-select form-select-lg mb-3"
                    value={fishId}
                    onChange={(e) => setfishId(e.target.value)}
                    required
                  >
                    <option value="">Select Fish</option>
                    {koiFishList?.map((fish) => (
                      <option key={fish.id} value={fish.id}>
                        {fish.name} - Size: {fish.size}cm - Age: {fish.age} months
                      </option>
                    ))}
                  </select>
                </div>
                
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

                <input
                  type="number"
                  name="buyOut"
                  value={buyOut}
                  onChange={(e) => setbuyOut(e.target.value)}
                  placeholder="Buy Out Price"
                  className={styles.roundedInput}
                />

                <input
                  type="number"
                  name="startPrice"
                  value={startPrice}
                  onChange={(e) => setstartPrice(e.target.value)}
                  placeholder="Start Price"
                  className={styles.roundedInput}
                />

                <button type="submit" className="btn btn-outline-dark mb-3 ">
                  Submit
                </button>
              </form>
              
              
            </div>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setShowAddKoiFishModal(true);
                }}
                className="btn btn-outline-dark w-100"
              >
                Create New Koi Fish
              </button>
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
          <h1 class="text-body-emphasis">Edit Auction Request</h1>
          <div>
            <form onSubmit={handleUpdateSendRequest}>

                  {/* Fish ID Field */}
                <div className="form-group mb-3">
                  <select
                    className="form-select form-select-lg mb-3"
                    value={fishId}
                    onChange={(e) => setfishId(e.target.value)}
                    required
                  >
                    <option value="">Select Fish</option>
                    {koiFishList?.map((fish) => (
                      <option key={fish.id} value={fish.id}>
                        {fish.name} - Size: {fish.size}cm - Age: {fish.age} months
                      </option>
                    ))}
                  </select>
                </div>
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

              

              {/* Buy Out Price Field */}
              <input
                type="number"
                name="buyOut"
                value={buyOut}
                onChange={(e) => setbuyOut(e.target.value)}
                placeholder="Buy Out Price"
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

              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal show={showDetailsModal}>
        <div className="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowDetailsModal(false)}
          ></button>
          <h1 className="text-body-emphasis text-start">Auction Request Details</h1>
          {selectedauctionrequest && (
            <div>
              <div>
                <label className="form-label"><strong>Method:</strong></label>
                <input
                  readOnly
                  value={selectedauctionrequest.methodType}
                  className={styles.roundedInput}
                />
              </div>
              <div>
                <label className="form-label"><strong>Start Price:</strong></label>
                <input
                  readOnly
                  value={selectedauctionrequest.startPrice}
                  className={styles.roundedInput}
                />
              </div>
              <div>
                <label className="form-label"><strong>Buy Out Price:</strong></label>
                <input
                  readOnly
                  value={selectedauctionrequest.buyOut}
                  className={styles.roundedInput}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
      
      <Modal show={showFishDetailModal}>
        <div className="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowFishDetailModal(false)}
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

      <Modal show={showAddKoiFishModal}>
        <div className="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowAddKoiFishModal(false)}
          ></button>
          <h1 className="text-body-emphasis">Add New Koi Fish</h1>
          <div>
            <form onSubmit={handleAddKoiFish}>
              <div className="row">
                {/* Left Column - Media Inputs */}
                <div className="col-md-6 border-end">
                  <div className="form-group mb-3">
                    <input
                      type="url"
                      name="image_url"
                      value={imageUrl}
                      onChange={(e) => setimageUrl(e.target.value)}
                      placeholder="Image URL"
                      className={styles.roundedInput}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <input
                      type="url"
                      name="video_url"
                      value={videoUrl}
                      onChange={(e) => setvideoUrl(e.target.value)}
                      placeholder="Video URL"
                      className={styles.roundedInput}
                      required
                    />
                  </div>
                </div>

                {/* Right Column - Other Fields */}
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Fish Name"
                      className={styles.roundedInput}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <select
                      className="form-select form-select-lg mb-3"
                      value={sex}
                      onChange={(e) => setsex(e.target.value)}
                      required
                    >
                      <option value="">Select Sex</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <input
                      type="number"
                      name="size"
                      value={size}
                      onChange={(e) => setsize(e.target.value)}
                      placeholder="Size (cm)"
                      className={styles.roundedInput}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <input
                      type="number"
                      name="age"
                      value={age}
                      onChange={(e) => setage(e.target.value)}
                      placeholder="Age (months)"
                      className={styles.roundedInput}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <textarea
                      name="description"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      placeholder="Description"
                      className={styles.roundedInput}
                      rows="3"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-outline-dark mb-3">
                Add Koi Fish
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateRequest;
