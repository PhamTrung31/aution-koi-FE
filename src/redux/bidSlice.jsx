import { createSlice } from "@reduxjs/toolkit";

const bidSlice = createSlice({
    name: "bid",
    initialState: {
        traditionalBid: {
            status: null,
            isFetching: false,
            error: null
        },
        anonymousBid: {
            status: null,
            isFetching: false,
            error: null
        }
    },
    reducers: {
        placeTraditionalBidStart: (state) => {
            state.traditionalBid.isFetching = true
        },
        placeTraditionalBidSuccess: (state, action) => {
            state.traditionalBid.status = action.payload,
            state.traditionalBid.isFetching = false
        },
        placeTraditionalBidFailed: (state, action) => {
            state.traditionalBid.error = action.payload,
            state.traditionalBid.isFetching = false
        },
        initialTraditionalBid: (state) => {
            state.traditionalBid.status = null,
            state.traditionalBid.isFetching = false,
            state.traditionalBid.error = null
        },
        placeAnonymousBidStart: (state) => {
            state.anonymousBid.isFetching = true
        },
        placeAnonymousBidSuccess: (state, action) => {
            state.anonymousBid.status = action.payload,
            state.anonymousBid.isFetching = false
        },
        placeAnonymousBidFailed: (state, action) => {
            state.anonymousBid.error = action.payload,
            state.anonymousBid.isFetching = false
        },
        initialAnonymousBid: (state) => {
            state.anonymousBid.status = null,
            state.anonymousBid.isFetching = false,
            state.anonymousBid.error = null
        }
    }
})

export const {
    placeTraditionalBidStart,
    placeTraditionalBidSuccess,
    placeTraditionalBidFailed,
    initialTraditionalBid,
    placeAnonymousBidStart,
    placeAnonymousBidSuccess,
    placeAnonymousBidFailed,
    initialAnonymousBid
} = bidSlice.actions

export default bidSlice.reducer