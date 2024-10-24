import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transService from './transService'

export const getAllTransactions = createAsyncThunk(
  'transactions/getAllTransactions',
  async (dni, thunkAPI) => {
    try {
      const response = await transService.getAllTransactions(dni)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getAllTransactionsByCategory = createAsyncThunk(
  'transactions/getAllTransactionsByCategory',
  async ({ dni, category }, thunkAPI) => {
    try {
      const response = await transService.getAllTransactionsByCategory(
        dni,
        category,
      )
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getMonthlyTransactions = createAsyncThunk(
  'transactions/getMonthlyTransactions',
  async (dni, thunkAPI) => {
    try {
      const response = await transService.getMonthlyTransactions(dni)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getThreeMonthsData = createAsyncThunk(
  'transactions/getThreeMonthsData',
  async (dni, thunkAPI) => {
    try {
      const response = await transService.getThreeMonthsData(dni)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getTotalBalance = createAsyncThunk(
  'transactions/getTotalBalance',
  async ({ dni, initialBalance }, thunkAPI) => {
    try {
      const response = await transService.getTotalBalance(dni, initialBalance)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const getLastFiveMonthsData = createAsyncThunk(
  'transactions/getLastFiveMonthsData',
  async (dni, thunkAPI) => {
    try {
      const response = await transService.getLastFiveMonthsData(dni)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const transSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    transactionsPerCategory: [],
    threeMonthsTransactions: [],
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    totalAnnualExpense: 0,
    lastFiveMonthsData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetState: () => initialState,
  },
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
      .addCase(getThreeMonthsData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getThreeMonthsData.fulfilled, (state, action) => {
        state.isLoading = false
        state.threeMonthsTransactions = action.payload.transactions
      })
      .addCase(getThreeMonthsData.rejected, (state, action) => {
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
      .addCase(getAllTransactionsByCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllTransactionsByCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactionsPerCategory = action.payload.transactions
        state.totalAnnualExpense = action.payload.totalAnnualExpense
      })
      .addCase(getAllTransactionsByCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default transSlice.reducer
