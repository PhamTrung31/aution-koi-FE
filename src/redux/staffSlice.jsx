import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffs: {
      allStaffs: [],
      isFetching: false,
      error: false,
    },
    addstaffs: {
      addStaffs: [],
      isFetching: false,
      error: null,
    },
    deletestaffs: {
      deletestaffs: [],
      isFetching: false,
      error: false,
    },
    updatestaffs: {
      updatestaffs: [],
      isFetching: false,
      error: null,
    },
    banstaffs: {
      banstaffs: [],
      isFetching: false,
      error: false,
    },
    unbanstaffs: {
      unbanstaffs: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getStaffStart: (state) => {
      state.staffs.isFetching = true;
    },
    getStaffSuccess: (state, action) => {
      state.staffs.isFetching = false;
      state.staffs.allStaffs = action.payload;
    },
    getStaffFailed: (state) => {
      state.staffs.isFetching = false;
      state.staffs.error = true;
    },

    addStaffStart: (state) => {
      state.addstaffs.isFetching = true;
    },
    addStaffSuccess: (state, action) => {
      state.addstaffs.isFetching = false;
      state.addstaffs.addStaffs.push(action.payload);
    },
    addStaffFailed: (state, action) => {
      state.addstaffs.isFetching = false;
      state.addstaffs.error = action.payload;
    },
    deleteStaffStart: (state) => {
      state.deletestaffs.isFetching = true;
    },
    deleteStaffSuccess: (state, action) => {
      state.deletestaffs.isFetching = false;
      state.deletestaffs.deletestaffs.delete(action.payload);
    },
    deleteStaffFailed: (state) => {
      state.deletestaffs.isFetching = false;
      state.deletestaffs.error = true;
    },
    updateStaffStart: (state) => {
      state.updatestaffs.isFetching = true;
    },
    updateStaffSuccess: (state, action) => {
      state.updatestaffs.isFetching = false;
      state.updatestaffs.updatestaffs = state.updatestaffs.updatestaffs.map(
        (staff) => (staff.id === action.payload.id ? action.payload : staff)
      );
    },
    updateStaffFailed: (state, action) => {
      state.updatestaffs.isFetching = false;
      state.updatestaffs.error = action.payload;
    },

    banStaffStart: (state) => {
      state.banstaffs.isFetching = true;
    },
    banStaffSuccess: (state, action) => {
      state.banstaffs.isFetching = false;
      state.banstaffs.banstaffs.push(action.payload);
    },
    banStaffFailed: (state) => {
      state.banstaffs.isFetching = false;
      state.banstaffs.error = true;
    },

    unbanStaffStart: (state) => {
      state.unbanstaffs.isFetching = true;
    },
    unbanStaffSuccess: (state, action) => {
      state.unbanstaffs.isFetching = false;
      state.unbanstaffs.unbanstaffs.push(action.payload);
    },
    unbanStaffFailed: (state) => {
      state.unbanstaffs.isFetching = false;
      state.unbanstaffs.error = true;
    },
    clearErrors: (state) => {
      state.addstaffs.error = null;
      state.updatestaffs.error = null;
    },
  },
});
export const {
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
  clearErrors
} = staffSlice.actions;
export default staffSlice.reducer;
