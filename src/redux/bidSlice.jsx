import { createSlice } from "@reduxjs/toolkit";

const bidSlice = createSlice({
    name: "bid",
    initialState: {
        traditionalBid: {
            currentStatus: null,
            isFetching: false,
            error: null
        }
    },
    reducers: {
        traditionalBidStart: (state) => {
            state.traditionalBid.isFetching = true
        },
        traditionalBidSuccess: (state, action) => {
            state.traditionalBid.isFetching = false,
            state.traditionalBid.currentStatus = action.payload
        },
        traditionalBidFailed: (state, action) => {
            state.traditionalBid.isFetching = false,
            state.traditionalBid.error = action.payload
        }
    }
})

export const {
    traditionalBidStart,
    traditionalBidSuccess,
    traditionalBidFailed
} = bidSlice.actions

export default bidSlice.reducer