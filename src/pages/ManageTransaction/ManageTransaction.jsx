import React, { useEffect } from "react";
import styles from "./ManageTransaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../../redux/apiRequest";

function ManageTransaction() {
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const transactionList = useSelector(
    (state) => state.transaction.getallTransaction?.allTransaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getTransaction(token, dispatch);
  }, []);

  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Manage Transactions</h2>
      <table className="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
        <tr className="table-dark">
          <th>ID</th>
          <th>User</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {transactionList?.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.user}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ManageTransaction;
