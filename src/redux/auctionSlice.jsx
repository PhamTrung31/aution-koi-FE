import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice ({
    name: "auction",
    initialState: {
        joinAuction: {
            currentStatus: null,
            isFetching: false,
            error: null
        },
        getAuction: {
            allAuctions: [],
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

        getAuctionStart: (state) => {
            state.getAuction.isFetching = true;
          },
          getAuctionSuccess: (state, action) => {
            state.getAuction.isFetching = false;
            state.getAuction.allAuctions = action.payload;
          },
          getAuctionFailed: (state) => {
            state.getAuction.isFetching = false;
            state.getAuction.error = true;
          },
    }
})

export const {
    joinAuctionInitial,
    joinAuctionStart,
    joinAuctionSuccess,
    joinAuctionFailed,
    getAuctionStart,
    getAuctionSuccess,
    getAuctionFailed
} = auctionSlice.actions

export default auctionSlice.reducer