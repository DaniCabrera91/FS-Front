import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  LockFilled,
  UserOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import './TheHeaderLogin.scss'
import logo from '../../assets/logoKutxabank.png'

const TheHeaderLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
        {isUserLoginPage && (
          <LockFilled
            className='header__icon'
            onClick={() => navigate('/admin/login')}
            style={{ cursor: 'pointer' }}
          />
        )}
        {isAdminLoginPage && (
          <UserOutlined
            className='header__icon'
            onClick={() => navigate('/login')}
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
      </div>
    </div>
  )
}

export default TheHeaderLogin
