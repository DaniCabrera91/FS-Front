import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  BellOutlined,
  MenuOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import './TheHeader.scss'

const TheHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const onLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/login')
  }

  //aqui se muestran separados los elementos

  //   return (
  //     <div className='header'>
  //       <div className='header__left'>
  //         <HomeOutlined className='header__icon' />
  //       </div>
  //       <div className='header__right'>
  //         <BellOutlined className='header__icon' />
  //         <MenuOutlined className='header__icon' />
  //       </div>
  //     </div>
  //   )

  //aqui se ven juntos en el login abría que revisarlo y sustituir elementos
  return (
    <div className='header'>
      {user ? (
        <>
          <div className='header__left'>
            <HomeOutlined className='header__icon' />
          </div>
          <div className='header__right'>
            <BellOutlined className='header__icon' />
            <MoreOutlined className='header__icon' />
          </div>
        </>
      ) : (
        <>
          <div className='header__left'>
            <HomeOutlined className='header__icon' />
          </div>
          <div className='header__right'>
            <QuestionCircleOutlined className='header__icon' />
          </div>
        </>
      )}
    </div>
  )
}

export default TheHeader
