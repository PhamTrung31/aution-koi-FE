import { createSlice } from "@reduxjs/toolkit";


const transactionSlice = createSlice ({
    name: "transaction",
    initialState: {
        getallTransaction: {
            allTransaction: [],
            isFetching: false,
            error: false
        },
        paymentApproval: {
            paymentApproval: [],
            isFetching: false,
            error: false
        },
        paymentRejected: {
            paymentRejected: [],
            isFetching: false,
            error: false
        },
        requestWithdrawals: {
            requestWithdrawals: [],
            isFetching: false,
            error: false
        },
        pendingWithDrawals: {
            pendingWithDrawals: [],
            isFetching: false,
            error: false
        }
    },

    reducers: {
        getallTransactionStart: (state) => {
            state.getallTransaction.isFetching = true
        },
        getallTransactionSuccess: (state, action) => {
            state.getallTransaction.isFetching = false,
            state.getallTransaction.allTransaction = action.payload
        },
        getallTransactionFailed: (state) => {
            state.getallTransaction.isFetching = false,
            state.getallTransaction.error = true
        },
        paymentApprovalStart: (state) => {
            state.paymentApproval.isFetching = true;
          },
        paymentApprovalSuccess: (state, action) => {
            state.paymentApproval.isFetching = false;
            state.paymentApproval.paymentApproval.push(action.payload);
        },
        paymentApprovalFailed: (state) => {
            state.paymentApproval.isFetching = false;
            state.paymentApproval.error = true;
        },
        paymentRejectedStart: (state) => {
            state.paymentRejected.isFetching = true;
          },
          paymentRejectedSuccess: (state, action) => {
            state.paymentRejected.isFetching = false;
            state.paymentRejected.paymentRejected.push(action.payload);
          },
        paymentRejectedFailed: (state) => {
            state.paymentRejected.isFetching = false;
            state.paymentRejected.error = true;
          },
          requestWithdrawalsStart: (state) => {
            state.requestWithdrawals.isFetching = true;
          },
          requestWithdrawalsSuccess: (state, action) => {
            state.requestWithdrawals.isFetching = false;
            state.requestWithdrawals.requestWithdrawals.push(action.payload);
          },
        requestWithdrawalsFailed: (state) => {
            state.requestWithdrawals.isFetching = false;
            state.requestWithdrawals.error = true;
          },
          pendingWithDrawalsStart: (state) => {
            state.pendingWithDrawals.isFetching = true
        },
        pendingWithDrawalsSuccess: (state, action) => {
            state.pendingWithDrawals.isFetching = false,
            state.pendingWithDrawals.pendingWithDrawals = action.payload
        },
        pendingWithDrawalsFailed: (state) => {
            state.pendingWithDrawals.isFetching = false,
            state.pendingWithDrawals.error = true
        },
    }
})

export const {
    getallTransactionStart,
    getallTransactionSuccess,
    getallTransactionFailed,
    paymentApprovalStart,
    paymentApprovalSuccess,
    paymentApprovalFailed,
    paymentRejectedStart,
    paymentRejectedSuccess,
    paymentRejectedFailed,
    requestWithdrawalsStart,
    requestWithdrawalsSuccess,
    requestWithdrawalsFailed,
    pendingWithDrawalsStart,
    pendingWithDrawalsSuccess,
    pendingWithDrawalsFailed,
} = transactionSlice.actions

export default transactionSlice.reducer