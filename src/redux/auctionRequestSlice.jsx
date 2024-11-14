import { createSlice } from "@reduxjs/toolkit";
import { managerReject } from "./apiRequest";

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
    auctionrequestbyassignedstaff: {
      auctionrequestbyassignedstaffs: [],
      isFetching: false,
      error: false,
    },
    auctionrequestformanager: {
      auctionrequestformanagers: [],
      isFetching: false,
      error: false,
    },
    auctionrequestforstafftoassign: {
      auctionrequestforstafftoassigns: [],
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
    deleteauctionrequest: {
      deleteauctionrequests: [],
      isFetching: false,
      error: null,
    },
    updateauctionrequests: {
      updateauctionrequests: [],
      isFetching: false,
      error: false,
    },
    approve: {
      approveRequests: [],
      isFetching: false,
      error: false,
    },
    sendToManager: {
      sendToManagers: [],
      isFetching: false,
      error: false,
    },
    managerreject: {
      managerrejects: [],
      isFetching: false,
      error: false,
    },
    staffreject: {
      staffrejects: [],
      isFetching: false,
      error: false,
    },
    assignstaff: {
      assignstaffs: [],
      isFetching: false,
      error: false,
    },
    assignstaffapprove: {
      assignstaffapproves: [],
      isFetching: false,
      error: false,
    },
    setTime: {
      setTimes: [],
      isFetching: false,
      error: null,
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
      state.auctionrequestbybreederid.auctionrequestbybreederids = action.payload;
    },
    getAuctionRequestByBreederIdFailed: (state) => {
      state.auctionrequestbybreederid.isFetching = false;
      state.auctionrequestbybreederid.error = true;
    },

    getAuctionRequestByAssignedStaffStart: (state) => {
      state.auctionrequestbyassignedstaff.isFetching = true;
    },
    getAuctionRequestByAssignedStaffSuccess: (state, action) => {
      state.auctionrequestbyassignedstaff.isFetching = false;
      state.auctionrequestbyassignedstaff.auctionrequestbyassignedstaffs = action.payload;
    },
    getAuctionRequestByAssignedStaffFailed: (state) => {
      state.auctionrequestbyassignedstaff.isFetching = false;
      state.auctionrequestbyassignedstaff.error = true;
    },

    getAuctionRequestForManagerStart: (state) => {
      state.auctionrequestformanager.isFetching = true;
    },
    getAuctionRequestForManagerSuccess: (state, action) => {
      state.auctionrequestformanager.isFetching = false;
      state.auctionrequestformanager.auctionrequestformanagers = action.payload;
    },
    getAuctionRequestForManagerFailed: (state) => {
      state.auctionrequestformanager.isFetching = false;
      state.auctionrequestformanager.error = true;
    },

    getAuctionRequestForStaffToAssignStart: (state) => {
      state.auctionrequestforstafftoassign.isFetching = true;
    },
    getAuctionRequestForStaffToAssignSuccess: (state, action) => {
      state.auctionrequestforstafftoassign.isFetching = false;
      state.auctionrequestforstafftoassign.auctionrequestforstafftoassigns = action.payload;
    },
    getAuctionRequestForStaffToAssignFailed: (state) => {
      state.auctionrequestforstafftoassign.isFetching = false;
      state.auctionrequestforstafftoassign.error = true;
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
      state.deleteauctionrequest.isFetching = true;
    },
    deleteAuctionRequestSuccess: (state, action) => {
      state.deleteauctionrequest.isFetching = false;
      state.deleteauctionrequest.deleteauctionrequests = state.deleteauctionrequest.deleteauctionrequests.filter(
        (request) => request.id !== action.payload.id
      );
    },
    deleteAuctionRequestFailed: (state,action) => {
      state.deleteauctionrequest.isFetching = false;
      state.deleteauctionrequest.error = action.payload;
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

    approveAuctionRequestStart: (state) => {
      state.approve.isFetching = true;
    },
    approveAuctionRequestSuccess: (state, action) => {
      state.approve.isFetching = false;
      state.approve.approveRequests = state.approve.approveRequests.map(
        (auctionrequest) =>
          auctionrequest.id === action.payload.id
            ? action.payload
            : auctionrequest
      );
    },
    approveAuctionRequestFailed: (state) => {
      state.approve.isFetching = false;
      state.approve.error = true;
    },

    sendToManagerStart: (state) => {
      state.sendToManager.isFetching = true;
    },
    sendToManagerSuccess: (state, action) => {
      state.sendToManager.isFetching = false;
      state.sendToManager.sendToManagers = state.sendToManager.sendToManagers.map(
        (auctionrequest) =>
          auctionrequest.id === action.payload.id
            ? action.payload
            : auctionrequest
      );
    },
    sendToManagerFailed: (state) => {
      state.sendToManager.isFetching = false;
      state.sendToManager.error = true;
    },

    managerRejectStart: (state) => {
      state.managerreject.isFetching = true;
    },
    managerRejectSuccess: (state, action) => {
      state.managerreject.isFetching = false;
      state.managerreject.managerrejects = state.managerreject.managerrejects.map(
        (auctionrequest) =>
          auctionrequest.id === action.payload.id
            ? action.payload
            : auctionrequest
      );
    },

    managerRejectFailed: (state) => {
      state.managerreject.isFetching = false;
      state.managerreject.error = true;
    },

    assignStaffStart: (state) => {
      state.assignstaff.isFetching = true;
    },
    assignStaffSuccess: (state, action) => {
      state.assignstaff.isFetching = false;
      state.assignstaff.assignstaffs = state.assignstaff.assignstaffs.map(
        (auctionrequest) =>
          auctionrequest.id === action.payload.id
            ? action.payload
            : auctionrequest
      );
    },
    assignStaffFailed: (state) => {
      state.assignstaff.isFetching = false;
      state.assignstaff.error = true;
    },

    staffRejectStart: (state) => {
      state.staffreject.isFetching = true;
    },
    staffRejectSuccess: (state, action) => {
      state.staffreject.isFetching = false;
      state.staffreject.staffrejects = state.staffreject.staffrejects.map(
        (auctionrequest) =>
          auctionrequest.id === action.payload.id
            ? action.payload
            : auctionrequest
      );
    },
    staffRejectFailed: (state) => {
      state.staffreject.isFetching = false;
      state.staffreject.error = true;
    },

    assignStaffApproveStart: (state) => {
      state.assignstaffapprove.isFetching = true;
    },
    assignStaffApproveSuccess: (state, action) => {
      state.assignstaffapprove.isFetching = false;
      state.assignstaffapprove.assignstaffapproves = state.assignstaffapprove.assignstaffapproves.map(
        (auctionrequest) =>
          auctionrequest.id === action.payload.id
            ? action.payload
            : auctionrequest
      );
    },
    assignStaffApproveFailed: (state) => {
      state.assignstaffapprove.isFetching = false;
      state.assignstaffapprove.error = true;
    },
    setTimeStart: (state) => {
      state.setTime.isFetching = true;
    },
    setTimeSuccess: (state, action) => {
      state.setTime.isFetching = false;
      state.setTime.setTimes = state.setTime.setTimes.map(
        (auctionrequest) =>
          auctionrequest.id === action.payload.id
            ? action.payload
            : auctionrequest
      );
    },
    setTimeFailed: (state, action) => {
      state.setTime.isFetching = false;
      state.setTime.error = action.payload;
    },
    clearError: (state) => {
      state.deleteauctionrequest.error = null;
      state.setTime.error = null;
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
  setTimeFailed,
  clearError,
} = auctionrequestSlice.actions;
export default auctionrequestSlice.reducer;
