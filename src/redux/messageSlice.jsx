import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice ({
    name: "message",
    initialState: {
        websocketPendingMessage: null,
        pendingTimeLeft: null,
        websocketStartMessage: null,
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
        }
    }
})

export const {
    loadWebsocketPendingMessage,
    loadWebsocketStartMessage,
    countPendingTimeLeft
} = messageSlice.actions

export default messageSlice.reducer