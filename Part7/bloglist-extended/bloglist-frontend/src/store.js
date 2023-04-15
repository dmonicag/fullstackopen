import { configureStore } from '@reduxjs/toolkit'
import BlogReducer from './reducers/BlogReducer'
import LoginReducer from './reducers/LoginReducer'
import notificationReducer from './reducers/NotificationReducer'
import UsersReducer from './reducers/UsersReducer'

const store = configureStore({
  reducer: {
    blogs: BlogReducer,
    notification: notificationReducer,
    loggedUser: LoginReducer,
    users: UsersReducer
  }
})

export default store
