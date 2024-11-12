import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice ({
    name: "message",
    initialState: {
        websocketPendingMessage: null,
        pendingTimeLeft: null,
        websocketStartMessage: null,
        startTimeLeft: null,
    },
    reducers: {
        loadWebsocketPendingMessage: (state, action) => {
            state.websocketPendingMessage = action.payload
        },
        loadWebsocketStartMessage: (state, action) => {
            state.websocketStartMessage = action.payload
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
    countPendingTimeLeft,
    countStartTimeLeft
} = messageSlice.actions

export default messageSlice.reducer