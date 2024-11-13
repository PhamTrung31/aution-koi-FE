import axios from "axios";
import {
  logoutFailed,
  logoutSuccess,
  logoutStart,
  getProfileFailed,
  getProfileStart,
  getProfileSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailed,
} from "./categorySlice";
import {
  getStaffStart,
  getStaffSuccess,
  getStaffFailed,
  addStaffStart,
  addStaffSuccess,
  addStaffFailed,
  deleteStaffStart,
  deleteStaffSuccess,
  deleteStaffFailed,
  updateStaffStart,
  updateStaffSuccess,
  updateStaffFailed,
  banStaffStart,
  banStaffSuccess,
  banStaffFailed,
  unbanStaffStart,
  unbanStaffSuccess,
  unbanStaffFailed,
} from "./staffSlice";
import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  addUserStart,
  addUserSuccess,
  addUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  banUserStart,
  banUserSuccess,
  banUserFailed,
  unbanUserStart,
  unbanUserSuccess,
  unbanUserFailed,
  changeAvatarStart,
  changeAvatarSuccess,
  changeAvatarFailed
} from "./userSlice";
import {
  getAuctionRequestStart,
  getAuctionRequestSuccess,
  getAuctionRequestFailed,
  getAuctionRequestByBreederIdStart,
  getAuctionRequestByBreederIdSuccess,
  getAuctionRequestByBreederIdFailed,
  getOneAuctionRequestStart,
  getOneAuctionRequestSuccess,
  getOneAuctionRequestFailed,
  addAuctionRequestStart,
  addAuctionRequestSuccess,
  addAuctionRequestFailed,
  deleteAuctionRequestStart,
  deleteAuctionRequestSuccess,
  deleteAuctionRequestFailed,
  updateAuctionRequestStart,
  updateAuctionRequestSuccess,
  updateAuctionRequestFailed,
  approveAuctionRequestStart,
  approveAuctionRequestSuccess,
  approveAuctionRequestFailed,
  getAuctionRequestForManagerStart,
  getAuctionRequestForManagerSuccess,
  getAuctionRequestForManagerFailed,
  managerRejectStart,
  managerRejectSuccess,
  managerRejectFailed,
  getAuctionRequestForStaffToAssignStart,
  getAuctionRequestForStaffToAssignSuccess,
  getAuctionRequestForStaffToAssignFailed,
  staffRejectStart,
  staffRejectSuccess,
  staffRejectFailed,
  getAuctionRequestByAssignedStaffStart,
  getAuctionRequestByAssignedStaffSuccess,
  getAuctionRequestByAssignedStaffFailed,
  sendToManagerStart,
  sendToManagerSuccess,
  sendToManagerFailed,
  assignStaffStart,
  assignStaffSuccess,
  assignStaffFailed,
  assignStaffApproveStart,
  assignStaffApproveSuccess,
  assignStaffApproveFailed,
  setTimeStart,
  setTimeSuccess,
  setTimeFailed
} from "./auctionRequestSlice";
import {
  getallTransactionStart,
  getallTransactionSuccess,
  getallTransactionFailed,
  requestWithdrawalsStart,
  requestWithdrawalsSuccess,
  requestWithdrawalsFailed,
  pendingWithDrawalsStart,
  pendingWithDrawalsSuccess,
  pendingWithDrawalsFailed,
  paymentApprovalStart,
  paymentApprovalSuccess,
  paymentApprovalFailed,
  paymentRejectedStart,
  paymentRejectedSuccess,
  paymentRejectedFailed,
  getallPaymentOfBreederStart,
  getallPaymentOfBreederSuccess,
  getallPaymentOfBreederFailed
} from "./transactionSlice";
import {
  topupWalletStart,
  topupWalletSuccess,
  topupWalletFailed
} from "./walletSlice";
import{
  getKoiFishByIdStart,
  getKoiFishByIdSuccess,
  getKoiFishByIdFailed,
  addKoiFishStart,
  addKoiFishSuccess,
  addKoiFishFailed,
  deleteKoiFishStart,
  deleteKoiFishSuccess,
  deleteKoiFishFailed,
  updateKoiFishStart,
  updateKoiFishSuccess,
  updateKoiFishFailed,
  getKoiFishByBreederIdStart,
  getKoiFishByBreederIdSuccess,
  getKoiFishByBreederIdFailed,
  getKoiFishWithStatusNewStart,
  getKoiFishWithStatusNewSuccess,
  getKoiFishWithStatusNewFailed
} from "./koifishSlice";
import {
  joinAuctionStart,
  joinAuctionSuccess,
  joinAuctionFailed,
  getAuctionStart,
  getAuctionSuccess,
  getAuctionFailed,
  joinValidateStart,
  joinValidateSuccess,
  joinValidateFailed
} from "./auctionSlice";
import {
  getUserWalletStart,
  getUserWalletSuccess,
  getUserWalletFailed
} from "./walletSlice";
import {
  getallDeliveryStart,
  getallDeliverySuccess,
  getallDeliveryFailed,
  updateDeliveryStatusStart,
  updateDeliveryStatusSuccess,
  updateDeliveryStatusFailed
} from "./deliverySlice";
import {
  getStatCardStart,
  getStatCardSuccess,
  getStatCardFailed,
  getBoardChartStart,
  getBoardChartSuccess,
  getBoardChartFailed,
  getDonutChartStart,
  getDonutChartSuccess,
  getDonutChartFailed
} from "./dashboard";

