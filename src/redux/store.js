import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import adminReducer from './admin/adminSlice'
import transReducer from './trans/transSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    trans: transReducer,
  },
})
