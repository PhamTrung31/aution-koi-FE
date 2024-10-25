import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateRequest.module.css";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAuctionRequestByBreederID,
  addAuctionRequest,
  deleteAuctionRequest,
  updateAuctionRequest,
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
  const [userId, setuserId] = useState("");
  const [fishId, setfishId] = useState("");
  const [buyOut, setbuyOut] = useState("");
  const [startPrice, setstartPrice] = useState("");
  const [methodType, setmethodType] = useState("");
  const [start_time, setstart_time] = useState("");
  const [end_time, setend_time] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const token = useSelector(
    (state) => state.auth.login?.currentToken.result.token
  );
  const breeder = useSelector((state) => state.auth.profile?.currentUser);
  const aucionRequestList = useSelector(
    (state) => state.auctionrequest.auctionrequests?.auctionrequests
  );
  const dispatch = useDispatch();
  console.log(token);
  useEffect(() => {
    getAllAuctionRequestByBreederID(token, breeder.id, dispatch);
    console.log(aucionRequestList);
  }, []);

  // const handleAddUser = async (e) => {
  //   e.preventDefault();
  //   setUsername("");
  //   setPassword("");
  //   setFullname("");
  //   setPhone("");
  //   setAddress("");
  //   setAvatarUrl("");
  //   setIsBreeder(false);
  //   setShowAddModal(false);
  //   const userData = {
  //     username: username,
  //     password: password,
  //     fullname: fullname,
  //     phone: phone,
  //     address: address,
  //     avatar_url: avatarurl,
  //     isBreeder: isBreeder,
  //   };
  //   await addUser(dispatch, userData, token);
  // };
  // const handleUpdateUser = async (e) => {
  //   e.preventDefault();
  //   setId("");
  //   setUsername("");
  //   setPassword("");
  //   setFullname("");
  //   setPhone("");
  //   setAddress("");
  //   setIsActive("");
  //   setIsBreeder(false);
  //   const userData = {
  //     userId: id,
  //     username: username,
  //     password: password,
  //     fullname: fullname,
  //     phone: phone,
  //     address: address,
  //     avatar_url: avatarurl,
  //     isActive: isactive,
  //     isBreeder: isBreeder,
  //   };
  //   await updateUser(dispatch, selectedUser.id, userData, token);
  //   setShowEditModal(false);
  // };

  // const openEditModal = (user) => {
  //   setSelectedUser(user);
  //   setId(user.id);
  //   setUsername(user.username);
  //   setPassword(user.password);
  //   setFullname(user.fullname);
  //   setPhone(user.phone);
  //   setAddress(user.address);
  //   setAvatarUrl(user.avatar_url);
  //   setIsActive(user.isActive);
  //   setIsBreeder(user.isBreeder);
  //   setShowEditModal(true);
  // };
  // const handleDeleteUser = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     await deleteUser(dispatch, id, token);
  //   }
  // };

  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Your Auction Request</h2>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4 overflow-auto">
        <tr className="table-dark ">
          <th>ID</th>
          <th>Fish Name</th>
          <th>Method</th>
          <th>Start Price</th>
          <th>Buy Out Price</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Action</th>
        </tr>

        {aucionRequestList?.map((request) => {
          return (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.fishName}</td>
              <td>{request.method}</td>
              <td>{request.startPrice}</td>
              <td>{request.buyOutPrice}</td>
              <td>{request.startTime}</td>
              <td>{request.endTime}</td>
              <td>
                <button
                  className={styles.actionBtn + " " + styles.editBtn}
                  onClick={() => handleEditRequest(request)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className={styles.actionBtn + " " + styles.deleteBtn}
                  onClick={() => handleDeleteRequest(request.id)}
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
      {/* <Modal show={showAddModal}>
        <div class="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowAddModal(false)}
          ></button>
          <h1 class="text-body-emphasis">Create New Request</h1>
          <div className={styles.formContainer}>
            <div className={styles.leftColumn}>
              <div className={styles.importBox}>
                <label htmlFor="importImage">Import Image</label>
                <input type="file" id="importImage" accept="image/*" />
              </div>
              <div className={styles.importBox}>
                <label htmlFor="importVideo">Import Video</label>
                <input type="file" id="importVideo" accept="video/*" />
              </div>
            </div>

            <div className={styles.rightColumn}>
              <input
                type="text"
                name="fishName"
                value={newRequest.fishName}
                onChange={handleAddInputChange}
                placeholder="Fish Name"
                className={styles.roundedInput}
              />

              <select
                name="method"
                value={newRequest.method}
                onChange={handleAddInputChange}
                className={styles.roundedInput}
              >
                <option value="" disabled>
                  Select Method
                </option>
                <option value="Auction">Auction</option>
                <option value="Buy Now">Buy Now</option>
              </select>

              <input
                type="text"
                name="startPrice"
                value={newRequest.startPrice}
                onChange={handleAddInputChange}
                placeholder="Start Price"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="buyOutPrice"
                value={newRequest.buyOutPrice}
                onChange={handleAddInputChange}
                placeholder="Buy Out Price"
                className={styles.roundedInput}
              />

              <input
                type="datetime-local"
                name="startTime"
                value={newRequest.startTime}
                onChange={handleAddInputChange}
                className={styles.roundedInput}
              />

              <input
                type="datetime-local"
                name="endTime"
                value={newRequest.endTime}
                onChange={handleAddInputChange}
                className={styles.roundedInput}
              />

              <button className=" btn btn-dark" onClick={handleAddRequest}>
                Create Request
              </button>
            </div>
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
          <h1 class="text-body-emphasis">Edit Request</h1>
          <div className={styles.formContainer}>
            <div className={styles.leftColumn}>
              <div className={styles.importBox}>
                <img
                  src="https://www.acaquarium.com/wp-content/uploads/2023/02/ammonia-poisoning-in-goldfish.jpg"
                  class="img-thumbnail"
                  alt="..."
                />
              </div>
              <div className={styles.importBox}>
                <label htmlFor="importVideo">Import Video</label>
                <input type="file" id="importVideo" accept="video/*" />
              </div>
            </div>

            <div className={styles.rightColumn}>
              <input
                type="text"
                name="id"
                value={editForm.id}
                onChange={(e) =>
                  setEditForm({ ...editForm, id: e.target.value })
                }
                placeholder="ID"
                className={styles.roundedInput}
              />
              <input
                type="text"
                name="fishname"
                value={editForm.fishName}
                onChange={(e) =>
                  setEditForm({ ...editForm, fishName: e.target.value })
                }
                placeholder="Fish Name"
                className={styles.roundedInput}
              />
              <input
                type="text"
                name="method"
                value={editForm.method}
                onChange={(e) =>
                  setEditForm({ ...editForm, method: e.target.value })
                }
                placeholder="Method"
                className={styles.roundedInput}
              />
              <input
                className={styles.roundedInput}
                type="text"
                name="startPrice"
                value={editForm.startPrice}
                onChange={(e) =>
                  setEditForm({ ...editForm, startPrice: e.target.value })
                }
                placeholder="Start Price"
              />
              <input
                className={styles.roundedInput}
                type="text"
                name="buyOutPrice"
                value={editForm.buyOutPrice}
                onChange={(e) =>
                  setEditForm({ ...editForm, buyOutPrice: e.target.value })
                }
                placeholder="Buy Out Price"
              />
              <input
                className={styles.roundedInput}
                type="datetime-local"
                name="startTime"
                value={editForm.startTime}
                onChange={(e) =>
                  setEditForm({ ...editForm, startTime: e.target.value })
                }
                placeholder="Start Time"
              />
              <input
                className={styles.roundedInput}
                type="datetime-local"
                name="endTime"
                value={editForm.endTime}
                onChange={(e) =>
                  setEditForm({ ...editForm, endTime: e.target.value })
                }
                placeholder="End Time"
              />

              <button className="btn btn-dark" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
        <h2>Edit Request</h2>
        <input
          type="text"
          name="id"
          value={editForm.id}
          onChange={(e) => setEditForm({ ...editForm, id: e.target.value })}
          placeholder="ID"
          className={styles.roundedInput}
        />
        <input
          type="text"
          name="fishname"
          value={editForm.fishName}
          onChange={(e) =>
            setEditForm({ ...editForm, fishName: e.target.value })
          }
          placeholder="Fish Name"
          className={styles.roundedInput}
        />
        <input
          type="text"
          name="method"
          value={editForm.method}
          onChange={(e) => setEditForm({ ...editForm, method: e.target.value })}
          placeholder="Method"
          className={styles.roundedInput}
        />
        <input
          className={styles.roundedInput}
          type="text"
          name="startPrice"
          value={editForm.startPrice}
          onChange={(e) =>
            setEditForm({ ...editForm, startPrice: e.target.value })
          }
          placeholder="Start Price"
        />
        <input
          className={styles.roundedInput}
          type="text"
          name="buyOutPrice"
          value={editForm.buyOutPrice}
          onChange={(e) =>
            setEditForm({ ...editForm, buyOutPrice: e.target.value })
          }
          placeholder="Buy Out Price"
        />
        <input
          className={styles.roundedInput}
          type="datetime-local"
          name="startTime"
          value={editForm.startTime}
          onChange={(e) =>
            setEditForm({ ...editForm, startTime: e.target.value })
          }
          placeholder="Start Time"
        />
        <input
          className={styles.roundedInput}
          type="datetime-local"
          name="endTime"
          value={editForm.endTime}
          onChange={(e) =>
            setEditForm({ ...editForm, endTime: e.target.value })
          }
          placeholder="End Time"
        />
        <button className="btn btn-danger" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </Modal> */}
    </div>
  );
}

export default CreateRequest;
