import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

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
      localStorage.removeItem('user')
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
        console.log(action.payload.user._id),
          localStorage.setItem('user', JSON.stringify(userInfo)) // Guardar el objeto en localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
