import React from 'react' // Importar React es esencial
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
          <Route path='/' element={<Login />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route
            path='/admin/dashboard'
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