export const loginPayload = async (payload, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:8081/auctionkoi/auth/token",
      payload
    );
    dispatch(loginSuccess(res.data.result));
    getUserProfile(res.data.result.token, dispatch, navigate);
    navigate("/");
  } catch (err) {
    const error = err.response?.data || "An error occured";
    dispatch(loginFailed(error));
    navigate("/login");
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8081/auctionkoi/users/create", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getUserProfile = async (accessToken, dispatch) => {
  dispatch(getProfileStart());
  try {
    const res = await axios.get(
      "http://localhost:8081/auctionkoi/auth/profile",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getProfileSuccess(res.data));
    getUserWallet(accessToken, res.data.id, dispatch);
  } catch (err) {
    dispatch(getProfileFailed());
  }
};

export const getAllCategories = async (dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const res = await axios.get("https://api.escuelajs.co/api/v1/categories/");
    dispatch(getCategoriesSuccess(res.data));
  } catch (err) {
    dispatch(getCategoriesFailed());
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    // await axiosJWT.post("...")
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailed());
  }
};

export const getAllStaffs = async (accessToken, dispatch) => {
  dispatch(getStaffStart());
  try {
    const res = await axios.get(
      "http://localhost:8081/auctionkoi/manager/allstaff",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getStaffSuccess(res.data.result));
  } catch (err) {
    dispatch(getStaffFailed());
  }
};

export const addStaff = async (dispatch, staffData, accessToken) => {
  dispatch(addStaffStart());
  try {
    const res = await axios.post(
      "http://localhost:8081/auctionkoi/manager/add",
      staffData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(addStaffSuccess(res.data));
    getAllStaffs(accessToken, dispatch);
  } catch (err) {
    dispatch(addStaffFailed());
  }
};

export const deleteStaff = async (dispatch, staffId, accessToken) => {
  dispatch(deleteStaffStart());
  try {
    const res = await axios.delete(
      `http://localhost:8081/auctionkoi/manager/${staffId}/delete`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteStaffSuccess(res.data));
    getAllStaffs(accessToken, dispatch);
  } catch {
    dispatch(deleteStaffFailed());
  }
};

export const updateStaff = async (
  dispatch,
  staffId,
  updatedata,
  accessToken
) => {
  dispatch(updateStaffStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/manager/${staffId}`,
      updatedata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateStaffSuccess(res.data));
    getAllStaffs(accessToken, dispatch);
  } catch {
    dispatch(updateStaffFailed());
  }
};

export const banStaff = async (dispatch, userId, accessToken) => {
  dispatch(banStaffStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/manager/ban/${userId}`, {},
      {
        headers: { Authorization: `Bearer ${accessToken}  ` },
      }
    );
    dispatch(banStaffSuccess(res.data));
    getAllStaffs(accessToken, dispatch);
  } catch (err) {
    dispatch(banStaffFailed());
  }
};

