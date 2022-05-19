import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: JSON.parse(localStorage.getItem('user')),
    },
    reducers: {
        setUser: (state, user) => {
            state.value = user.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
