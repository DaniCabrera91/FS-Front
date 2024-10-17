import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BellOutlined, MenuOutlined, LogoutOutlined } from '@ant-design/icons'
import { logout } from '../../redux/user/userSlice'
import { logoutAdmin } from '../../redux/admin/adminSlice'
import './TheHeader.scss'
import logo from '../../assets/logoKutxabank.png'

const TheHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { isLoggedIn, tokenAdmin } = useSelector((state) => state.admin)

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

  return (
    <div className='header'>
      <div className='header__left'>
        <img src={logo} alt='logo' className='header__logo' />
      </div>
      <div className='header__right'>
        {user || isLoggedIn ? (
          <>
            <BellOutlined className='header__icon' aria-label='Notifications' />
            <MenuOutlined className='header__icon' aria-label='Menu' />
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
