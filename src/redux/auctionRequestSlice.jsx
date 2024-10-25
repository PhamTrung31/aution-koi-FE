import { createSlice } from "@reduxjs/toolkit";

const auctionrequestSlice = createSlice({
  name: "auctionrequest",
  initialState: {
    auctionrequests: {
      allauctionrequests: [],
      isFetching: false,
      error: false,
    },

    auctionrequestbybreederid: {
      auctionrequestbybreederids: [],
      isFetching: false,
      error: false,
    },
    oneauctionrequests: {
      oneauctionrequests: [],
      isFetching: false,
      error: false,
    },
    addauctionrequests: {
      addauctionrequests: [],
      isFetching: false,
      error: false,
    },
    deleteauctionrequests: {
      deleteauctionrequests: [],
      isFetching: false,
      error: false,
    },
    updateauctionrequests: {
      updateauctionrequests: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getAuctionRequestStart: (state) => {
      state.auctionrequests.isFetching = true;
    },
    getAuctionRequestSuccess: (state, action) => {
      state.auctionrequests.isFetching = false;
      state.auctionrequests.allauctionrequests = action.payload;
    },
    getAuctionRequestFailed: (state) => {
      state.auctionrequests.isFetching = false;
      state.auctionrequests.error = true;
    },

    getAuctionRequestByBreederIdStart: (state) => {
      state.auctionrequestbybreederid.isFetching = true;
    },
    getAuctionRequestByBreederIdSuccess: (state, action) => {
      state.auctionrequestbybreederid.isFetching = false;
      state.auctionrequestbybreederid.auctionrequestbybreederids =
        action.payload;
    },
    getAuctionRequestByBreederIdFailed: (state) => {
      state.auctionrequestbybreederid.isFetching = false;
      state.auctionrequestbybreederid.error = true;
    },

    getOneAuctionRequestStart: (state) => {
      state.oneauctionrequests.isFetching = true;
    },
    getOneAuctionRequestSuccess: (state, action) => {
      state.oneauctionrequests.isFetching = false;
      state.oneauctionrequests.oneauctionrequests = action.payload;
    },
    getOneAuctionRequestFailed: (state) => {
      state.oneauctionrequests.isFetching = false;
      state.oneauctionrequests.error = true;
    },

    addAuctionRequestStart: (state) => {
      state.addauctionrequests.isFetching = true;
    },
    addAuctionRequestSuccess: (state, action) => {
      state.addauctionrequests.isFetching = false;
      state.addauctionrequests.addauctionrequests.push(action.payload);
    },
    addAuctionRequestFailed: (state) => {
      state.addauctionrequests.isFetching = false;
      state.addauctionrequests.error = true;
    },
    deleteAuctionRequestStart: (state) => {
      state.deleteauctionrequests.isFetching = true;
    },
    deleteAuctionRequestSuccess: (state, action) => {
      state.deleteauctionrequests.isFetching = false;
      state.deleteauctionrequests.deleteauctionrequests.delete(action.payload);
    },
    deleteAuctionRequestFailed: (state) => {
      state.deleteauctionrequests.isFetching = false;
      state.deleteauctionrequests.error = true;
    },
    updateAuctionRequestStart: (state) => {
      state.updateauctionrequests.isFetching = true;
    },
    updateAuctionRequestSuccess: (state, action) => {
      state.updateauctionrequests.isFetching = false;
      state.updateauctionrequests.updateauctionrequests =
        state.updateauctionrequests.updateauctionrequests.map(
          (auctionrequest) =>
            auctionrequest.id === action.payload.id
              ? action.payload
              : auctionrequest
        );
    },
    updateAuctionRequestFailed: (state) => {
      state.updateauctionrequests.isFetching = false;
      state.updateauctionrequests.error = true;
    },
  },
});
export const {
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
} = auctionrequestSlice.actions;
export default auctionrequestSlice.reducer;
