import userReducer from './reducers/userSlice'
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({
    reducer: {
        user: userReducer
    }
})