export const unbanStaff = async (dispatch, userId, accessToken) => {
  dispatch(unbanStaffStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/manager/unban/${userId}`, {},
      {
        headers: { Authorization: `Bearer ${accessToken}  ` },
      }
    );
    dispatch(unbanStaffSuccess(res.data));
    getAllStaffs(accessToken, dispatch);
  } catch (err) {
    dispatch(unbanStaffFailed());
  }
};

export const getAllUser = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:8081/auctionkoi/staffs/all", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data.result));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

export const addUser = async (dispatch, staffData, accessToken) => {
  dispatch(addUserStart());
  try {
    const res = await axios.post(
      "http://localhost:8081/auctionkoi/staffs/create",
      staffData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(addUserSuccess(res.data));
    getAllUser(accessToken, dispatch);
  } catch (err) {
    dispatch(addUserFailed());
  }
};

export const deleteUser = async (dispatch, userId, accessToken) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(
      `http://localhost:8081/auctionkoi/staffs/${userId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteUserSuccess(res.data.result));
    getAllUser(accessToken, dispatch);
  } catch {
    dispatch(deleteUserFailed());
  }
};

export const changeAvatarImage = async (accessToken, userid, payload, dispatch, navigate) => {
  dispatch(changeAvatarStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/users/${userid}/avatar`,
      payload,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    dispatch(changeAvatarSuccess(res.data));
    getUserProfile(accessToken, dispatch, navigate);
  } catch (err) {
    const error = err.response?.data || 'An error occured';
    dispatch(changeAvatarFailed(error));
    navigate("/profile");
  }
}

export const joinNewAuction = async (accessToken, userid, auctionid, dispatch, navigate) => {
  dispatch(joinAuctionStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/auctions/join/${auctionid}/${userid}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    console.log(accessToken);
    console.log(userid);
    console.log(auctionid);
    dispatch(joinAuctionSuccess(res.data));
    navigate("/auctionPreview");
  } catch (err) {
    console.log(err);
    const error = err.response?.data || 'An error occured';
    dispatch(joinAuctionFailed(error));
  }
}

export const updateUser = async (dispatch, userId, updatedata, accessToken) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/staffs/${userId}`,
      updatedata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateUserSuccess(res.data));
    getAllUser(accessToken, dispatch);
  } catch {
    dispatch(updateUserFailed());
  }
};

export const banUser = async (dispatch, userId, accessToken) => {
  dispatch(banUserStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/staffs/ban/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}  ` },
      }
    );
    dispatch(banUserSuccess(res.data));
    getAllUser(accessToken, dispatch);
  } catch (err) {
    dispatch(banUserFailed());
  }
};

export const unbanUser = async (dispatch, userId, accessToken) => {
  dispatch(unbanUserStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/staffs/unban/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}  ` },
      }
    );
    dispatch(unbanUserSuccess(res.data));
    getAllUser(accessToken, dispatch);
  } catch (err) {
    dispatch(unbanUserFailed());
  }
};

export const getAllAuction = async (accessToken, dispatch) => {
  dispatch(getAuctionRequestStart());
  try {
    const res = await axios.get(
      "http://localhost:8081/auctionkoi/auction-request/wait",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAuctionRequestSuccess(res.data.result));
  } catch (err) {
    dispatch(getAuctionRequestFailed());
  }
};

export const getOneAuctionRequest = async (
  accessToken,
  auctionRequestId,
  dispatch
) => {
  dispatch(getOneAuctionRequestStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/auctions/view-request-detail/${auctionRequestId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getOneAuctionRequestSuccess(res.data));
  } catch (err) {
    dispatch(getOneAuctionRequestFailed());
  }
};

export const addAuctionRequest = async (dispatch, auctionRequestData, accessToken, breederId) => {
  dispatch(addAuctionRequestStart());
console.log(auctionRequestData);
  try {
    const res = await axios.post(
      "http://localhost:8081/auctionkoi/auctions/send-request",
      auctionRequestData, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      }
    );
    
    dispatch(addAuctionRequestSuccess(res.data));
    getAllAuctionRequestByBreederID(accessToken, breederId, dispatch);
    getKoiFishByBreederId(accessToken, breederId, dispatch);
  } catch (err) {
    dispatch(addAuctionRequestFailed());
  }
};

