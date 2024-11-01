import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPen, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import styles from "./Member.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  deleteUser,
  updateUser,
  addUser,
  banUser,
  unbanUser
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
function User() {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isactive, setIsActive] = useState("");
  const [isBreeder, setIsBreeder] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [avatarurl, setAvatarUrl] = useState("");

  const token = useSelector(
    (state) => state.auth.login?.currentToken.result.token
  );
  const userList = useSelector((state) => state.user.users?.allUsers);
  const dispatch = useDispatch();
  console.log(token);
  useEffect(() => {
    getAllUser(token, dispatch);
    console.log(userList);
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
      fullname: fullname,
      phone: phone,
      address: address,
      avatar_url: avatarurl,
      isBreeder: isBreeder,
    };
    await addUser(dispatch, userData, token);
    setUsername("");
    setPassword("");
    setFullname("");
    setPhone("");
    setAddress("");
    setAvatarUrl("");
    setIsBreeder(false);
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const userData = {
      userId: id,
      username: username,
      password: password,
      fullname: fullname,
      phone: phone,
      address: address,
      avatar_url: avatarurl,
      isActive: isactive,
      isBreeder: isBreeder,
    };
    await updateUser(dispatch, selectedUser.id, userData, token);
    setId("");
    setUsername("");
    setPassword("");
    setFullname("");
    setPhone("");
    setAddress("");
    setShowEditModal(false);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setId(user.id);
    setUsername(user.username);
    setPassword(user.password);
    setFullname(user.fullname);
    setPhone(user.phone);
    setAddress(user.address);
    setAvatarUrl(user.avatar_url);
    setIsActive(user.isActive);
    setIsBreeder(user.isBreeder);
    setShowEditModal(true);
  };
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(dispatch, id, token);
    }
  };
  const handleBanUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await banUser(dispatch, id, token);
    }
  };
  const handleUnbanUser = async (id) => {
    if (window.confirm("Are you sure you want to unban this user?")) {
      await unbanUser(dispatch, id, token);
    }
  }; 
  

  return (
    <div>
      <div className="container py-3 table">
        <h2 className="mb-5 text-center">Manage User </h2>
        <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
          <tr className="table-dark">
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {userList?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={styles.actionBtn + " " + styles.editBtn}
                    onClick={() => openEditModal(user)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className={styles.actionBtn + " " + styles.deleteBtn}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                  
                  <button
                    className={styles.actionBtn + " " + styles.deleteBtn}
                    onClick={() => user.isActive ? handleBanUser(user.id) : handleUnbanUser(user.id) }
                  >
                    {user.isActive ? (
                      <FontAwesomeIcon icon={faLockOpen} />
                    ) : (
                      <FontAwesomeIcon icon={faLock} />
                    )}
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
        Create New Staff
      </button>

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
            <form onSubmit={handleUpdateUser}>
              <input
                type="text"
                name="userId"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="UserName"
                className={styles.roundedInput}
              />
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-auto d-flex align-items-center">
                    <h5 className="mb-0 me-2">Role:</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="breederCheckbox"
                        checked={isBreeder}
                        onChange={(e) => setIsBreeder(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="breederCheckbox"
                      >
                        {isBreeder ? "Breeder" : "Member"}
                      </label>
                    </div>
                  </div>

                  <div className="col-auto d-flex align-items-center ms-5">
                    <h5 className="mb-0 me-2">Active:</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="activeCheckbox"
                        checked={isactive}
                        onChange={(e) => setIsActive(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="activeCheckbox"
                      >
                        {isactive ? "Active" : "Inactive"}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Fullname"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="avatar_url"
                value={avatarurl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Avatar URL"
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
        <div class="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowAddModal(false)}
          ></button>
          <h1 class="text-body-emphasis">Add New User</h1>
          <div>
            <form onSubmit={handleAddUser}>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="UserName"
                className={styles.roundedInput}
              />
              <div class="d-flex align-items-center">
                <h5 class="mb-0 me-2">Role:</h5>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="breederCheckbox"
                    checked={isBreeder}
                    onChange={(e) => setIsBreeder(e.target.checked)}
                  />
                  <label class="form-check-label" for="breederCheckbox">
                    {isBreeder ? "Breeder" : "Member"}
                  </label>
                </div>
              </div>

              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Fullname"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className={styles.roundedInput}
              />

              <input
                type="text"
                name="avatar_url"
                value={avatarurl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Avatar URL"
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

export default User;
