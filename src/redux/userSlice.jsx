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
    banusers: {
      banusers: [],
      isFetching: false,
      error: false,
    },
    unbanusers: {
      unbanusers: [],
      isFetching: false,
      error: false,
    },
    changeAvatar: {
      success: null,
      error: null,
      isFetching: false,
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
    banUserStart: (state) => {
      state.banusers.isFetching = true;
    },
    banUserSuccess: (state, action) => {
      state.banusers.isFetching = false;
      state.banusers.banusers.push(action.payload);
    },
    banUserFailed: (state) => {
      state.banusers.isFetching = false;
      state.banusers.error = true;
    },

    unbanUserStart: (state) => {
      state.unbanusers.isFetching = true;
    },
    unbanUserSuccess: (state, action) => {
      state.unbanusers.isFetching = false;
      state.unbanusers.unbanusers.push(action.payload);
    },
    unbanUserFailed: (state) => {
      state.unbanusers.isFetching = false;
      state.unbanusers.error = true;
    },
    changeAvatarStart: (state) => {
      state.changeAvatar.isFetching = true
    },
    changeAvatarSuccess: (state, action) => {
       state.changeAvatar.isFetching = false,
       state.changeAvatar.success = action.payload 
    },
    changeAvatarFailed: (state, action) => {
       state.changeAvatar.isFetching = false,
       state.changeAvatar.error = action.payload 
    }
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
  banUserStart,
  banUserSuccess,
  banUserFailed,
  unbanUserStart,
  unbanUserSuccess,
  unbanUserFailed,
  changeAvatarStart,
  changeAvatarSuccess,
  changeAvatarFailed
} = userSlice.actions;

export default userSlice.reducer;
