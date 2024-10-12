import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.admin)

  return token ? children : <Navigate to='/admin/login' />
}

export default PrivateRoute
