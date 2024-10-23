import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./Member.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, deleteUser, updateUser } from "../../redux/apiRequest";

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
function User() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      phone: phone,
      fullname: fullname,
      address: address,
    };
    await updateUser(dispatch, selectedUser.id, userData, token);
    setUsername("");
    setPhone("");
    setFullname("");
    setAddress("");
    setShowEditModal(false);
  };
  const openEditModal = (user) => {
    setSelectedUser(user);
    setPhone(user.phone);
    setFullname(user.fullname);
    setAddress(user.address);
    setShowEditModal(true);
  };
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(dispatch, id, token);
    }
  };
  return (
    <div>
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
            {userList?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.userCreatedDate}</td>
                  <td>
                    <button
                      className={styles.actionBtn + " " + styles.editBtn}
                      onClick={() => openEditModal(staff)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className={styles.actionBtn + " " + styles.deleteBtn}
                      onClick={() => handleDeleteUser(staff.id)}
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

      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <div>
          <form onSubmit={handleUpdateUser}>
            <h2>Edit Staff</h2>

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

export default User;
