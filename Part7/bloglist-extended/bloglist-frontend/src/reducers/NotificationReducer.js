import { createSlice } from '@reduxjs/toolkit'

const initialState = ({})

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set_notification: (state, action) => {
      return ({ message: action.payload.message, type: action.payload.type })
    },
    clear_notification(){
      return initialState
    },
  }
})

export const notify = (message, type) => {
  return dispatch => {
    dispatch(set_notification({ message, type }))
    setTimeout(() => {
      dispatch(clear_notification())
    }, 5000)
  }
}

export const { set_notification, clear_notification } = notificationSlice.actions
export default notificationSlice.reducer