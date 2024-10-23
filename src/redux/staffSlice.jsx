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
      error: false,
    },
    deletestaffs: {
      deletestaffs: [],
      isFetching: false,
      error: false,
    },
    updatestaffs: {
      updatestaffs: [],
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
    addStaffFailed: (state) => {
      state.addstaffs.isFetching = false;
      state.addstaffs.error = true;
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

    updateStaffFailed: (state) => {
      state.updatestaffs.isFetching = false;
      state.updatestaffs.error = true;
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
} = staffSlice.actions;
export default staffSlice.reducer;
