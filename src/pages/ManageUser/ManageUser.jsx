import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors } from "../../redux/userSlice";

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
    (state) => state.auth.login?.currentToken.token
  );
  const addUserError = useSelector((state) => state.user.adduser.error);
  const updateUserError = useSelector((state) => state.user.updateusers.error);
  const userList = useSelector((state) => state.user.users?.allUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUser(token, dispatch);
    
    return () => {
      dispatch(clearErrors());
    };
  }, []);
  useEffect(() => {
    if (addUserError != null) {
      toast.error(addUserError.message);
      dispatch(clearErrors());
    } else if (updateUserError != null) {
      toast.error(updateUserError.message);
      dispatch(clearErrors());
    }
  }, [addUserError, updateUserError]);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setFullname("");
    setPhone("");
    setAddress("");
    setAvatarUrl("");
    setIsBreeder(false);
    setIsActive(false);
    setSelectedUser(null);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
      fullname: fullname,
      phone: phone,
      address: address,
      isBreeder: isBreeder,
    };
    console.log(userData);
    await addUser(dispatch, userData, token);
    setShowAddModal(false);
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const userData = {
      userId: selectedUser.id,
      username: username,
      password: password,
      fullname: fullname,
      phone: phone,
      address: address,
      isActive: isactive,
      isBreeder: isBreeder,
    };
    await updateUser(dispatch, selectedUser.id, userData, token);
    setShowEditModal(false);
  };

  const openEditModal = (user) => {
    resetForm();
    setSelectedUser(user);
    setUsername(user.username);
    setPassword(user.password);
    setFullname(user.fullname);
    setPhone(user.phone);
    setAddress(user.address);
    setIsActive(user.isActive);
    setIsBreeder(user.isBreeder || false);
    setShowEditModal(true);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(dispatch, id, token);
    }
  };
  const handleBanUser = async (id) => {
    if (window.confirm("Are you sure you want to ban this user?")) {
      await banUser(dispatch, id, token);
    }
  };
  const handleUnbanUser = async (id) => {
    if (window.confirm("Are you sure you want to unban this user?")) {
      await unbanUser(dispatch, id, token);
    }
  }; 
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = userList?.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container py-3 table">
        <h2 className="text-center">Manage User </h2>

        <input
            type="text"
            className="form-control w-25"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={styles.buttonkoi + " btn btn-dark "}
            onClick={openAddModal}
          >
            Create New User
          </button>

        

        <table className="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
          <tr className="table-dark">
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {filteredUsers?.map((user) => {
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
      

      <Modal show={showEditModal}>
        <div class="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => {
              setShowEditModal(false);
              resetForm();
            }}
          ></button>
          <h1 class="text-body-emphasis">Edit User</h1>
          <div>
            <form onSubmit={handleUpdateUser}>
              <div>
                <label htmlFor="edit-username" className="form-label">Username:</label>
                <input
                  type="text"
                  id="edit-username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="UserName"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <div className="container">
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

              <div>
                <label htmlFor="edit-password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="edit-password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-fullname" className="form-label">Full Name:</label>
                <input
                  type="text"
                  id="edit-fullname"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Fullname"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-phone" className="form-label">Phone Number:</label>
                <input
                  type="text"
                  id="edit-phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-address" className="form-label">Address:</label>
                <input
                  type="text"
                  id="edit-address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark mx-auto d-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal show={showAddModal}>
        <div class="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => {
              setShowAddModal(false);
              resetForm();
            }}
          ></button>
          <h1 class="text-body-emphasis">Add New User</h1>
          <div>
            <form onSubmit={handleAddUser}>
              <div>
                <label htmlFor="add-username" className="form-label">Username:</label>
                <input
                  type="text"
                  id="add-username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="UserName"
                  className={styles.roundedInput}
                  required
                />
              </div>

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

              <div>
                <label htmlFor="add-password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="add-password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="add-fullname" className="form-label">Full Name:</label>
                <input
                  type="text"
                  id="add-fullname"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Fullname"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="add-phone" className="form-label">Phone Number:</label>
                <input
                  type="text"
                  id="add-phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="add-address" className="form-label">Address:</label>
                <input
                  type="text"
                  id="add-address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className={styles.roundedInput}
                  required
                />
              </div>

              <button type="submit" className="btn btn-outline-dark mx-auto d-block">
                Submit
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

export default User;
