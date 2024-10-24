import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        changeAvatar: {
            success: null,
            error: null,
            isFetching: false,
        },
    },
    reducers: {
        changeAvatarStart: (state) => {
            state.changeAvatar.isFetching = true
        },
        changeAvatarSuccess: (state, action) => {
            state.changeAvatar.isFetching = false,
            state.changeAvatar.success = action.payload 
        },
        changeAvatarFailed: (state, action) => {
            state.changeAvatar.isFetching = false,
            state.changeAvatar.error = action.payload 
        }
    }
})

export const {
    changeAvatarStart,
    changeAvatarSuccess,
    changeAvatarFailed
} = userSlice.actions

export default userSlice.reducer