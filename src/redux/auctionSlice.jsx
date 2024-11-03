import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice ({
    name: "auction",
    initialState: {
        joinAuction: {
            currentStatus: null,
            isFetching: false,
            error: null
        },
        joinValidate: {
            currentStatus: null,
            isFetching: false,
            error: null
        }
    },
    reducers: {
        joinAuctionInitial: (state) => {
            state.joinAuction.isFetching = false,
            state.joinAuction.currentStatus = null,
            state.joinAuction.error = null      
        },
        joinAuctionStart: (state) => {
            state.joinAuction.isFetching = true
        },
        joinAuctionSuccess: (state, action) => {
            state.joinAuction.isFetching = false,
            state.joinAuction.currentStatus = action.payload
        },
        joinAuctionFailed: (state, action) => {
            state.joinAuction.isFetching = false,
            state.joinAuction.error = action.payload
        },
        joinValidateStart: (state) => {
            state.joinValidate.isFetching = true
        },
        joinValidateSuccess: (state, action) => {
            state.joinValidate.isFetching = false,
            state.joinValidate.currentStatus = action.payload
        },
        joinValidateFailed: (state, action) => {
            state.joinValidate.isFetching = false,
            state.joinValidate.error = action.payload
        }
    }
})

export const {
    joinAuctionInitial,
    joinAuctionStart,
    joinAuctionSuccess,
    joinAuctionFailed,

    joinValidateStart,
    joinValidateSuccess,
    joinValidateFailed
} = auctionSlice.actions

export default auctionSlice.reducer