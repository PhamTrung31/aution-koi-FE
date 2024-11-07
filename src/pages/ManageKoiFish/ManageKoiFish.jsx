import React, { useState, useEffect,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageKoiFish.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getKoiFishByBreederId,
  addKoiFish,
  updateKoiFish,
  cancelKoiFish,
} from "../../redux/apiRequest";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImage from "../../utils/firebase/uploadImage.jsx";


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

function KoiFish() {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [vid, setVid] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [vidUrl, setVidUrl] = useState("");


  const [selectedKoiFish, setSelectedKoiFish] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedKoiFishMedia, setSelectedKoiFishMedia] = useState(null);
  const inputImgRef = useRef(null);
  const inputVidRef = useRef(null);


  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const koiFishList = useSelector((state) => state.koifish.koifishByBreederId?.koifishByBreederId);
  const {currentUser} = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    getKoiFishByBreederId(token, currentUser.id, dispatch);
  }, []);

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
      clearForm();
      setShowAddModal(false);
    } 
  };

  const handleUpdateKoiFish = async (e) => {
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
    await updateKoiFish(dispatch, selectedKoiFish.id, koiFishData, token,currentUser.id);
      toast.success("Koi fish updated successfully!");
      setImg("");
      clearForm();
      setShowEditModal(false);
    } 
  };

  const clearForm = () => {
    setName("");
    setSex("");
    setSize("");
    setAge("");
    setDescription("");
    setImg("");
    setVid("");
  };

  const openEditModal = (koiFish) => {
    setSelectedKoiFish(koiFish);
    setName(koiFish.name);
    setSex(koiFish.sex);
    setSize(koiFish.size);
    setAge(koiFish.age);
    setDescription(koiFish.description);
    setImgUrl(koiFish.imageUrl);
    setVidUrl(koiFish.videoUrl);
    setImg("");
    setVid("");
    setShowEditModal(true);
  };

  const handleDeleteKoiFish = async (id) => {
    if (window.confirm("Are you sure you want to delete this koi fish?")) {
      await cancelKoiFish(dispatch, id, currentUser.id, token);
    }
  };

  const openMediaModal = (koiFish) => {
    setSelectedKoiFishMedia(koiFish);
    setShowMediaModal(true);
  };
  
  const handleImageClick = () => {
    inputImgRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImg(file);
    console.log(img);
  }

  const handleVideoClick = () => {
    inputVidRef.current.click();
  }

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setVid(file);
      e.target.value = null;  // Clear the input to ensure re-selection works
    }
  }
  

  return (
    <div>
      <div className="container py-3 table">
        <h2 className="mb-5 text-center">Manage Koi Fish</h2>
        <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
          <tr className="table-dark">
            <th>ID</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Size</th>
            <th>Age</th>
            <th>Description</th>
            <th>Status</th>
            <th>Media</th>
            
            <th>Action</th>
          </tr>
          {koiFishList?.map((koiFish) => {
            return (
              <tr key={koiFish.id}>
                <td>{koiFish.id}</td>
                <td>{koiFish.name}</td>
                <td>{koiFish.sex}</td>
                <td>{koiFish.size}</td>
                <td>{koiFish.age}</td>
                <td>{koiFish.description}</td>
                <td>{koiFish.status}</td>
                <td>
                  <button
                    className={`${styles.actionBtn} ${styles.viewBtn}`}
                    onClick={() => openMediaModal(koiFish)}
                  >
                    View 
                  </button>
                </td>
                <td>
                  <button
                    className={styles.actionBtn + " " + styles.editBtn}
                    onClick={() => openEditModal(koiFish)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className={styles.actionBtn + " " + styles.deleteBtn}
                    onClick={() => handleDeleteKoiFish(koiFish.id)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <button
        className={styles.buttonkoi + " btn btn-outline-dark"}
        onClick={() => setShowAddModal(true)}
      >
        Add New Koi Fish
      </button>

      <Modal show={showEditModal}>
        <div className="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowEditModal(false)}
          ></button>
          <h1 className="text-body-emphasis">Edit Koi Fish</h1>
          <div>
            <form onSubmit={handleUpdateKoiFish}>
              <div className="row">
                {/* <div className="col-md-6 border-end">
                  <div className={styles.importBox} onClick={handleImageClick}>
                  {img ? (
                          <img src={URL.createObjectURL(img)} alt="img" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                        ) : (
                          <img src={imgUrl} alt="imgUrl" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
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
                    </video>
                ) : (
                  <video
                  className="img-fluid border rounded-3 shadow-lg"
                  style={{ height: '100%', width: '100%' }}
                  controls
                  muted
                  loop
                  autoPlay
              >
                  <source src={vidUrl} type="video/mp4" />
              </video>
                )}
                <input type="file" ref={inputVidRef} onChange={handleVideoChange} style={{ display: 'none' }} />
                </div>
                </div> */}
                <div className="col-md-6 border-end">
                <div className={styles.importBox} onClick={handleImageClick}>
                {img ? (
                          <img src={URL.createObjectURL(img)} alt="upload" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                        ) : (
                          <img src={imgUrl} alt="upload" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
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
                    <video
                        className="img-fluid border rounded-3 shadow-lg"
                        style={{ height: '100%', width: '100%' }}
                        controls
                        muted
                        loop
                        autoPlay
                    >
                        <source src={vidUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>                )}
                <input type="file" ref={inputVidRef} onChange={handleVideoChange} style={{ display: 'none' }} />
                </div>                  
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Fish Name"
                      className={styles.roundedInput}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <select
                      className={`form-select ${styles.roundedInput}`}
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
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
                      onChange={(e) => setSize(e.target.value)}
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
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age (months)"
                      className={styles.roundedInput}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <textarea
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      className={styles.roundedInput}
                      rows="3"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-outline-dark mb-3">
                Update Koi Fish
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal show={showAddModal}>
      <div className="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowAddModal(false)}
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
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Fish Name"
                      className={styles.roundedInput}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <select
                      className={`form-select ${styles.roundedInput}`}
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
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
                      onChange={(e) => setSize(e.target.value)}
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
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age (months)"
                      className={styles.roundedInput}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <textarea
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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

      <Modal show={showMediaModal}>
        <div className="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowMediaModal(false)}
          ></button>
          <h1 className="text-body-emphasis text-start mb-3">Koi Fish Media</h1>
          {selectedKoiFishMedia && (
            <div className="row g-2">
              <div className="col-md-6">
                <img 
                  src={selectedKoiFishMedia.imageUrl}
                  alt={selectedKoiFishMedia.name}
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                />
              </div>
              <div className="col-md-6">
                {selectedKoiFishMedia.videoUrl ? (
                  <video 
                    controls
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                  >
                    <source src={selectedKoiFishMedia.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p>No video available</p>
                )}
              </div>
            </div>
          )}
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

export default KoiFish;
