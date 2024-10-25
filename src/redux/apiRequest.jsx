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
  getStaffsStart,
  getStaffsSuccess,
  getStaffsFailed,
} from "./staffSlice";
import {
  changeAvatarStart,
  changeAvatarSuccess,
  changeAvatarFailed
} from "./userSlice";
import {
  joinAuctionStart,
  joinAuctionSuccess,
  joinAuctionFailed
} from "./auctionSlice";

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
    console.log(err);
    const error = err.response?.data || 'An error occured';
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
  dispatch(getStaffsStart());
  try {
    const res = await axios.get(
      "http://localhost:8081/auctionkoi/manager/allstaff",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getStaffsSuccess(res.data.result));
  } catch (err) {
    dispatch(getStaffsFailed());
  }
}

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
    console.log(accessToken);
    console.log(userid);
    console.log(auctionid);
    const res = await axios.post(
      `http://localhost:8081/auctionkoi/auctions/join/${auctionid}/${userid}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    dispatch(joinAuctionSuccess(res.data));
    navigate("/auctionView");
  } catch (err) {
    console.log(err);
    const error = err.response?.data || 'An error occured';
    dispatch(joinAuctionFailed(error));
  }
}

