import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import Home from './components/UserDashboard/UserDashboard'
import Login from './components/Login/Login'
import AdminLogin from './components/adminLogin/adminLogin'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import TheHeader from './components/TheHeader/TheHeader'
import TheHeaderLogin from './components/TheHeaderLogin/TheHeaderLogin'
import './App.scss'
import MyFinances from './components/MyFinances/MyFinances'

const HeaderSelector = () => {
  const location = useLocation()

  const isLoginPage =
    location.pathname === '/login' || location.pathname === '/admin/login'

  return isLoginPage ? <TheHeaderLogin /> : <TheHeader />
}

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <HeaderSelector />

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
          <Route
            path='/user/finances'
            element={
              <PrivateRoute type='user'>
                <MyFinances/>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
