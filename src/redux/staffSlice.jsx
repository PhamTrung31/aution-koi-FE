import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffs: {
      allStaffs: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
      getStaffsStart: (state) => {
        state.staffs.isFetching = true
      },
      getStaffsSuccess: (state,action) => {
        state.staffs.isFetching = false,
        state.staffs.allStaffs = action.payload
      },
      getStaffsFailed: (state) => {
        state.staffs.error = true
      }
  },
});
export const {
  getStaffsStart,
  getStaffsSuccess,
  getStaffsFailed
} = staffSlice.actions;
export default staffSlice.reducer;
