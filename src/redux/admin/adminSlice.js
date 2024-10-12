// redux/admin/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (adminData, thunkAPI) => {
    try {
      const response = await adminLoginService(adminData)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const logoutAdmin = createAsyncThunk(
  'admin/logout',
  async (_, thunkAPI) => {
    try {
      await adminLogoutService()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await adminService.getAllUsers()
      return response // Suponiendo que tu servicio retorna la lista de usuarios
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (userData, thunkAPI) => {
    try {
      const response = await adminService.createUser(userData)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, thunkAPI) => {
    try {
      await adminService.deleteUser(userId)
      return userId // Devolver el ID del usuario eliminado para actualizar el estado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

// Acciones para transacciones
export const getAllTransactions = createAsyncThunk(
  'admin/getAllTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await adminService.getAllTransactions()
      return response // Suponiendo que tu servicio retorna la lista de transacciones
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const createTransaction = createAsyncThunk(
  'admin/createTransaction',
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
  'admin/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      await adminService.deleteTransaction(transactionId)
      return transactionId // Devolver el ID de la transacción eliminada para actualizar el estado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    users: [],
    transactions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducers para el login, logout, etc.
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.admin = action.payload.admin
        state.token = action.payload.token

        const adminInfo = {
          token: action.payload.token,
          admin: {
            id: action.payload.admin._id,
            name: action.payload.admin.name,
          },
        }
        localStorage.setItem('admin', JSON.stringify(adminInfo))
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
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload) // Agregar nuevo usuario
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload) // Eliminar usuario
      })
      // Reducers para transacciones
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactions = action.payload // Actualizar la lista de transacciones
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload) // Agregar nueva transacción
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload,
        ) // Eliminar transacción
      })
  },
})

export default adminSlice.reducer
