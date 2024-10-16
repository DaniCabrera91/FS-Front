import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/UserDashboard/UserDashboard'
import Login from './components/Login/Login'
import AdminLogin from './components/adminLogin/adminLogin'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import TheHeader from './components/TheHeader/TheHeader'
import './App.scss'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <TheHeader />
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

          <Route
            path='/admin/dashboard'
            element={
              <PrivateRoute type='admin'>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

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
