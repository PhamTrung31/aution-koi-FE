import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ManageStaff.module.css";
import {
  getAllStaffs,
  addStaff,
  deleteStaff,
  updateStaff,
} from "../../redux/apiRequest";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalsContent}>
        <button className={styles.closeModal} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
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
    (state) => state.auth.login?.currentToken.result.token
  );
  const staffList = useSelector((state) => state.staff.staffs?.allStaffs);
  const dispatch = useDispatch();
  console.log(token);

  useEffect(() => {
    getAllStaffs(token, dispatch);
    console.log(staffList);
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();
    const staffData = {
      username: username,
      phone: phone,
      password: password,
      fullname: fullname,
      address: address,
    };
    await addStaff(dispatch, staffData, token);

    setUsername("");
    setPhone("");
    setPassword("");
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
    <div className="container py-3 table table-primary">
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Hire Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList?.map((staff) => {
              return (
                <tr key={staff.id}>
                  <td>{staff.id}</td>
                  <td>{staff.fullname}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.address}</td>
                  <td>{staff.userCreatedDate}</td>
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        className={styles.buttonkoi + " btn btn-danger"}
        onClick={() => setShowAddModal(true)}
      >
        Add New Staff
      </button>

      <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
        <div>
          <form onSubmit={handleAddStaff}>
            <h2>Add New Staff</h2>
            <input
              type="text"
              name="name"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
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
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
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
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className={styles.roundedInput}
            />
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </form>
        </div>
      </Modal>

      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <div>
          <form onSubmit={handleUpdateStaff}>
            <h2>Edit Staff</h2>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="UserName"
              className={styles.roundedInput}
            />
            <input
              type="text"
              name="password"
              value={fullname}
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
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ManageStaff;
