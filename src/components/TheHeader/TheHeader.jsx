import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  BellOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  LockFilled,
  UserOutlined, // Icono de usuario para volver al login de usuario
} from '@ant-design/icons'
import './TheHeader.scss'
import logo from '../../assets/logoKutxabank.png'
import { logout } from '../../redux/user/userSlice'

const TheHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation() // Obtener la ubicación actual
  const { user } = useSelector((state) => state.user)

  const onLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/login')
  }

  // Verificar si estamos en la página de login de admin o de usuario
  const isAdminLoginPage = location.pathname === '/admin/login'
  const isUserLoginPage = location.pathname === '/login'

  return (
    <div className='header'>
      <div className='header__left'>
        <Link to='/'>
          <img src={logo} alt='logo' className='header__logo' />
        </Link>
      </div>
      <div className='header__right'>
        {user ? (
          <>
            <BellOutlined className='header__icon' />
            <MenuOutlined className='header__icon' />
          </>
        ) : (
          <>
            {isUserLoginPage && ( // Mostrar el icono de candado en la página de login de usuario
              <LockFilled
                className='header__icon'
                onClick={() => navigate('/admin/login')} // Navegar al login de admin
                style={{ cursor: 'pointer' }}
              />
            )}
            {isAdminLoginPage && ( // Mostrar el icono de usuario en la página de login de admin
              <UserOutlined
                className='header__icon'
                onClick={() => navigate('/login')} // Navegar al login de usuario
                style={{ cursor: 'pointer' }}
              />
            )}
            <a
              href='https://portal.kutxabank.es/cs/Satellite/kb/es/politica-de-cookies/generico'
              target='_blank'
              rel='noopener noreferrer'
              className='header__icon'
            >
              <QuestionCircleOutlined />
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default TheHeader
