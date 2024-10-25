import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice ({
    name: "auction",
    initialState: {
        joinAuction: {
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
        }
    }
})

export const {
    joinAuctionInitial,
    joinAuctionStart,
    joinAuctionSuccess,
    joinAuctionFailed
} = auctionSlice.actions

export default auctionSlice.reducer