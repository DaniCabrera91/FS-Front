import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'

// Login Admin
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

// Logout Admin
export const logoutAdmin = createAsyncThunk(
  'admins/logout',
  async (_, thunkAPI) => {
    try {
      await adminService.logoutAdmin()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

// Get All Users
export const getAllUsers = createAsyncThunk(
  'admins/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await adminService.getAllUsers()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

// Create User
// Create User
export const createUser = createAsyncThunk(
  'admins/createUser',
  async (userData, thunkAPI) => {
    try {
      const response = await adminService.createUser(userData)
      return response // Debe devolver el usuario creado
    } catch (error) {
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

// Delete User
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, thunkAPI) => {
    try {
      await adminService.deleteUser(userId) // Solo elimina el usuario
      return userId // Devuelve el ID del usuario eliminado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

// Transactions Thunks
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
    token: null,
    isLoggedIn: !!localStorage.getItem('token'), // Verifica el token en el inicio
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
        state.admin = action.payload
        state.token = action.payload.token
        state.isLoggedIn = true // Cambiar el estado a logueado
        localStorage.setItem('token', action.payload.token) // Guardar el token
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null
        state.token = null
        state.isLoggedIn = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload) // Asegúrate de agregar el nuevo usuario al estado
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.updatedUser
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id,
        )
        if (index !== -1) {
          state.users[index] = updatedUser // Actualiza el usuario en el estado
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload) // Elimina el usuario de la lista
      })
  },
})

export const {} = adminSlice.actions
export default adminSlice.reducer
