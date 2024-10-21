import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

// Inicializamos el estado desde localStorage si existe
const initialUser = JSON.parse(localStorage.getItem('user')) || null
const initialToken = localStorage.getItem('token') || null

const initialState = {
  user: initialUser, // Inicializa con el usuario de localStorage si está disponible
  token: initialToken, // Inicializa con el token de localStorage si está disponible
  initialBalance: null,
  iban: null,
  isLoggedIn: !!initialToken, // Establece el estado de autenticación basado en la existencia del token
  isLoading: false,
  error: null,
}

// Login del usuario
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

// Logout del usuario
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
      console.log(response)

      return {
        initialBalance: response.assets,
        iban: response.iban, 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Acción para reiniciar el estado cuando el usuario hace logout
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
      // Estado cuando la acción de login está pendiente
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      // Estado cuando el login es exitoso
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.user = action.payload.user
        state.token = action.payload.token

        // Guardar la información de usuario y token en localStorage
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
      // Estado cuando el login falla
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Estado cuando el logout es exitoso
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isLoggedIn = false

        // Eliminar el usuario y el token de localStorage
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
