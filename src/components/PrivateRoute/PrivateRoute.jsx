// src/components/PrivateRoute/PrivateRoute.js
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, type }) => {
  const userToken = localStorage.getItem('token') // Token de usuario
  const adminToken = localStorage.getItem('admin') // Token de admin

  // Verificar si el usuario está logueado según el tipo
  if (type === 'admin' && !adminToken) {
    return <Navigate to='/admin/login' />
  }
  if (type === 'user' && !userToken) {
    return <Navigate to='/login' />
  }

  return children
}

export default PrivateRoute
