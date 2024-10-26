import { createSlice } from "@reduxjs/toolkit";

const breederSlice = createSlice({
  name: "breeder",
  initialState: {
    breeders: {
      allbreeders: [],
      isFetching: false,
      error: false,
    },
    addbreeders: {
      addbreeders: [],
      isFetching: false,
      error: false,
    },
    deletebreeders: {
      deletebreeders: [],
      isFetching: false,
      error: false,
    },
    updatebreeders: {
      updatebreeders: [],
      isFetching: false,
      error: false,
    },
    banbreeders: {
      banbreeders: [],
      isFetching: false,
      error: false,
    },
    unbanbreeders: {
      unbanbreeders: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getBreederStart: (state) => {
      state.breeders.isFetching = true;
    },
    getBreederSuccess: (state, action) => {
      state.breeders.isFetching = false;
      state.breeders.allbreeders = action.payload;
    },
    getBreederFailed: (state) => {
      state.breeders.isFetching = false;
      state.breeders.error = true;
    },

    addBreederStart: (state) => {
      state.addbreeders.isFetching = true;
    },
    addBreederSuccess: (state, action) => {
      state.addbreeders.isFetching = false;
      state.addbreeders.addbreeders.push(action.payload);
    },
    addBreederFailed: (state) => {
      state.addbreeders.isFetching = false;
      state.addbreeders.error = true;
    },
    deleteBreederStart: (state) => {
      state.deletebreeders.isFetching = true;
    },
    deleteBreederSuccess: (state, action) => {
      state.deletebreeders.isFetching = false;
      state.deletebreeders.deletebreeders.delete(action.payload);
    },
    deleteBreederFailed: (state) => {
      state.deletebreeders.isFetching = false;
      state.deletebreeders.error = true;
    },
    updateBreederStart: (state) => {
      state.updatebreeders.isFetching = true;
    },
    updateBreederSuccess: (state, action) => {
      state.updatebreeders.isFetching = false;
      state.updatebreeders.updatebreeders =
        state.updatebreeders.updatebreeders.map((breeder) =>
          breeder.id === action.payload.id ? action.payload : breeder
        );
    },
    updateBreederFailed: (state) => {
      state.updatebreeders.isFetching = false;
      state.updatebreeders.error = true;
    },

    banBreederStart: (state) => {
      state.banbreeders.isFetching = true;
    },
    banBreederSuccess: (state, action) => {
      state.banbreeders.isFetching = false;
      state.banbreeders.banbreeders.push(action.payload);
    },
    banBreederFailed: (state) => {
      state.banbreeders.isFetching = false;
      state.banbreeders.error = true;
    },

    unbanBreederStart: (state) => {
      state.unbanbreeders.isFetching = true;
    },
    unbanBreederSuccess: (state, action) => {
      state.unbanbreeders.isFetching = false;
      state.unbanbreeders.unbanstaffs.push(action.payload);
    },
    unbanBreederFailed: (state) => {
      state.unbanbreeders.isFetching = false;
      state.unbanbreeders.error = true;
    },
  },
});
export const {
  getBreederStart,
  getBreederSuccess,
  getBreederFailed,
  addBreederStart,
  addBreederSuccess,
  addBreederFailed,
  deleteBreederStart,
  deleteBreederSuccess,
  deleteBreederFailed,
  updateBreederStart,
  updateBreederSuccess,
  updateBreederFailed,
  banBreederStart,
  banBreederSuccess,
  banBreederFailed,
  unbanBreederStart,
  unbanBreederSuccess,
  unbanBreederFailed,
} = breederSlice.actions;
export default breederSlice.reducer;
