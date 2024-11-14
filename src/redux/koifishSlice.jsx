import { createSlice } from "@reduxjs/toolkit";

const koifishSlice = createSlice({
  name: "koifish",
  initialState: {
    koifishs: {
      koifishById: [],
      isFetching: false,
      error: false,
    },
    koifishByBreederId: {
      koifishByBreederId: [],
      isFetching: false,
      error: false,
    },
    koifishWithStatusNew: {
      koifishWithStatusNew: [],
      isFetching: false,
      error: false,
    },
    addkoifish: {
      addKoifish: [],
      isFetching: false,
      error: null,
    },
    deletekoifish: {
      deleteKoifish: [],
      isFetching: false,
      error: false,
    },
    updatekoifish: {
      updateKoifish: [],
      isFetching: false,
      error: null,
    },
    
  },
  reducers: {
    getKoiFishByIdStart: (state) => {
      state.koifishs.isFetching = true;
    },
    getKoiFishByIdSuccess: (state, action) => {
      state.koifishs.isFetching = false;
      state.koifishs.koifishById = action.payload;
    },
    getKoiFishByIdFailed: (state) => {
      state.koifishs.isFetching = false;
      state.koifishs.error = true;
    },
    getKoiFishByBreederIdStart: (state) => {
      state.koifishByBreederId.isFetching = true;
    },
    getKoiFishByBreederIdSuccess: (state, action) => {
      state.koifishByBreederId.isFetching = false;
      state.koifishByBreederId.koifishByBreederId = action.payload;
    },
    getKoiFishByBreederIdFailed: (state) => {
      state.koifishByBreederId.isFetching = false;
      state.koifishByBreederId.error = true;
    },

    addKoiFishStart: (state) => {
      state.addkoifish.isFetching = true;
    },
    addKoiFishSuccess: (state, action) => {
      state.addkoifish.isFetching = false;
      state.addkoifish.addKoifish.push(action.payload);
    },
    addKoiFishFailed: (state,action) => {
      state.addkoifish.isFetching = false;
      state.addkoifish.error = action.payload;
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
    updateKoiFishFailed: (state,action) => {
      state.updatekoifish.isFetching = false;
      state.updatekoifish.error = action.payload;
    },
    getKoiFishWithStatusNewStart: (state) => {
      state.koifishWithStatusNew.isFetching = true;
    },
    getKoiFishWithStatusNewSuccess: (state, action) => {
      state.koifishWithStatusNew.isFetching = false;
      state.koifishWithStatusNew.koifishWithStatusNew = action.payload;
    },
    getKoiFishWithStatusNewFailed: (state) => {
      state.koifishWithStatusNew.isFetching = false;
      state.koifishWithStatusNew.error = true;
    },
    clearError: (state) => {
      state.addkoifish.error = null;
    },
  },
});
export const {
  getKoiFishByIdStart,
  getKoiFishByIdSuccess,
  getKoiFishByIdFailed,
  addKoiFishStart,
  addKoiFishSuccess,
  addKoiFishFailed,
  deleteKoiFishStart,
  deleteKoiFishSuccess,
  deleteKoiFishFailed,
  updateKoiFishStart,
  updateKoiFishSuccess,
  updateKoiFishFailed,
  getKoiFishByBreederIdStart,
  getKoiFishByBreederIdSuccess,
  getKoiFishByBreederIdFailed,
  getKoiFishWithStatusNewStart,
  getKoiFishWithStatusNewSuccess,
  getKoiFishWithStatusNewFailed,
  clearError,
} = koifishSlice.actions;

export default koifishSlice.reducer;
