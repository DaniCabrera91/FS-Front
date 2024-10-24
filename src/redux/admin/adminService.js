import axios from 'axios'

const API_URL = 'http://localhost:3000/admins'

const registerAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/register`, adminData)
  return response.data
}

const loginAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/login`, adminData)
  if (response.status === 200) {
    localStorage.setItem('tokenAdmin', response.data.token)
    return response.data
  }
  throw new Error('Login failed')
}

const logoutAdmin = async () => {
  const token = localStorage.getItem('tokenAdmin')
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  )
  localStorage.removeItem('tokenAdmin')
  localStorage.removeItem('admin')
  return response.data
}

const getAllUsers = async () => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: tokenAdmin },
  })
  return response.data
}

const getUserByDni = async (dni) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  const response = await axios.get(`${API_URL}/user-by-dni/${dni}`, {
    headers: { Authorization: tokenAdmin },
  })
  return response.data
}

const createUser = async (userData) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  try {
    const response = await axios.post(`${API_URL}/create-user`, userData, {
      headers: { Authorization: tokenAdmin },
    })
    return response.data
  } catch (error) {
    console.error(
      'Error creating user:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}

const updateUser = async (userId, userData) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  const response = await axios.put(
    `${API_URL}/update-user/${userId}`,
    userData,
    {
      headers: { Authorization: tokenAdmin },
    },
  )
  return response.data
}

const deleteUser = async (userId) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  await axios.delete(`${API_URL}/delete-user/${userId}`, {
    headers: { Authorization: tokenAdmin },
  })
  return getAllUsers()
}

const getAllTransactions = async () => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  const response = await axios.get(`${API_URL}/transactions`, {
    headers: { Authorization: tokenAdmin },
  })
  return response.data
}

const createTransaction = async (transactionData) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  const response = await axios.post(
    `${API_URL}/create-transaction`,
    transactionData,
    {
      headers: { Authorization: tokenAdmin },
    },
  )
  return getAllTransactions()
}

const updateTransaction = async (transactionId, transactionData) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  const response = await axios.put(
    `${API_URL}/update-transaction/${transactionId}`,
    transactionData,
    {
      headers: { Authorization: tokenAdmin },
    },
  )
  return response.data
}

const deleteTransaction = async (transactionId) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin')
  await axios.delete(`${API_URL}/delete-transaction/${transactionId}`, {
    headers: { Authorization: tokenAdmin },
  })
  return getAllTransactions()
}

const adminService = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAllUsers,
  getUserByDni,
  createUser,
  updateUser,
  deleteUser,
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}

export default adminService
