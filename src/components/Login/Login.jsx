import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, token } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    dni: '',
    password: '',
  })

  const { dni, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ dni, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        console.log('Conectado con éxito')
        // navigate('/')
      }
    })
  }

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000

      if (payload.exp < now) {
        dispatch(logout())
      }
    }
  }, [token, dispatch])

  return (
    <div className='login-container'>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='dni'>DNI</label>
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
        <div className='form-group'>
          <label htmlFor='password'>Contraseña</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Introduce tu contraseña'
            required
            autoComplete='current-password'
          />
          {error && error.field === 'password' && (
            <p className='error'>{error.message}</p>
          )}
        </div>
        <div className='form-group'>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </div>
        {error && !error.field && (
          <p className='error'>
            {error.message ===
            'Token expirado, por favor inicia sesión de nuevo'
              ? 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
              : error.message}
          </p>
        )}
      </form>
    </div>
  )
}

export default Login
