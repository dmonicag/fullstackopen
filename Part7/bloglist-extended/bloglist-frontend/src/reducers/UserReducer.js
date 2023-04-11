import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './NotificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser (state, action){
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if(userJSON){
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (loginObject) => {
  return async dispatch => {
    try{
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(notify(`Welcome ${user.username}!`, 'success' ))
    }
    catch(exception){
      dispatch(notify('wrong username or password', 'error'))
    }
  }
}

export default userSlice.reducer