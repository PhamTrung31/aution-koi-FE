import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: [],
      isFetching: false,
      error: false,
    },
    adduser: {
      addUsers: [],
      isFetching: false,
      error: false,
    },
    deleteusers: {
      deleteusers: [],
      isFetching: false,
      error: false,
    },
    updateusers: {
      updateusers: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getUserStart: (state) => {
      state.users.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },

    addUserStart: (state) => {
      state.adduser.isFetching = true;
    },
    addUserSuccess: (state, action) => {
      state.adduser.isFetching = false;
      state.adduser.addUsers.push(action.payload);
    },
    addUserFailed: (state) => {
      state.adduser.isFetching = false;
      state.adduser.error = true;
    },
    deleteUserStart: (state) => {
      state.deleteusers.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteusers.isFetching = false;
      state.deleteusers.deleteusers.delete(action.payload);
    },
    deleteUserFailed: (state) => {
      state.deleteusers.isFetching = false;
      state.deleteusers.error = true;
    },
    updateUserStart: (state) => {
      state.updateusers.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.updateusers.isFetching = false;
      state.updateusers.updateusers = state.updateusers.updateusers.map(
        (user) => (user.id === action.payload.id ? action.payload : user)
      );
    },

    updateUserFailed: (state) => {
      state.updateusers.isFetching = false;
      state.updateusers.error = true;
    },
  },
});
export const {
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
} = userSlice.actions;
export default userSlice.reducer;
