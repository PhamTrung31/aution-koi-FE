import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../../redux/apiRequest";
import styles from "./ManageTransaction.module.css";

function ManageTransaction() {
  const token = useSelector(
    (state) => state.auth.login?.currentToken.token
  );
  const transactionList = useSelector((state) => state.transaction.getallTransaction?.allTransaction);
  const dispatch = useDispatch();

  useEffect(() => {
    getTransaction(token, dispatch);
  }, []);

  return (
    <div>
      <div className="container py-3 table">
      <h2 className="mb-5 text-center">Your Auction Request</h2>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4 overflow-auto">
        <tr className="table-dark ">
          <th>ID</th>
          <th>Auction</th>
          <th>User</th>
          <th>Payment ID</th>
          <th>Wallet ID</th>
          <th>Amount</th>
          <th>Transaction Fee</th>
          <th>Transaction Date</th>
          <th>Transaction Type</th>
        </tr>

        {transactionList?.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.auction}</td>
              <td>{transaction.user}</td>
              <td>{transaction.paymentId}</td>
              <td>{transaction.walletId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionFee}</td>
              <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
              <td>{transaction.transactionType}</td>
            </tr>
          );
        })}
      </table>
      </div>
    </div>
  );
}

export default ManageTransaction;
