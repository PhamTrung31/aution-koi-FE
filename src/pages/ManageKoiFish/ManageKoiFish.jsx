import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageKoiFish.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getKoiFishByBreederId,

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

function KoiFish() {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [selectedKoiFish, setSelectedKoiFish] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const koiFishList = useSelector((state) => state.koiFish.koifishByBreederId?.koifishByBreederId);
  const {currentUser} = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  useEffect(() => {
    getKoiFishByBreederId(token, currentUser.id, dispatch);
  }, []);

  const handleAddKoiFish = async (e) => {
    e.preventDefault();
    const koiFishData = {
      name: name,
      sex: sex,
      size: size,
      age: age,
      description: description,
      image_url: imageUrl,
      video_url: videoUrl,
    };
    await addKoiFish(dispatch, koiFishData, token);
    clearForm();
    setShowAddModal(false);
  };

  const handleUpdateKoiFish = async (e) => {
    e.preventDefault();
    const koiFishData = {
      name: name,
      sex: sex,
      size: size,
      age: age,
      description: description,
      image_url: imageUrl,
      video_url: videoUrl,
    };
    await updateKoiFish(dispatch, selectedKoiFish.id, koiFishData, token);
    clearForm();
    setShowEditModal(false);
  };

  const clearForm = () => {
    setName("");
    setSex("");
    setSize("");
    setAge("");
    setDescription("");
    setImageUrl("");
    setVideoUrl("");
  };

  const openEditModal = (koiFish) => {
    setSelectedKoiFish(koiFish);
    setName(koiFish.name);
    setSex(koiFish.sex);
    setSize(koiFish.size);
    setAge(koiFish.age);
    setDescription(koiFish.description);
    setImageUrl(koiFish.image_url);
    setVideoUrl(koiFish.video_url);
    setShowEditModal(true);
  };

  const handleDeleteKoiFish = async (id) => {
    if (window.confirm("Are you sure you want to delete this koi fish?")) {
      await deleteKoiFish(dispatch, id, token);
    }
  };

  return (
    <div>
      <div className="container py-3 table">
        <h2 className="mb-5 text-center">Manage Koi Fish</h2>
        <table className="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
          <thead>
            <tr className="table-dark">
              <th>ID</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Size</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {koiFishList?.map((koiFish) => (
              <tr key={koiFish.id}>
                <td>{koiFish.id}</td>
                <td>{koiFish.name}</td>
                <td>{koiFish.sex}</td>
                <td>{koiFish.size}</td>
                <td>{koiFish.age}</td>
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
            ))}
          </tbody>
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
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                placeholder="Sex"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Size"
                className={styles.roundedInput}
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Video URL"
                className={styles.roundedInput}
              />
              <button type="submit" className="btn btn-dark">
                Submit
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
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                placeholder="Sex"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Size"
                className={styles.roundedInput}
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className={styles.roundedInput}
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className={styles.roundedInput}
              />
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Video URL"
                className={styles.roundedInput}
              />
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

export default KoiFish;
