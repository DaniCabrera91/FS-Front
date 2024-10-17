import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, type }) => {
  const userToken = localStorage.getItem('token')
  const adminToken = localStorage.getItem('admin')

  if (type === 'admin' && !adminToken) {
    return <Navigate to='/admin/login' />
  }
  if (type === 'user' && !userToken) {
    return <Navigate to='/login' />
  }

  return children
}

export default PrivateRoute
