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
        },
        joinValidate: {
            currentStatus: null,
            isFetching: false,
            error: null
        },
        pastAuction: {
            pastAuctions: [],
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
        },
        getPastAuctionStart: (state) => {
            state.pastAuction.isFetching = true;
        },
        getPastAuctionSuccess: (state, action) => {
            state.pastAuction.isFetching = false;
            state.pastAuction.pastAuctions = action.payload;
        },
        getPastAuctionFailed: (state, action) => {
            state.pastAuction.isFetching = false;
            state.pastAuction.error = action.payload;
        },
        clearErrors: (state) => {
            state.pastAuction.error = null;
        }
    }
})

export const {
    joinAuctionInitial,
    joinAuctionStart,
    joinAuctionSuccess,
    joinAuctionFailed,
    getAuctionStart,
    getAuctionSuccess,
    getAuctionFailed,
    joinValidateStart,
    joinValidateSuccess,
    joinValidateFailed,
    getPastAuctionStart,
    getPastAuctionSuccess,
    getPastAuctionFailed,
    clearErrors
} = auctionSlice.actions

export default auctionSlice.reducer