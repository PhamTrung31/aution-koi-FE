import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Request.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctionRequest } from "../../redux/apiRequest";

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

function Request() {
  // const [id, setId] = useState("");
  // const [userid, setuserid] = useState("");
  // const [fishid, setfishid] = useState("");
  // const [buyout, setbuyout] = useState("");
  // const [startprice, setstartprice] = useState("");
  // const [method, setmethod] = useState("");
  // const [starttime, setstarttime] = useState("");
  // const [endtime, setendtime] = useState("");
  // const [requeststatus, setrequeststatus] = useState("");
  // const [createdate, setcreatedate] = useState("");
  // const [upadtedate, setupadtedate] = useState("");

  const [selectedAuctionRequest, setselectedAuctionRequest] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const token = useSelector(
    (state) => state.auth.login?.currentToken.result.token
  );
  const auctionRequestList = useSelector(
    (state) => state.auctionrequest.auctionrequests?.auctionrequests
  );

  const dispatch = useDispatch();
  console.log(token);
  useEffect(() => {
    getAllAuctionRequest(token, dispatch);
    console.log(auctionRequestList);
  }, []);
  // const openDetailModal = (auctionrequest) => {
  //   setselectedAuctionRequest(auctionrequest);
  //   setId(auctionrequest.id);
  //   setfishid(auctionrequest.fishId);
  //   setbuyout(auctionrequest.buyOut);
  //   setstartprice(auctionrequest.startPrice);
  //   setmethod(auctionrequest.methodType);
  //   setrequeststatus(auctionrequest.incrementPrice);
  //   setcreatedate(auctionrequest.requestStatus);
  //   setShowDetailModal(true);
  // };
  return (
    <div className="container py-3 table">
      <h2 className="mb-5 text-center">Your Auction Request</h2>
      <table class="table table-light table-bordered border border-dark shadow p-3 mb-5 rounded-4">
        <tr className="table-dark">
          <th>Koi Breeder</th>
          <th>Details</th>
          <th>CreateDate</th>
          <th>UpdateDate</th>
          <th>Actions</th>
        </tr>
        {auctionRequestList?.map((aucionRequest) => {
          return (
            <tr key={aucionRequest.id}>
              <td>{aucionRequest.user_id}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  // onClick={() => openDetailModal(aucionRequest)}
                >
                  View
                </button>
              </td>
              <td>{aucionRequest.requestCreatedDate}</td>
              <td>{aucionRequest.requestUpdatedDate}</td>
              <td>
                <button className={styles.actionBtn + " " + styles.editBtn}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className={styles.actionBtn + " " + styles.deleteBtn}
                  // onClick={() => handleDeleteUser(user.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </td>
            </tr>
          );
        })}
      </table>

      <Modal show={showDetailModal}>
        {selectedAuctionRequest && (
          <div className="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
            <button
              type="button"
              className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
              aria-label="Close"
              onClick={() => setShowDetailModal(false)}
            ></button>
            <h1 className="text-body-emphasis">Request Details</h1>
            <div className={styles.formContainer}>
              <div className={styles.leftColumn}>
                <div className={styles.importBox}>
                  <label htmlFor="importImage">Import Image</label>
                </div>
                <div className={styles.importBox}>
                  <label htmlFor="importVideo">Imported Video</label>
                </div>
              </div>
              <div className={styles.rightColumn}>
                <input
                  type="text"
                  name="fishName"
                  value={selectedRequest.fishName}
                  readOnly
                  className={styles.roundedInput}
                />
                <input
                  name="method"
                  value={selectedRequest.auctionMethod}
                  readOnly
                  className={styles.roundedInput}
                />
                <input
                  type="text"
                  name="startPrice"
                  value={selectedRequest.startPrice}
                  readOnly
                  className={styles.roundedInput}
                />
                <input
                  type="text"
                  name="buyOutPrice"
                  value={selectedRequest.buyoutPrice}
                  readOnly
                  className={styles.roundedInput}
                />
                <input
                  type="datetime-local"
                  name="startTime"
                  value={selectedRequest.startTime}
                  readOnly
                  className={styles.roundedInput}
                />
                <input
                  type="datetime-local"
                  name="endTime"
                  value={selectedRequest.endTime}
                  readOnly
                  className={styles.roundedInput}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal show={showAddModal}>
        <div class="position-relative p-2 text-center text-muted bg-body border border-dashed rounded-5">
          <button
            type="button"
            class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill"
            aria-label="Close"
            onClick={() => setShowAddModal(false)}
          ></button>
          <h1 class="text-body-emphasis">Create New Auction</h1>
          <div className={styles.formContainer}>
            <div>
              <input
                type="datetime-local"
                name="startTime"
                className={styles.roundedInput}
              />

              <input
                type="datetime-local"
                name="endTime"
                className={styles.roundedInput}
              />

              <button className=" btn btn-dark">Create Request</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Request;
