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

export const getUserByDni = createAsyncThunk(
  'admins/getUserByDni', // Corrige el prefijo para que sea 'admins'
  async (dni, { rejectWithValue }) => {
    try {
      const response = await adminService.getUserByDni(dni)
      return response
    } catch (error) {
      console.error('Error al obtener las transacciones:', error) // Log de error
      return rejectWithValue(error.response ? error.response.data : error)
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

export const updateTransaction = createAsyncThunk(
  'admins/updateTransaction',
  async ({ transactionId, transactionData }, thunkAPI) => {
    try {
      const response = await adminService.updateTransaction(
        transactionId,
        transactionData,
      )
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
      await adminService.deleteTransaction(transactionId)
      return transactionId // Devuelve el ID de la transacción eliminada
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
    currentUser: null,
    user: null,
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
      .addCase(getUserByDni.fulfilled, (state, action) => {
        state.currentUser = action.payload.user // Almacena el usuario en el estado
        state.transactions = action.payload.transactions // Almacena las transacciones
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
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload // Almacena todas las transacciones en el estado
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload) // Añade la nueva transacción
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const updatedTransaction = action.payload // Asegúrate de que aquí esté la transacción actualizada
        const index = state.transactions.findIndex(
          (transaction) => transaction._id === updatedTransaction._id,
        )
        if (index !== -1) {
          state.transactions[index] = updatedTransaction
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload,
        )
      })
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true // Muestra un estado de carga cuando se está obteniendo transacciones
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false // Para cuando la carga de transacciones falla
        state.error = action.payload // Guarda el error
      })
  },
})

export default adminSlice.reducer
