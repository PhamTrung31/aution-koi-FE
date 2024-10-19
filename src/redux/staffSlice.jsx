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
      state.getStaff.error = true;
    },

    addStaffStart: (state) => {
      state.staffs.isFetching = true;
    },
    addStaffSuccess: (state) => {
      state.staffs.isFetching = false;
      state.staffs.addStaffs.push(action.payload);
    },
    addStaffFailed: (state) => {
      state.staffs.isFetching = false;
      state.staffs.error = true;
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
} = staffSlice.actions;
export default staffSlice.reducer;