export const cancelAuctionRequest = async (
  dispatch,
  auctionRequestId,
  breederID,
  accessToken
) => {
  dispatch(deleteAuctionRequestStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auctions/cancel/${auctionRequestId}/${breederID}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteAuctionRequestSuccess(res.data.result));
    getAllAuctionRequestByBreederID(accessToken, breederID, dispatch);
  } catch {
    dispatch(deleteAuctionRequestFailed());
  }
};

export const updateAuctionRequest = async (
  dispatch,
  auctionRequestId,
  updatedata,
  accessToken,
  breederId
) => {
  dispatch(updateAuctionRequestStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auctions/update/${auctionRequestId}`,
      updatedata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateAuctionRequestSuccess(res.data));
    getAllAuctionRequestByBreederID(accessToken, breederId, dispatch);
  } catch {
    dispatch(updateAuctionRequestFailed());
  }
};

export const getAllAuctionRequestByBreederID = async (accessToken, breederId, dispatch) => {
  dispatch(getAuctionRequestByBreederIdStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/auctions/view-all-requests/${breederId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(res.data); // Kiểm tra toàn bộ response
    if (res.data && res.data.result) {
      dispatch(getAuctionRequestByBreederIdSuccess(res.data.result));
    } else {
      console.error("No result found in response"); // Thông báo không có dữ liệu
      dispatch(getAuctionRequestByBreederIdFailed());
    }
  } catch (err) {
    console.error("Error fetching data:", err); // In ra lỗi cụ thể
    dispatch(getAuctionRequestByBreederIdFailed());
  }
};

export const apporve = async (dispatch, approvedata, accessToken) => {
  dispatch(approveAuctionRequestStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auction-request/staff/approve`,
      approvedata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(approveAuctionRequestSuccess(res.data));
    getAllAuction(accessToken, dispatch);
  } catch {
    dispatch(approveAuctionRequestFailed());
  }
};

export const getKoiFishById = async (accessToken, koifishId, dispatch) => {
  dispatch(getKoiFishByIdStart());
  try {
    const res = await axios.get(`http://localhost:8081/auctionkoi/koifish/koifish/${koifishId}`, 
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getKoiFishByIdSuccess(res.data.result));
  } catch (err) {
    dispatch(getKoiFishByIdFailed());
  }
};

export const getKoiFishByBreederId = async (accessToken, breederId, dispatch) => {
  dispatch(getKoiFishByBreederIdStart());
  try {
    const res = await axios.get(`http://localhost:8081/auctionkoi/koifish/breeder/${breederId}`, 
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getKoiFishByBreederIdSuccess(res.data.result));
  } catch (err) {
    dispatch(getKoiFishByBreederIdFailed());
  }
};

export const getAuctionRequestForManager = async (accessToken, dispatch) => {
  dispatch(getAuctionRequestForManagerStart());
  try {
    const res = await axios.get(
      "http://localhost:8081/auctionkoi/auction-request/manager-review",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAuctionRequestForManagerSuccess(res.data.result));
  } catch (err) {
    dispatch(getAuctionRequestForManagerFailed());
  }
};

export const getAuctionRequestForStaffToAssign = async (accessToken, staffId, dispatch) => {
  dispatch(getAuctionRequestForStaffToAssignStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/auction-request/assigned-staff/${staffId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAuctionRequestForStaffToAssignSuccess(res.data.result));
  } catch (err) {
    dispatch(getAuctionRequestForStaffToAssignFailed());
  }
};

export const topupWalletRequest = async (payload, dispatch, navigate) => {
  dispatch(topupWalletStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/vnpay/submitOrder`,
      payload
    );
    console.log(res.data);
    dispatch(topupWalletSuccess(res.data));
    // navigate(res.data.vnpayUrl);
    window.location.href = res.data.vnpayUrl;
  } catch (err) {
    const error = err.response?.data || "An error occured";
    dispatch(topupWalletFailed(error));
    navigate("/topup");
  }
};

export const getUserWallet = async (accessToken, userid, dispatch) => {
  dispatch(getUserWalletStart());
  try {
    const res = await axios.get(`http://localhost:8081/auctionkoi/wallet/${userid}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(res.data.result)
    dispatch(getUserWalletSuccess(res.data.result));
  } catch (err) {
    const error = err.response?.data || "An error occured";
    dispatch(getUserWalletFailed(error));
  }
};

