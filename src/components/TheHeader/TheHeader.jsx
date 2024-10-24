import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BellOutlined, LeftOutlined, LogoutOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/user/userSlice'
import { logoutAdmin } from '../../redux/admin/adminSlice'
import NotificationsModal from '../NotificationsModal/NotificationsModal'
import './TheHeader.scss'
import logo from '../../assets/logoKutxabank.png'

const TheHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { isLoggedIn, tokenAdmin } = useSelector((state) => state.admin)
  const notifications = useSelector((state) => state.notifications) || []

  const [isModalVisible, setIsModalVisible] = useState(false)

  const onLogout = async (e) => {
    e.preventDefault()
    const isAdminDashboard = window.location.pathname.includes('/admin')

    try {
      if (isAdminDashboard && isLoggedIn && tokenAdmin) {
        await dispatch(logoutAdmin()).unwrap()
        navigate('/admin/login')
      } else if (user) {
        await dispatch(logout()).unwrap()
        navigate('/login')
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // Comprobar si estamos en una ruta donde queremos mostrar la flecha "Atrás"
  const isSpecialPage =
    location.pathname !== '/admin/dashboard' &&
    location.pathname !== '/user/dashboard'

  // Comprobar si estamos en la vista de usuario
  const isUserView = location.pathname.includes('/user')

  return (
    <div className='header'>
      <div className='header__left'>
        {isSpecialPage ? (
          <LeftOutlined
            className='header__back-arrow'
            onClick={() => navigate(-1)}
            style={{ fontSize: '24px', cursor: 'pointer' }}
          />
        ) : (
          <img
            src={logo}
            alt='logo'
            className='header__logo'
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      <div className='header__right'>
        {user || isLoggedIn ? (
          <>
            {/* Ícono de campana que abre el modal */}
            {isUserView && (
              <NotificationsModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                notifications={notifications}
              />
            )}
            <LogoutOutlined
              className='header__icon'
              onClick={onLogout}
              aria-label='Logout'
            />
          </>
        ) : (
          <span>No estás autenticado</span>
        )}
      </div>
    </div>
  )
}

export default TheHeader
