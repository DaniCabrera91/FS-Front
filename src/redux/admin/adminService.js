// redux/admin/adminService.js
import axios from 'axios'

const API_URL = 'http://localhost:3000/admin'

// Métodos de autenticación
const registerAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/register`, adminData)
  return response.data
}

const loginAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/login`, adminData)
  return response.data
}

const logoutAdmin = async () => {
  const token = localStorage.getItem('admin')
    ? JSON.parse(localStorage.getItem('admin')).token
    : null
  if (!token) return

  await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: { Authorization: token }, // Aquí solo usamos el token sin 'Bearer'
    },
  )
  localStorage.removeItem('admin')
}

// Métodos de usuarios
const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem('admin')).token
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: token }, // Usamos el token sin 'Bearer'
  })
  return response.data
}

const createUser = async (userData) => {
  const token = JSON.parse(localStorage.getItem('admin')).token
  const response = await axios.post(`${API_URL}/create-user`, userData, {
    headers: { Authorization: token }, // Usamos el token sin 'Bearer'
  })
  return response.data
}

const deleteUser = async (userId) => {
  const token = JSON.parse(localStorage.getItem('admin')).token
  await axios.delete(`${API_URL}/delete-user/${userId}`, {
    headers: { Authorization: token }, // Usamos el token sin 'Bearer'
  })
}

// Métodos de transacciones
const getAllTransactions = async () => {
  const token = JSON.parse(localStorage.getItem('admin')).token
  const response = await axios.get(`${API_URL}/transactions`, {
    headers: { Authorization: token }, // Usamos el token sin 'Bearer'
  })
  return response.data
}

const createTransaction = async (transactionData) => {
  const token = JSON.parse(localStorage.getItem('admin')).token
  const response = await axios.post(
    `${API_URL}/create-transaction`,
    transactionData,
    {
      headers: { Authorization: token }, // Usamos el token sin 'Bearer'
    },
  )
  return response.data
}

const deleteTransaction = async (transactionId) => {
  const token = JSON.parse(localStorage.getItem('admin')).token
  await axios.delete(`${API_URL}/delete-transaction/${transactionId}`, {
    headers: { Authorization: token }, // Usamos el token sin 'Bearer'
  })
}

// Exportar los servicios
const adminService = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAllUsers,
  createUser,
  deleteUser,
  getAllTransactions,
  createTransaction,
  deleteTransaction,
}

export default adminService
