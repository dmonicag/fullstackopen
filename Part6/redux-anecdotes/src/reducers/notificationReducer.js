import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    new_notification(state, action) {
      return action.payload
    },
    clear_notification() {
      return null
    }
  }
})

export const showNotification = message => {
  return dispatch => {
    dispatch(new_notification(message))    
    setTimeout(() => {
      dispatch(clear_notification())
    }, 5000)
  }
}

export const { new_notification, clear_notification } = notificationSlice.actions
export default notificationSlice.reducer