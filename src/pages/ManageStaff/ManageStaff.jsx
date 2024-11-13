import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faXmark,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ManageStaff.module.css";
import {
  getAllStaffs,
  addStaff,
  deleteStaff,
  updateStaff,
  banStaff,
  unbanStaff
} from "../../redux/apiRequest";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalsContent}>{children}</div>
    </div>
  );
};

function ManageStaff() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const token = useSelector(
    (state) => state.auth.login?.currentToken.token
  );
  const staffList = useSelector((state) => state.staff.staffs?.allStaffs);
  const dispatch = useDispatch();
  console.log(token);

  useEffect(() => {
    getAllStaffs(token, dispatch);
    console.log(staffList);
  }, []);
  const handleBanStaff = async (id) => {
    if (window.confirm("Are you sure you want to ban this staff?")) {
      await banStaff(dispatch, id, token);
    }
  };
  const handleUnbanStaff = async (id) => {
    if (window.confirm("Are you sure you want to unban this staff?")) {
      await unbanStaff(dispatch, id, token);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    const staffData = {
      username: username,
      password: password,
      phone: phone,
      fullname: fullname,
      address: address,
    };
    await addStaff(dispatch, staffData, token);

    setUsername("");
    setPassword("");
    setPhone("");
    setFullname("");
    setAddress("");
    setShowAddModal(false);
  };
  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    const staffData = {
      username: username,
      password: password,
      phone: phone,
      fullname: fullname,
      address: address,
    };
    await updateStaff(dispatch, selectedStaff.id, staffData, token);
    setUsername("");
    setPassword("");
    setPhone("");
    setFullname("");
    setAddress("");
    setShowEditModal(false);
  };
  const openEditModal = (staff) => {
    setSelectedStaff(staff);
    setUsername(staff.username);
    setPassword(staff.password);
    setPhone(staff.phone);
    setFullname(staff.fullname);
    setAddress(staff.address);
    setShowEditModal(true);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteStaff = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await deleteStaff(dispatch, id, token);
    }
  };

  return (
    <div>
      <div className="container py-3 table">
        <h2 className="mb-5 text-center">Manage Staff </h2>
        <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
          <tr className="table-dark">
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
          {staffList?.map((staff) => {
            return (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.fullname}</td>
                <td>{staff.phone}</td>
                <td>{staff.address}</td>
                <td>{new Date(staff.userCreatedDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className={styles.actionBtn + " " + styles.editBtn}
                    onClick={() => openEditModal(staff)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className={styles.actionBtn + " " + styles.deleteBtn}
                    onClick={() => handleDeleteStaff(staff.id)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                  <button
                    className={styles.actionBtn + " " + styles.deleteBtn}
                    onClick={() => (staff.isActive ? handleBanStaff(staff.id) : handleUnbanStaff(staff.id))}
                  >
                    {staff.isActive ? (
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

      <Modal show={showAddModal}>
        <div class="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowAddModal(false)}
          ></button>
          <h1 class="text-body-emphasis">Add New Staff</h1>
          <div>
            <form onSubmit={handleAddStaff}>
              <input
                type="text"
                name="name"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                className={styles.roundedInput}
              />
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={styles.roundedInput}
              />
              <input
                type="text"
                name="fullname"
                onChange={(e) => setFullname(e.target.value)}
                placeholder="fullname"
                className={styles.roundedInput}
              />
              <input
                type="text"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className={styles.roundedInput}
              />
              <input
                type="text"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
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
          <h1 class="text-body-emphasis">Edit Staff</h1>
          <div className={styles.formContainer}>
            <form onSubmit={handleUpdateStaff}>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="UserName"
                className={styles.roundedInput}
              />
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
                placeholder="fullname"
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

export default ManageStaff;
