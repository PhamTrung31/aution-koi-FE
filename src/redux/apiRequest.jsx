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
} from "./staffSlice";

export const loginPayload = async (payload, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:8081/auctionkoi/auth/token",
      payload
    );
    dispatch(loginSuccess(res.data));
    console.log(res.data.result.token);
    getUserProfile(res.data.result.token, dispatch, navigate);
  } catch (err) {
    dispatch(loginFailed());
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

export const getUserProfile = async (accessToken, dispatch, navigate) => {
  dispatch(getProfileStart());
  try {
    const res = await axios.get(
      "http://localhost:8081/auctionkoi/auth/profile",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getProfileSuccess(res.data));
    navigate("/");
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
export const getAllStaff = async (dispatch, accessToken) => {
  dispatch(getStaffStart());
  try {
    console.log("Access Token:", accessToken);
    const res = await axios.get(
      "http://localhost:8081/auctionkoi/manager/allstaff",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getStaffSuccess(res.data.result));
    console.log(res.data.result);
  } catch (err) {
    console.error("Error fetching staff:", err.response || err.message);
    dispatch(getStaffFailed());
  }
};

export const addStaff = async (dispatch, staffData) => {
  dispatch(addStaffStart());
  try {
    const res = await axios.post(
      "http://localhost:8081/auctionkoi/manager",
      staffData
    );
    dispatch(addStaffSuccess(res.data));
  } catch (err) {
    dispatch(addStaffFailed());
  }
};
export const deleteStaff = async (dispatch, staffId) => {
  dispatch(deleteStaffStart());
  try {
    const res = await axios.delete(
      "http://localhost:8081/auctionkoi/manager/${staffId}"
    );
    dispatch(deleteStaffSuccess(res.data));
  } catch {
    dispatch(deleteStaffFailed());
  }
};
