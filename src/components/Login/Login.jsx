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
        // navigate('/')
        console.log('Conectado con éxito')
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
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            name='dni'
            value={dni}
            onChange={onChange}
            placeholder='Enter DNI'
            required
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Enter password'
            required
          />
        </div>
        <div>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </div>
        {error && (
          <p>
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
