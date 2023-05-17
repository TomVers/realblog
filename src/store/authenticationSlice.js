import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiBase } from '../config/api'

export const registerUser = createAsyncThunk('auth/registerUser', async function (userData) {
  try {
    const response = await axios.post(`${apiBase}users/`, userData)
    localStorage.setItem('token', response.data.user.token)
    localStorage.setItem('data', JSON.stringify(response.data))
    return response.data
  } catch (error) {
    throw new Error('Registration error')
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async function (userData) {
  try {
    const response = await axios.post(`${apiBase}users/login`, userData)
    localStorage.setItem('token', response.data.user.token)
    localStorage.setItem('data', JSON.stringify(response.data))
    localStorage.setItem('profileImage', JSON.stringify(response.data.user.image))
    return response.data
  } catch (error) {
    throw new Error('Login error')
  }
})

export const updateUser = createAsyncThunk('auth/updateUser', async function (userData) {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.put(`${apiBase}user`, userData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    localStorage.setItem('data', JSON.stringify(response.data))
    localStorage.setItem('profileImage', JSON.stringify(response.data.user.image))
    return response.data
  } catch (error) {
    throw new Error('Update user error')
  }
})

const storedData = localStorage.getItem('data')

const authenticationSlice = createSlice({
  name: 'auth',
  initialState: {
    status: '',
    error: null,
    data: storedData ? JSON.parse(storedData) : null,
  },
  reducers: {
    logout(state) {
      state.data = null
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.data = action.payload
    },
    [registerUser.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      state.data = null
    },
    [loginUser.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.data = action.payload
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      state.data = null
    },
    [updateUser.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.data = action.payload
    },
    [updateUser.rejected]: (state) => {
      state.status = 'rejected'
      state.data = null
    },
  },
})

export const { logout } = authenticationSlice.actions

export default authenticationSlice.reducer
