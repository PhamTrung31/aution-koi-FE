import { createSlice } from "@reduxjs/toolkit";

const koifishSlice = createSlice({
  name: "koifish",
  initialState: {
    koifishs: {
      allKoifish: [],
      isFetching: false,
      error: false,
    },
    addkoifish: {
      addKoifish: [],
      isFetching: false,
      error: false,
    },
    deletekoifish: {
      deleteKoifish: [],
      isFetching: false,
      error: false,
    },
    updatekoifish: {
      updateKoifish: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getKoiFishStart: (state) => {
      state.koifishs.isFetching = true;
    },
    getKoiFishSuccess: (state, action) => {
      state.koifishs.isFetching = false;
      state.koifishs.allKoifish = action.payload;
    },
    getKoiFishFailed: (state) => {
      state.koifishs.isFetching = false;
      state.koifishs.error = true;
    },

    addKoiFishStart: (state) => {
      state.addkoifish.isFetching = true;
    },
    addKoiFishSuccess: (state, action) => {
      state.addkoifish.isFetching = false;
      state.addkoifish.addKoifish.push(action.payload);
    },
    addKoiFishFailed: (state) => {
      state.addkoifish.isFetching = false;
      state.addkoifish.error = true;
    },
    deleteKoiFishStart: (state) => {
      state.deletekoifish.isFetching = true;
    },
    deleteKoiFishSuccess: (state, action) => {
      state.deletekoifish.isFetching = false;
      state.deletekoifish.deleteKoifish.delete(action.payload);
    },
    deleteKoiFishFailed: (state) => {
      state.deletekoifish.isFetching = false;
      state.deletekoifish.error = true;
    },
    updateKoiFishStart: (state) => {
      state.updatekoifish.isFetching = true;
    },
    updateKoiFishSuccess: (state, action) => {
      state.updatekoifish.isFetching = false;
      state.updatekoifish.updateKoifish = state.updatekoifish.updateKoifish.map(
        (koifish) => (koifish.id === action.payload.id ? action.payload : koifish)
      );
    },
    updateKoiFishFailed: (state) => {
      state.updatekoifish.isFetching = false;
      state.updatekoifish.error = true;
    },
   
  },
});
export const {
  getKoiFishStart,
  getKoiFishSuccess,
  getKoiFishFailed,
  addKoiFishStart,
  addKoiFishSuccess,
  addKoiFishFailed,
  deleteKoiFishStart,
  deleteKoiFishSuccess,
  deleteKoiFishFailed,
  updateKoiFishStart,
  updateKoiFishSuccess,
  updateKoiFishFailed
} = koifishSlice.actions;

export default koifishSlice.reducer;
