import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { getAllStaff } from "../../redux/apiRequest";
import styles from "./ManageStaff.module.css";

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
  const dispatch = useDispatch();
  const staffList = useSelector((state) => state.staff.staffs.allStaffs);
  console.log(staffList);
  useEffect(() => {
    getAllStaff(dispatch);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const staffData = {
      name: name,
      phone: "",
      address: "",
    };
  };

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEditStaff = (staff) => {
    setEditForm(staff);
    setShowEditModal(true);
  };

  const handleSaveChanges = () => {
    const updatedStaffList = staffList.map((member) =>
      member.id === editForm.id ? editForm : member
    );
    setShowEditModal(false);
  };

  const [newStaff, setNewStaff] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
  });

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddStaff = () => {
    setNewStaff({
      name: "",
      phone: "",
      address: "",
    });
    setShowAddModal(false);
  };

  const handleDeleteStaff = (id) => {
    const updatedStaffList = staffList.filter((member) => member.id !== id);
    // Dispatch an action to remove the staff from the Redux state
  };

  return (
    <div className="container py-3 table">
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList && Object.keys(staffList).length > 0 ? (
              Object.values(staffList).map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.id}</td>
                  <td>{staff.username}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.address}</td>
                  <td>
                    <button
                      className={styles.actionBtn + " " + styles.editBtn}
                      onClick={() => handleEditStaff(staff)}
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
              ))
            ) : (
              <tr>
                <td colSpan="5">No staff available</td>
              </tr>
            )}
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
        <h2>Add New Staff</h2>
        <input
          type="text"
          name="name"
          value={newStaff.name}
          onChange={handleAddInputChange}
          placeholder="Name"
          className={styles.roundedInput}
        />
        <input
          type="text"
          name="phone"
          value={newStaff.phone}
          onChange={handleAddInputChange}
          placeholder="Phone"
          className={styles.roundedInput}
        />
        <input
          type="text"
          name="address"
          value={newStaff.address}
          onChange={handleAddInputChange}
          placeholder="Address"
          className={styles.roundedInput}
        />
        <button className="btn btn-danger" onClick={handleAddStaff}>
          Add Staff
        </button>
      </Modal>

      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <h2>Edit Staff</h2>
        <input
          type="text"
          name="name"
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          placeholder="Name"
          className={styles.roundedInput}
        />
        <input
          type="text"
          name="phone"
          value={editForm.phone}
          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
          placeholder="Phone"
          className={styles.roundedInput}
        />
        <input
          className={styles.roundedInput}
          type="text"
          name="address"
          value={editForm.address}
          onChange={(e) =>
            setEditForm({ ...editForm, address: e.target.value })
          }
          placeholder="Address"
        />
        <button className="btn btn-danger" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </Modal>
    </div>
  );
}

export default ManageStaff;
