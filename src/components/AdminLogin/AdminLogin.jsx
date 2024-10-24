import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from '../../redux/admin/adminSlice'
import { useNavigate } from 'react-router-dom'
import Keyboard from '../Keyboard/Keyboard'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import './AdminLogin.styled.scss'

const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.admin)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData
  const [passwordVisible, setPasswordVisible] = useState(false)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = () => {
    dispatch(loginAdmin({ email, password }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          localStorage.setItem('admin', JSON.stringify(result.payload))
          navigate('/admin/dashboard')
        } else {
          console.error('Error en el login:', result.error)
          alert(result.error.message || 'Error en el inicio de sesión')
        }
      })
      .catch((err) => {
        console.error('Error durante el inicio de sesión:', err)
      })
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      navigate('/admin/dashboard')
    }
  }, [navigate])

  const handleKeyPress = (key) => {
    if (key === 'C') {
      setFormData((prev) => ({ ...prev, password: prev.password.slice(0, -1) }))
    } else {
      setFormData((prev) => ({ ...prev, password: prev.password + key }))
    }
  }

  return (
    <div className='admin-login-container'>
      <h1>Iniciar Sesión como Administrador</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Introduce tu email'
            required
          />
        </div>

        {/* Contenedor con el input y el icono */}
        <div className='form-group password-field'>
          <label htmlFor='password'>Contraseña</label>
          <div className='input-group'>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Clave'
              required
            />
            <span
              className='eye-icon'
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
        </div>

        {error && (
          <p className='error'>
            {error.message || 'Credenciales incorrectas. Inténtalo de nuevo.'}
          </p>
        )}
      </form>

      <Keyboard onKeyPress={handleKeyPress} />

      <footer className='submit-footer'>
        <button
          className='submit-button'
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Acceder'}
        </button>
      </footer>
    </div>
  )
}

export default AdminLogin
