import { configureStore } from '@reduxjs/toolkit'
import BlogReducer from './reducers/BlogReducer'
import UserReducer from './reducers/UserReducer'
import notificationReducer from './reducers/NotificationReducer'

const store = configureStore({
  reducer: {
    blogs: BlogReducer,
    notification: notificationReducer,
    user: UserReducer
  }
})

export default store
