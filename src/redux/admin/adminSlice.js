import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'

export const loginAdmin = createAsyncThunk(
  'admins/login',
  async (adminData, thunkAPI) => {
    try {
      const response = await adminService.loginAdmin(adminData)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const logoutAdmin = createAsyncThunk(
  'admins/logout',
  async (_, thunkAPI) => {
    try {
      await adminService.logoutAdmin()
      return true
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getAllUsers = createAsyncThunk(
  'admins/getAllUsers',
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await adminService.getAllUsers(page, limit)
      return response.users
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const createUser = createAsyncThunk(
  'admins/createUser',
  async (userData, thunkAPI) => {
    try {
      const newUser = await adminService.createUser(userData)
      return newUser
    } catch (error) {
      console.error(
        'Error in createUser thunk:',
        error.response ? error.response.data : error.message,
      )
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const updateUser = createAsyncThunk(
  'admins/updateUser',
  async ({ userId, userData }, thunkAPI) => {
    try {
      const response = await adminService.updateUser(userId, userData)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const deleteUser = createAsyncThunk(
  'admins/deleteUser',
  async (userId, thunkAPI) => {
    try {
      await adminService.deleteUser(userId)
      return userId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getAllTransactions = createAsyncThunk(
  'admins/getAllTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await adminService.getAllTransactions()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const createTransaction = createAsyncThunk(
  'admins/createTransaction',
  async (transactionData, thunkAPI) => {
    try {
      const response = await adminService.createTransaction(transactionData)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const deleteTransaction = createAsyncThunk(
  'admins/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const updatedTransactions = await adminService.deleteTransaction(
        transactionId,
      )
      return updatedTransactions
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    admin: null,
    tokenAdmin: localStorage.getItem('tokenAdmin') || null,
    isLoggedIn: !!localStorage.getItem('tokenAdmin'),
    isLoading: false,
    error: null,
    users: [],
    transactions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.admin = action.payload.admin
        state.tokenAdmin = action.payload.token
        state.isLoggedIn = true
        localStorage.setItem('tokenAdmin', action.payload.token)
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null
        state.tokenAdmin = null
        state.isLoggedIn = false
        localStorage.removeItem('tokenAdmin')
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.updatedUser
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id,
        )
        if (index !== -1) {
          state.users[index] = updatedUser
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload)
      })
  },
})

export default adminSlice.reducer
