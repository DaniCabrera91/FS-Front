import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import Keyboard from '../Keyboard/Keyboard'
import './Login.styled.scss'
import fingerPrint from '../../assets/fingerPrint.png'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    dni: '',
    password: '',
  })

  const { dni, password } = formData
  const [passwordVisible, setPasswordVisible] = useState(false)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = () => {
    if (!dni || !password) {
      alert('DNI y contraseña son requeridos')
      return
    }

    dispatch(login({ dni, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/user/dashboard')
        localStorage.setItem('dni', dni)
      } else {
        console.error('Error en el login:', result.error)
        alert(result.error.message || 'Error en el inicio de sesión')
      }
    })
  }

  const handleKeyPress = (key) => {
    if (key === 'C') {
      setFormData((prev) => ({ ...prev, password: prev.password.slice(0, -1) }))
    } else {
      setFormData((prev) => ({ ...prev, password: prev.password + key }))
    }
  }

  return (
    <div className='login-container'>
      <h1>¡Hola de nuevo!</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='form-group'>
          <input
            type='text'
            id='dni'
            name='dni'
            value={dni}
            onChange={onChange}
            placeholder='Introduce tu DNI'
            required
            inputMode='numeric'
            autoComplete='username'
          />
          {error && error.field === 'dni' && (
            <p className='error'>{error.message}</p>
          )}
        </div>

        {/* Contenedor con el input y el icono */}
        <div className='form-group password-field'>
          <div className='input-group'>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Introduce tu contraseña'
              required
              autoComplete='current-password'
            />
            <span
              className='eye-icon'
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          </div>
          {error && error.field === 'password' && (
            <p className='error'>{error.message}</p>
          )}
        </div>
        <Keyboard onKeyPress={handleKeyPress} />
        {error && !error.field && (
          <p className='error'>
            {error.message ===
            'Token expirado, por favor inicia sesión de nuevo'
              ? 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
              : error.message}
          </p>
        )}
      </form>
      <footer className='submit-footer'>
        <button
          type='button'
          className='submit-button'
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Acceder'}
        </button>
      </footer>
      <div className='biometric-login' onClick={() => {}}>
        <img src={fingerPrint} alt='huella' className='biometric-icon' />
        <p>Acceder con biometría</p>
      </div>
    </div>
  )
}

export default Login