export const assignStaff = async (dispatch, assigndata, accessToken) => {
  dispatch(assignStaffStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auction-request/manager/assign-staff`,
      assigndata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(assignStaffSuccess(res.data));
    getAuctionRequestForManager(accessToken, dispatch);
  } catch {
    dispatch(assignStaffFailed());
  }
};

export const managerReject = async (dispatch, rejectdata, accessToken) => {
  dispatch(managerRejectStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auction-request/manager/reject`,
      rejectdata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(managerRejectSuccess(res.data)); 
    getAuctionRequestForManager(accessToken, dispatch);    
  } catch {
    dispatch(managerRejectFailed());
  }
};

export const staffReject = async (dispatch, rejectdata, accessToken, staffId) => {
  dispatch(staffRejectStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auction-request/assignedstaff/reject`,
      rejectdata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(staffRejectSuccess(res.data));
    getAuctionRequestForStaffToAssign(accessToken, staffId, dispatch);
  } catch {
    dispatch(staffRejectFailed());
  }
};

export const getAuctionRequestByAssignedStaff = async (accessToken, staffId, dispatch) => {
  dispatch(getAuctionRequestByAssignedStaffStart());
  try {
    const res = await axios.get(`http://localhost:8081/auctionkoi/auction-request/awaiting-schedule/${staffId}`, 
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAuctionRequestByAssignedStaffSuccess(res.data.result));
  } catch (err) {
    dispatch(getAuctionRequestByAssignedStaffFailed());
  }
};

export const getAuctionById = async (accessToken, auctionId, dispatch) => {
  dispatch(getAuctionStart());
  try {
    const res = await axios.get(`http://localhost:8081/auctionkoi/auctions/auctions/${auctionId}`, 
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAuctionSuccess(res.data.result));
  } catch (err) {
    dispatch(getAuctionFailed());
  }
};

export const addKoiFish = async (dispatch, koifishData, breederId, accessToken) => {
  dispatch(addKoiFishStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/koifish/${breederId}`,
      koifishData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(addKoiFishSuccess(res.data));
    getKoiFishByBreederId(accessToken, breederId, dispatch);
  } catch (err) {
    dispatch(addKoiFishFailed());
  }
};

export const cancelKoiFish = async (
  dispatch,
  koiFishId,
  breederId,
  accessToken
) => {
  dispatch(deleteKoiFishStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/koifish/cancel/${koiFishId}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteKoiFishSuccess(res.data.result));
    getKoiFishByBreederId(accessToken, breederId, dispatch);
  } catch {
    dispatch(deleteKoiFishFailed());
  }
};

export const updateKoiFish = async (dispatch, koiFishId, updatedata, accessToken, breederId) => {
  dispatch(updateKoiFishStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/koifish/${koiFishId}`,
      updatedata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateKoiFishSuccess(res.data));
    getKoiFishByBreederId(accessToken, breederId, dispatch);
  } catch {
    dispatch(updateKoiFishFailed());
  }
};

