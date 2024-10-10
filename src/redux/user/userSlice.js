import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

// Crear una acción asíncrona para el login
export const login = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const response = await userService.login(userData)
      return response // Devuelve la respuesta para que sea manejada en el reducer
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
      localStorage.removeItem('token')
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
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
