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
import TheFooter from './components/TheFooter/TheFooter' // Importar el Footer
import './App.scss'
import MyFinances from './components/MyFinances/MyFinances'
import CategoryDetail from './components/CategoryDetail/CategoryDetail'

const HeaderSelector = () => {
  const location = useLocation()

  const isLoginPage =
    location.pathname === '/login' || location.pathname === '/admin/login'

  return isLoginPage ? <TheHeaderLogin /> : <TheHeader />
}

const FooterSelector = () => {
  const location = useLocation()

  const isLoginPage =
    location.pathname === '/login' || location.pathname === '/admin/login'

  const isAdminDashboard = location.pathname === '/admin/dashboard'

  // Mostrar el Footer solo si no es página de login ni el AdminDashboard
  return !isLoginPage && !isAdminDashboard ? <TheFooter /> : null
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
                <MyFinances />
              </PrivateRoute>
            }
          />
          <Route
            path='/category/:name'
            element={
              <PrivateRoute type='user'>
                <CategoryDetail />
              </PrivateRoute>
            }
          />
        </Routes>
        <FooterSelector />
      </BrowserRouter>
    </div>
  )
}

export default App
