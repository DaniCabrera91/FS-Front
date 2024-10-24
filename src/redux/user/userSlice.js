import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialUser = JSON.parse(localStorage.getItem('user')) || null
const initialToken = localStorage.getItem('token') || null

const initialState = {
  user: initialUser,
  token: initialToken,
  initialBalance: null,
  iban: null,
  isLoggedIn: !!initialToken,
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const response = await userService.login(userData)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await userService.logout()
    return
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (dni, thunkAPI) => {
    try {
      const response = await userService.getUserData(dni)

      return {
        initialBalance: response.assets,
        iban: response.iban,
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.user = action.payload.user
        state.token = action.payload.token

        const userInfo = {
          token: action.payload.token,
          user: {
            id: action.payload.user._id,
            name: action.payload.user.name,
            surname: action.payload.user.surname,
          },
        }
        localStorage.setItem('user', JSON.stringify(userInfo))
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isLoggedIn = false

        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('dni')
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false
        state.initialBalance = action.payload.initialBalance
        state.iban = action.payload.iban
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { resetState } = userSlice.actions
export default userSlice.reducer
