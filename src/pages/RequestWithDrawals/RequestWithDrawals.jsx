import React, { useState, useEffect } from "react";
import styles from "./RequestWithDrawals.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getallPaymentOfBreeder, requestWithdrawals } from "../../redux/apiRequest";

const Modal = ({ show, children }) => {
  if (!show) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalsContent}>{children}</div>
    </div>
  );
};

function RequestWithDrawals() {
  const [amount, setAmount] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const { currentUser } = useSelector((state) => state.auth.profile);
  const withdrawalsList = useSelector((state) => state.transaction.getallPaymentOfBreeder?.getallPaymentOfBreeder);

  useEffect(() => {
      getallPaymentOfBreeder(token, currentUser.id, dispatch);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await requestWithdrawals(dispatch, token, currentUser.id, amount);
      toast.success("Withdrawal request submitted successfully!");
      setShowAddModal(false);
    } catch (error) {
      toast.error("Failed to submit withdrawal request");
    }
  };

  return (
    <div className="container py-3 table">
      <h2 className="text-center">Manage Request</h2>
      <button
        className={styles.buttonkoi + " btn btn-dark mb-4"}
        onClick={() => setShowAddModal(true)}
      >
        Create
      </button>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
        <tr className="table-dark">
          <th>ID</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {withdrawalsList?.map((withdrawals) => (
          <tr key={withdrawals.id}>
            <td>{withdrawals.id}</td>
            <td>{withdrawals.amount}</td>
            <td>{withdrawals.paymentStatus}</td>
          </tr>
        ))}
      </table>



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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className={styles.roundedInput}
                required
              />

              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default RequestWithDrawals;
