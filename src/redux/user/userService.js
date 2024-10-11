import axios from 'axios'

const API_URL = 'http://localhost:3000/users'

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)
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
}

const userService = {
  login,
  logout,
}

export default userService
