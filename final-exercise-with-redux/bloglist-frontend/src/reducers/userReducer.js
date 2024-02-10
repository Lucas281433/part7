import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const userLogin = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogListAppUser', JSON.stringify(userLogin))
      blogsService.setToken(userLogin.token)
      dispatch(setUser(userLogin))
    } catch (error) {
      dispatch(setNotification('Wrong Username or Password', 5))
    }
  }
}

export default userSlice.reducer
