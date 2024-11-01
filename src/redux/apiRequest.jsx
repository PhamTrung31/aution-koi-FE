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
  approveAuctionRequestFailed
} from "./auctionRequestSlice";

import {
  getKoiFishStart,
  getKoiFishSuccess,
  getKoiFishFailed,
  addKoiFishStart,
  addKoiFishSuccess,
  addKoiFishFailed,
  deleteKoiFishStart,
  deleteKoiFishSuccess,
  deleteKoiFishFailed,
  updateKoiFishStart,
  updateKoiFishSuccess,
  updateKoiFishFailed
} from "./koifishSlice";
import {
  topupWalletStart,
  topupWalletSuccess,
  topupWalletFailed
} from "./walletSlice";
import {
  joinAuctionStart,
  joinAuctionSuccess,
  joinAuctionFailed
} from "./auctionSlice";
import {
  getUserWalletStart,
  getUserWalletSuccess,
  getUserWalletFailed
} from "./walletSlice";

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
    getUserWallet(res.data.id, dispatch);
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
    getAllStaffs(accessToken,dispatch);
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
    getAllStaffs(accessToken,dispatch);
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
    getAllStaffs(accessToken,dispatch);
  } catch {
    dispatch(updateStaffFailed());
  }
};

export const banStaff = async (dispatch, userId, accessToken) => {
  dispatch(banStaffStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/manager/ban/${userId}`,{},
      {
        headers: { Authorization: `Bearer ${accessToken}  ` },
      }
    );
    dispatch(banStaffSuccess(res.data));
    getAllStaffs(accessToken,dispatch);
  } catch (err) {
    dispatch(banStaffFailed());
  }
};

export const unbanStaff = async (dispatch, userId, accessToken) => {
  dispatch(unbanStaffStart());
  try {
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/manager/unban/${userId}`,{},
      {
        headers: { Authorization: `Bearer ${accessToken}  ` },
      }
    );
    dispatch(unbanStaffSuccess(res.data));
    getAllStaffs(accessToken,dispatch);
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
    getAllUser(accessToken,dispatch);
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
    getAllUser(accessToken,dispatch);
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
    navigate("/auctionView");
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
    getAllUser(accessToken,dispatch);
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
    getAllUser(accessToken,dispatch);
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
    getAllUser(accessToken,dispatch);
  } catch (err) {
    dispatch(unbanUserFailed());
  }
};

export const getAllAuction = async (accessToken, dispatch) => {
  dispatch(getAuctionRequestStart());
  try {
    const res = await axios.get(
      "http://localhost:8081/auctionkoi/auctions/view-all-requests",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAuctionRequestSuccess(res.data.result));
  } catch (err) {
    dispatch(getAuctionRequestFailed());
  }
};

export const getAuctionRequestDetail = async (
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

export const addAuctionRequest = async (dispatch, auctionRequestData, accessToken) => {
  dispatch(addAuctionRequestStart());

  try {
    // Log the data structure before sending to verify
    console.log("Auction Request Data:", auctionRequestData);

    const res = await axios.post(
      "http://localhost:8081/auctionkoi/auctions/send-request",
      auctionRequestData, // Data should be an object
      {
        headers: { 
          Authorization: `Bearer ${accessToken}`, 
          "Content-Type": "application/json" 
        },
      }
    );

    // Log response to verify successful post
    console.log("Response Data:", res.data);
    dispatch(addAuctionRequestSuccess(res.data));

  } catch (err) {
    // Log error details to diagnose
    console.error("Error posting auction request:", err.response?.data || err.message);
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
  } catch {
    dispatch(deleteAuctionRequestFailed());
  }
};

export const updateAuctionRequest = async (
  dispatch,
  auctionRequestId,
  updatedata,
  accessToken
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
      `http://localhost:8081/auctionkoi/auctions/approve`,
      approvedata,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(approveAuctionRequestSuccess(res.data));
  } catch {
    dispatch(approveAuctionRequestFailed());
  }
};

// export const getAllKoiFish = async (accessToken, dispatch) => {
//   dispatch(getUserStart());
//   try {
//     const res = await axios.get("http://localhost:8081/auctionkoi/staffs/all", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     dispatch(getUserSuccess(res.data.result));
//   } catch (err) {
//     dispatch(getUserFailed());
//   }
// };

// export const addUser = async (dispatch, staffData, accessToken) => {
//   dispatch(addUserStart());
//   try {
//     const res = await axios.post(
//       "http://localhost:8081/auctionkoi/staffs/create",
//       staffData,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );
//     dispatch(addUserSuccess(res.data));
//     getAllUser(accessToken,dispatch);
//   } catch (err) {
//     dispatch(addUserFailed());
//   }
// };

// export const deleteUser = async (dispatch, userId, accessToken) => {
//   dispatch(deleteUserStart());
//   try {
//     const res = await axios.delete(
//       `http://localhost:8081/auctionkoi/staffs/${userId}`,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );
//     dispatch(deleteUserSuccess(res.data.result));
//     getAllUser(accessToken,dispatch);
//   } catch {
//     dispatch(deleteUserFailed());
//   }
// };
// export const updateUser = async (dispatch, userId, updatedata, accessToken) => {
//   dispatch(updateUserStart());
//   try {
//     const res = await axios.put(
//       `http://localhost:8081/auctionkoi/staffs/${userId}`,
//       updatedata,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );
//     dispatch(updateUserSuccess(res.data));
//     getAllUser(accessToken,dispatch);
//   } catch {
//     dispatch(updateUserFailed());
//   }
// };

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

export const getUserWallet = async (userid, dispatch) => {
  dispatch(getUserWalletStart());
  try {
    const res = await axios.get(`http://localhost:8081/auctionkoi/wallet/${userid}`);
    console.log(res.data.result)
    dispatch(getUserWalletSuccess(res.data.result));
  } catch (err) {
    const error = err.response?.data || "An error occured";
    dispatch(getUserWalletFailed(error));
  }
}
