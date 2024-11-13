import React, { useEffect } from "react";
import styles from "./ManageTransaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction,getUserByUserId } from "../../redux/apiRequest";
import { useState } from "react";
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
function ManageTransaction() {
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const [showModal, setShowModal] = useState(false);
  const transactionList = useSelector(
    (state) => state.transaction.getallTransaction?.allTransaction
  );
  const selectedUser = useSelector(
    (state) => state.user.getUserByUserId?.user
  );
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateFocused, setStartDateFocused] = useState(false);

  useEffect(() => {
    getTransaction(token, dispatch);
  }, []);
  console.log(selectedUser);
  const handleOpenModal = (userId) => {
    getUserByUserId(token, userId, dispatch);
    setShowModal(true);
  };

  const filteredTransactions = transactionList?.filter(transaction => {
    const matchesType = !searchType || transaction.transactionType.toLowerCase().includes(searchType.toLowerCase());
    
    const transactionDate = new Date(transaction.transactionDate);
    const matchesDateRange = (!startDate || transactionDate >= new Date(startDate)) && 
                            (!endDate || transactionDate <= new Date(endDate + 'T23:59:59'));
    
    return matchesType && matchesDateRange;
  });

  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Manage Transactions</h2>
      <div className="d-flex gap-3 mb-3">
        <select
          className="form-select w-25"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="transfer">Transfer</option>
          <option value="bid">Bid</option>
          <option value="top_up">Top Up</option>
          <option value="withdraw">Withdraw</option>
          <option value="deposit">Deposit</option>
          <option value="back_deposit">Back Deposit</option>
          <option value="back_money_bid">Back Money Bid</option>
        </select>
        <input
          type={startDateFocused ? "date" : "text"}
          className="form-control w-25"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
          onFocus={() => setStartDateFocused(true)}
          onBlur={() => setStartDateFocused(false)}
        />
        <input
          type={startDateFocused ? "date" : "text"}
          className="form-control w-25"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
          onFocus={() => setStartDateFocused(true)}
          onBlur={() => setStartDateFocused(false)}
        />
      </div>
      <table className="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
        <tr className="table-dark">
          <th>ID</th>
          <th>User</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Fee</th>
          <th>Date</th>
        </tr>
        {filteredTransactions?.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>
              <button className="btn" onClick={() => handleOpenModal(transaction.user)}>View User</button>
              </td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.transactionFee}</td>
              <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
            </tr>
          );
        })}
      </table>
      <Modal show={showModal}>
        <div class="position-relative p-2 text-start text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowModal(false)}
          ></button>
          <h1 class="text-body-emphasis">User Profile</h1>
          <div>
          <label className="form-label"><strong>Fullname:</strong></label>
              <input
                type="text"
                value={selectedUser?.fullname}
                className={styles.roundedInput}
                readOnly
              />
              <label className="form-label"><strong>Phone:</strong></label>
              <input
                type="text"
                value={selectedUser?.phone}
                className={styles.roundedInput}
                readOnly
              />
              <label className="form-label"><strong>Role:</strong></label>
              <input
                type="text"
                value={selectedUser?.role}
                className={styles.roundedInput}
                readOnly
              />
              <label className="form-label"><strong>Address:</strong></label>
              <input
                type="text"
                value={selectedUser?.address}
                className={styles.roundedInput}
                readOnly
              />

          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ManageTransaction;
