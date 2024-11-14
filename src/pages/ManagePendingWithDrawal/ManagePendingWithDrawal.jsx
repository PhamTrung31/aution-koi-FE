import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManagePendingWithDrawal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPendingWithdrawals, paymentApproval, paymentRejected } from "../../redux/apiRequest";

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

function ManagePendingWithDrawal() {
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const withdrawalList = useSelector(
    (state) => state.transaction.pendingWithDrawals?.pendingWithDrawals
  );
  const { currentUser } = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    getPendingWithdrawals(token, dispatch);
  }, []);


  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this withdrawal request?")) {
      await paymentApproval(dispatch, token, id);
    }
  };

  const handleReject = async (id) => {

    if (window.confirm("Are you sure you want to reject this withdrawal request?")) {
      await paymentRejected(dispatch, token, id);
    }
  };


  return (
<div className="container py-3 table">
<h2 className="mb-5 text-center">Manage Pending Withdrawals</h2>
<table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
  <tr className="table-dark">
    <th>ID</th>
    <th>User</th>
    <th>Amount</th>
    <th>Action</th>
  </tr>
  {withdrawalList?.map((withdrawal) => {
    return (
      <tr key={withdrawal.id}>
        <td>{withdrawal.id}</td>
        <td>{withdrawal.user}</td>
        <td>{withdrawal.amount}</td>
        <td>
          <button
            className={styles.actionBtn + " btn-dark"}
            onClick={() => handleApprove(withdrawal.id)}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            className={styles.actionBtn + "  btn-dark"}
            onClick={() => handleReject(withdrawal.id)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </td>
      </tr>
    );
  })}
</table>
  </div>
  );
}

export default ManagePendingWithDrawal;
