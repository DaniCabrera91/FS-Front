import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transService from './transService'

// Obtener todas las transacciones por dni
export const getAllTransactions = createAsyncThunk(
  'transactions/getAllTransactions',
  async (dni, thunkAPI) => {
    try {
      const response = await transService.getAllTransactions(dni)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Obtiene las transacciones del mes actual por dni
// añadir posibilidad de pasar month y year
export const getMonthlyTransactions = createAsyncThunk(
  'transactions/getMonthlyTransactions',
  async (dni, thunkAPI) => {
    try {
      const response = await transService.getMonthlyTransactions(dni)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Obtener el balance total por dni
export const getTotalBalance = createAsyncThunk(
  'transactions/getTotalBalance',
  async (dni, thunkAPI) => {
    try {
      const response = await transService.getTotalBalance(dni)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Obtiene los ingresos y gastos del mes actual y los 4 anteriores
// Se usa en chart
export const getLastFiveMonthsData = createAsyncThunk(
  'transactions/getLastFiveMonthsData',
  async (dni, thunkAPI) => {
    try {
      const response = await transService.getLastFiveMonthsData(dni)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const transSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    lastFiveMonthsData: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllTransactions.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getAllTransactions.fulfilled, (state, action) => {
      state.isLoading = false
      state.transactions = action.payload.categories
    })
    .addCase(getAllTransactions.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    .addCase(getTotalBalance.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getTotalBalance.fulfilled, (state, action) => {
      state.isLoading = false
      state.totalBalance = action.payload
    })
    .addCase(getTotalBalance.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    .addCase(getMonthlyTransactions.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getMonthlyTransactions.fulfilled, (state, action) => {
      state.isLoading = false
      state.transactions = action.payload.transactions 
      state.monthlyIncome = action.payload.monthlyIncome 
      state.monthlyExpense = action.payload.monthlyExpense 
    })
    .addCase(getMonthlyTransactions.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    .addCase(getLastFiveMonthsData.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getLastFiveMonthsData.fulfilled, (state, action) => {
      state.isLoading = false
      state.lastFiveMonthsData = action.payload
    })
    .addCase(getLastFiveMonthsData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export default transSlice.reducer