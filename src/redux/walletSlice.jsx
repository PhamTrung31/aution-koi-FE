import { createSlice } from "@reduxjs/toolkit";


const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        topupWallet: {
            redirectUrl: null,
            isFetching: false,
            error: null,
        },
        currentWallet: {
            isFetching: false,
            data: null,
            error: null,
        }
    },
    reducers: {
        topupWalletStart: (state) => {
            state.topupWallet.isFetching = true
        },
        topupWalletSuccess: (state, action) => {
            state.topupWallet.isFetching = false,
            state.topupWallet.redirectUrl = action.payload
        },
        topupWalletFailed: (state, action) => {
            state.topupWallet.isFetching = false,
            state.topupWallet.error = action.payload
        },
        getUserWalletStart: (state) => {
            state.currentWallet.isFetching = true
        },
        getUserWalletSuccess: (state, action) => {
            state.currentWallet.isFetching = false,
            state.currentWallet.data = action.payload
        },
        getUserWalletFailed: (state, action) => {
            state.currentWallet.isFetching = false,
            state.currentWallet.error = action.payload
        }
    }
});
export const {
    topupWalletStart,
    topupWalletSuccess,
    topupWalletFailed,

    getUserWalletStart,
    getUserWalletSuccess,
    getUserWalletFailed,
} = walletSlice.actions;

export default walletSlice.reducer;