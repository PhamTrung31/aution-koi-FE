import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice ({
    name: "message",
    initialState: {
        websocketPendingMessage: null,
        pendingTimeLeft: null,
        websocketStartMessage: null,
        startTimeLeft: null,
        websocketCannotStartMessage: null,
        websocketPlaceBidMessage: null,
        websocketEndMessage: null,
    },
    reducers: {
        loadWebsocketPendingMessage: (state, action) => {
            state.websocketPendingMessage = action.payload
        },
        loadWebsocketStartMessage: (state, action) => {
            state.websocketStartMessage = action.payload
        },
        loadWebsocketCannotStartMessage: (state, action) => {
            state.websocketCannotStartMessage = action.payload
        },
        loadWebsocketPlaceBidMessage: (state, action) => {
            state.websocketPlaceBidMessage = action.payload
        },
        loadWebsocketEndMessage: (state, action) => {
            state.websocketEndMessage = action.payload
        },
        countPendingTimeLeft: (state, action) => {
            state.pendingTimeLeft = action.payload
        },
        countStartTimeLeft: (state, action) => {
            state.startTimeLeft = action.payload
        },
    }
})

export const {
    loadWebsocketPendingMessage,
    loadWebsocketStartMessage,
    loadWebsocketCannotStartMessage,
    loadWebsocketPlaceBidMessage,
    loadWebsocketEndMessage,
    countPendingTimeLeft,
    countStartTimeLeft
} = messageSlice.actions

export default messageSlice.reducer