export const joinAuctionValidate = async (accessToken, auctionid, userid, dispatch) => {
  dispatch(joinValidateStart());
  try {
    const res = await axios.get(`http://localhost:8081/auctionkoi/auctions/check-participation/${auctionid}/${userid}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(res.data.message);
    dispatch(joinValidateSuccess(res.data.message));
  } catch (err) {
    const error = err.response?.data || "An error occred";
    dispatch(joinValidateFailed());
  }
}

export const sendToManager = async (dispatch, sendToManagerData, accessToken) => {
  dispatch(sendToManagerStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auction-request/staff/send-to-manager`,
      sendToManagerData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(sendToManagerSuccess(res.data));
    getAllAuction(accessToken, dispatch);
  } catch {
    dispatch(sendToManagerFailed());
  }
}

export const assignStaffApprove = async (dispatch, approvedata, accessToken, staffId) => {
  dispatch(assignStaffApproveStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auction-request/assignedstaff/approve`,
      approvedata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(assignStaffApproveSuccess(res.data.result));
    getAuctionRequestForStaffToAssign(accessToken, staffId, dispatch);
  } catch {
    dispatch(assignStaffApproveFailed());
  }
};

export const setTime = async (dispatch, setTimeData, staffId, accessToken) => {
  dispatch(setTimeStart());
  console.log(setTimeData);
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/auction-request/schedule`,
      setTimeData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(setTimeSuccess(res.data.result));
    getAuctionRequestByAssignedStaff(accessToken, staffId, dispatch);
  } catch {
    dispatch(setTimeFailed());
  }
};

export const updateDeliveryStatus = async (
  dispatch,
  updatedata,
  accessToken
) => {
  dispatch(updateDeliveryStatusStart());
  try {
    const res = await axios.put(
      `http://localhost:8081/auctionkoi/deliveries/status`,
      updatedata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateDeliveryStatusSuccess(res.data.result));
    getDelivery(accessToken, dispatch);
  } catch {
    dispatch(updateDeliveryStatusFailed());
  }
};

export const getDelivery = async (accessToken, dispatch) => {
  dispatch(getallDeliveryStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/deliveries/alldelivery`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getallDeliverySuccess(res.data.result));
  } catch (err) {
    dispatch(getallDeliveryFailed());
  }
};

export const getTransaction = async (accessToken, dispatch) => {
  dispatch(getallTransactionStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/transactions/sort`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getallTransactionSuccess(res.data.result));
  } catch (err) {
    dispatch(getallTransactionFailed());
  }
};


export const getKoiFishWithStatusNew = async (accessToken, breederId, dispatch) => {
  dispatch(getKoiFishWithStatusNewStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/koifish/breeder/new/${breederId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getKoiFishWithStatusNewSuccess(res.data.result));
  } catch (err) {
    dispatch(getKoiFishWithStatusNewFailed());
  }
};

export const paymentApproval = async (dispatch, accessToken, paymentId) => {
  dispatch(paymentApprovalStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/payments/approve/${paymentId}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(paymentApprovalSuccess(res.data));
    getPendingWithdrawals(accessToken, dispatch);
  } catch (err) {
    dispatch(paymentApprovalFailed());
  }
};

export const paymentRejected   = async (dispatch, accessToken, paymentId) => {
  dispatch(paymentRejectedStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/payments/reject/${paymentId}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(paymentRejectedSuccess(res.data));
    getPendingWithdrawals(accessToken, dispatch);
  } catch (err) {
    dispatch(paymentRejectedFailed());
  }
};

export const getPendingWithdrawals = async (accessToken, dispatch) => {
  dispatch(pendingWithDrawalsStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/payments/pending-withdrawals`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(pendingWithDrawalsSuccess(res.data.result));
  } catch (err) {
    dispatch(pendingWithDrawalsFailed());
  }
};

export const requestWithdrawals  = async (dispatch, accessToken, userId, amount) => {
  dispatch(requestWithdrawalsStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/payments/withdraw/${userId}/${amount}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(requestWithdrawalsSuccess(res.data));
    getPendingWithdrawals(accessToken, dispatch);
  } catch (err) {
    dispatch(requestWithdrawalsFailed());
  }
};

export const getallPaymentOfBreeder = async (accessToken, breederId, dispatch) => {
  dispatch(getallPaymentOfBreederStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/payments/breeder/${breederId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getallPaymentOfBreederSuccess(res.data.result));
  } catch (err) {
    dispatch(getallPaymentOfBreederFailed());
  }
};

export const getStatCard = async (accessToken, dispatch) => {
  dispatch(getStatCardStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/dashboard`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getStatCardSuccess(res.data.result));
  } catch (err) {
    dispatch(getStatCardFailed());
  }
}

export const getBoardChart = async (accessToken, dispatch) => {
  dispatch(getBoardChartStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/dashboard/monthly-auctions`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getBoardChartSuccess(res.data.result));
  } catch (err) {
    dispatch(getBoardChartFailed());
  }
}

export const getDonutChart = async (accessToken, dispatch) => {
  dispatch(getDonutChartStart());
  try {
    const res = await axios.get(
      `http://localhost:8081/auctionkoi/dashboard/auction-type-percentage`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getDonutChartSuccess(res.data.result));
  } catch (err) {
    dispatch(getDonutChartFailed());
  } 
}
