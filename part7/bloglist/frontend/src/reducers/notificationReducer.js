import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      const message = action.payload
      return state = { message, type: 'success' }
    },
    removeNotification(state, action) {
      return state = { ...initialState }
    },
    addError(state, action) {
      const message = action.payload
      return state = { message, type: 'error' }
    }
  }
})

export const { addNotification, removeNotification, addError } = notificationSlice.actions

export const setNotification = (notification, time, type) => {
  return async dispatch => {
    if (type === 'error') {
      dispatch(addError(notification))
    } else {
      dispatch(addNotification(notification))
    }
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer