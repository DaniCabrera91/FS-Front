// src/App.js
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/UserDashboard/UserDashboard'
import Login from './components/Login/Login'
import AdminLogin from './components/adminLogin/adminLogin'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import './App.scss'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Navigate
                to={
                  localStorage.getItem('token') ? '/user/dashboard' : '/login'
                }
              />
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/login' element={<AdminLogin />} />

          {/* Ruta privada para el dashboard de admin */}
          <Route
            path='/admin/dashboard'
            element={
              <PrivateRoute type='admin'>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Ruta privada para el dashboard de usuario */}
          <Route
            path='/user/dashboard'
            element={
              <PrivateRoute type='user'>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
