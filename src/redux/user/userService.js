import axios from 'axios'

const API_URL = 'http://localhost:3000/users'

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)
  localStorage.setItem('token', response.data.token)
  return response.data
}

const getUserData = async (dni) => {
  const response = await axios.post(`${API_URL}/getUserData`, { dni })
  return response.data
}

const logout = async () => {
  const token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).token
    : null
  if (!token) return

  await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: { Authorization: token },
    },
  )
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('dni')
}

const userService = {
  login,
  getUserData,
  logout,
}

export default userService
