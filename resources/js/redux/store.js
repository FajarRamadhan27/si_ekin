import userReducer from './reducers/userSlice'
import tableReducer from './reducers/TableSlice'
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({
    reducer: {
        user: userReducer,
        table: tableReducer
    }
})
