import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageDelivery.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDelivery,
  updateDeliveryStatus,
} from "../../redux/apiRequest";

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

function ManageDelivery() {
  const [status, setStatus] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const deliveryList = useSelector((state) => state.delivery.getallDelivery?.allDelivery);

  const dispatch = useDispatch();

  useEffect(() => {
    getDelivery(token, dispatch);
  }, []);

  const handleUpdateDelivery = async (e) => {
    e.preventDefault();
    const deliveryData = {
      deliveryId: selectedDelivery.id,
      status: status,
    };
    await updateDeliveryStatus(dispatch, deliveryData, token);
    setShowEditModal(false);
  };

  const openEditModal = (delivery) => {
    setSelectedDelivery(delivery);
    setStatus(delivery.status);
    setShowEditModal(true);
  };

  return (
    <div className="container py-3 table">
        <h2 className="mb-5 text-center">Manage Koi Fish</h2>
        <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
          <tr className="table-dark">
            <th>ID</th>
            <th>Auction ID</th>
            <th>From Address</th>
            <th>To Address</th>
            <th>Delivery Status</th>
            <th>Delivery Date</th>
            <th>Delivery Fee</th>
            <th>Action</th>
          </tr>
          {deliveryList?.map((delivery) => {
            return (
              <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.auctionId}</td>
                <td>{delivery.fromAddress}</td>
                <td>{delivery.toAddress}</td>
                <td>{delivery.deliveryStatus}</td>
                <td>{delivery.deliveryDate}</td>
                <td>{delivery.deliveryFee}</td>
                <td>
                  <button
                    className={styles.actionBtn + " " + styles.editBtn}
                    onClick={() => openEditModal(delivery)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>

      <Modal show={showEditModal}>
        <div className="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowEditModal(false)}
          ></button>
          <h1 className="text-body-emphasis">Edit Delivery</h1>
          <div>
            <form onSubmit={handleUpdateDelivery}>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.roundedInput}
              >
                <option value="">Select Status</option>
                <option value="PREPARING_SHIPMENT">PREPARING SHIPMENT</option>
                <option value="IN_TRANSIT">IN TRANSIT</option>
                <option value="DELIVERY_SUCCESS">DELIVERY SUCCESS</option>
                <option value="DELIVERY_FAILED">DELIVERY FAILED</option>
                <option value="HANDING_OVER_TO_DELIVERY_GUY">HANDING OVER TO DELIVERY GUY</option>
              </select>


              <button type="submit" className="btn btn-dark">
                Update Delivery
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ManageDelivery;
