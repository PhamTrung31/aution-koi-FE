import React, { useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateRequest.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImage from "../../utils/firebase/uploadImage.jsx";

import {
  getAllAuctionRequestByBreederID,
  addAuctionRequest,
  updateAuctionRequest,
  cancelAuctionRequest,
  getKoiFishById,
  getKoiFishByBreederId,
  addKoiFish,
  getKoiFishWithStatusNew
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
  const [fishId, setfishId] = useState("");
  const [buyOut, setbuyOut] = useState("");
  const [startPrice, setstartPrice] = useState("");
  const [methodType, setmethodType] = useState("");
  const [name, setname] = useState("");
  const [sex, setsex] = useState("");
  const [size, setsize] = useState("");
  const [age, setage] = useState("");
  const [description, setdescription] = useState("");
  const [img, setImg] = useState("");
  const [vid, setVid] = useState("");

  const [selectedauctionrequest, setSelectedAuctionRequest] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFishDetailModal, setShowFishDetailModal] = useState(false);
  const [showAddKoiFishModal, setShowAddKoiFishModal] = useState(false);
  const inputImgRef = useRef(null);
  const inputVidRef = useRef(null);

  const resetForm = () => {
    setfishId("");
    setbuyOut("");
    setstartPrice("");
    setmethodType("");
  };

  const resetKoiFishForm = () => {
    setname("");
    setsex("");
    setsize("");
    setage("");
    setdescription("");
    setImg("");
    setVid("");
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

  const koiFishWithStatusNew = useSelector(
    (state) => state.koifish.koifishWithStatusNew?.koifishWithStatusNew
  );
  const { currentUser } = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  console.log(token);

  useEffect(() => {
    getAllAuctionRequestByBreederID(token, currentUser.id, dispatch);
    getKoiFishByBreederId(token, currentUser.id, dispatch);
  }, []);
  useEffect(() => {
    getKoiFishWithStatusNew(token, currentUser.id, dispatch);
  }, []);
  console.log(koiFishList);
  console.log(koiFishWithStatusNew);
  
  const handleSendRequest = async (e) => {
    e.preventDefault();
    const RequestData = {
      userId: currentUser.id,
      fishId: parseInt(fishId),
      buyOut: parseFloat(buyOut),
      startPrice: parseFloat(startPrice),
      methodType: methodType,
    };
    console.log(RequestData);
    resetForm();
    await addAuctionRequest(dispatch, RequestData, token, currentUser.id);
    setShowAddModal(false);
  };

  const handleUpdateSendRequest = async (e) => {
    e.preventDefault();
    const RequestData = {
      userId: currentUser.id,
      fishId: parseInt(fishId),
      buyOut: parseFloat(buyOut),
      startPrice: parseFloat(startPrice),
      methodType: methodType,
    };
    resetForm(); 
    await updateAuctionRequest(dispatch, selectedauctionrequest.id, RequestData, token, currentUser.id);
    setShowEditModal(false);
  };

  const openEditModal = (auctionrequest) => {
    setSelectedAuctionRequest(auctionrequest);
    setfishId(auctionrequest.fish);
    setbuyOut(auctionrequest.buyOut);
    setstartPrice(auctionrequest.startPrice);
    setmethodType(auctionrequest.methodType);
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
    if (!img) {
      toast.error("Please add koi fish image");
      return;
    }
    if (!vid) {
      toast.error("Please add koi fish video");
      return;
    }

    const url = await uploadImage(img);
    const videoUrl = await uploadImage(vid);
    if (url && videoUrl) {
      const koiFishData = {
        name: name,
        sex: sex,
        size: size,
        age: age,
        description: description,
        imageUrl: url,
        videoUrl: videoUrl,
      };
      await addKoiFish(dispatch, koiFishData, currentUser.id, token);
      toast.success("Koi fish added successfully!");
      setImg("");
      resetKoiFishForm();
      setShowAddKoiFishModal(false);
      
    }
  };

  const handleImageClick = () => {
    inputImgRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImg(file);
  }

  const handleVideoClick = () => {
    inputVidRef.current.click();
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setVid(file);
  }

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  useEffect(() => {
    if (!showAddModal) {
      resetForm();
    }
  }, [showAddModal]);

  useEffect(() => {
    if (!showEditModal) {
      resetForm();
    }
  }, [showEditModal]);

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
        onClick={openAddModal}
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
                    onChange={(e) => setfishId(e.target.value)}
                    required
                  >
                    <option value="">Select Fish</option>
                    {koiFishWithStatusNew?.map((fish) => (
                      <option key={fish.id} value={fish.id}>
                        {fish.name} - Size: {fish.size}cm - Age: {fish.age} years
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
                  onChange={(e) => setbuyOut(e.target.value)}
                  placeholder="Buy Out Price"
                  className={styles.roundedInput}
                />

                <input
                  type="number"
                  name="startPrice"
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

                <div className="form-group mb-3">
                <select
                    className="form-select form-select-lg mb-3"
                    value={fishId}
                    onChange={(e) => setfishId(e.target.value)}
                    required
                  >
                    <option value="">Select Fish</option>

                    {koiFishList?.filter(fish => fish.id === parseInt(fishId))
                      .map((fish) => (
                        <option key={fish.id} value={fish.id}>
                        {fish.name} - Size: {fish.size}cm - Age: {fish.age} years (Current)
                        </option>
                    ))}

                    {koiFishWithStatusNew?.filter(fish => fish.id !== parseInt(fishId))
                      .map((fish) => (
                        <option key={fish.id} value={fish.id}>
                          {fish.name} - Size: {fish.size}cm - Age: {fish.age} years (Available)
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
                <div className="col-md-6 border-end">
                <div className={styles.importBox} onClick={handleImageClick}>
                {img ? (
                          <img src={URL.createObjectURL(img)} alt="upload" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                        ) : (
                          <img src="\logo\blankfish.webp" alt="upload" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                        )}
                        <input type="file" ref={inputImgRef} onChange={handleImageChange} style={{ display: 'none' }} />
                </div>

                <div className={styles.importBox} onClick={handleVideoClick}>
                {vid ? (
                    <video
                        className="img-fluid border rounded-3 shadow-lg"
                        style={{ height: '100%', width: '100%' }}
                        controls
                        muted
                        loop
                        autoPlay
                    >
                        <source src={URL.createObjectURL(vid)} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img src="\logo\blankvideo.webp" alt="upload" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                )}
                <input type="file" ref={inputVidRef} onChange={handleVideoChange} style={{ display: 'none' }} />
                </div>                  
                </div>

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
                      className={`form-select ${styles.roundedInput}`}
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
                      placeholder="Age (years)"
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default CreateRequest;
