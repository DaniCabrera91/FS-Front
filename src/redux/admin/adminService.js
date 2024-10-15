import axios from 'axios'

const API_URL = 'http://localhost:3000/admins'

// Registrar un nuevo administrador
const registerAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/register`, adminData)
  return response.data
}

// Iniciar sesión como administrador
const loginAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/login`, adminData)
  if (response.status === 200) {
    localStorage.setItem('token', response.data.token) // Guardar el token
    return response.data
  } else {
    throw new Error('Login failed')
  }
}

// Cerrar sesión como administrador
const logoutAdmin = async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: { Authorization: token }, // Usar el token sin "Bearer"
    },
  )
  localStorage.removeItem('admin') // Limpiar la información del admin
  localStorage.removeItem('token') // Limpiar el token
}

const getAllUsers = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: token }, // Usar el token directamente
  })
  return response.data
}

const createUser = async (userData) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${API_URL}/create-user`, userData, {
    headers: { Authorization: token }, // Usar el token sin "Bearer"
  })
  return getAllUsers() // Obtener todos los usuarios después de crear uno
}

const updateUser = async (userId, userData) => {
  const token = localStorage.getItem('token')
  const response = await axios.put(
    `${API_URL}/update-user/${userId}`,
    userData,
    {
      headers: { Authorization: token }, // Usar el token sin "Bearer"
    },
  )
  return response.data
}

const deleteUser = async (userId) => {
  const token = localStorage.getItem('token')
  await axios.delete(`${API_URL}/delete-user/${userId}`, {
    headers: { Authorization: token }, // Usar el token sin "Bearer"
  })
  return getAllUsers() // Obtener todos los usuarios después de eliminar uno
}

// Obtener todas las transacciones
const getAllTransactions = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/transactions`, {
    headers: { Authorization: token }, // Usar el token sin "Bearer"
  })
  return response.data
}

// Crear una nueva transacción
const createTransaction = async (transactionData) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${API_URL}/create-transaction`,
    transactionData,
    {
      headers: { Authorization: token }, // Usar el token sin "Bearer"
    },
  )
  return getAllTransactions() // Obtener todas las transacciones después de crear una
}

// Eliminar una transacción
const deleteTransaction = async (transactionId) => {
  const token = localStorage.getItem('token')
  await axios.delete(`${API_URL}/delete-transaction/${transactionId}`, {
    headers: { Authorization: token }, // Usar el token sin "Bearer"
  })
  return getAllTransactions() // Obtener todas las transacciones después de eliminar una
}

// Exportar los servicios
const adminService = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllTransactions,
  createTransaction,
  deleteTransaction,
}

export default adminService
