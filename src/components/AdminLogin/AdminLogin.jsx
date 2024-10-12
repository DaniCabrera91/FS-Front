import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin, logoutAdmin } from '../../redux/admin/adminSlice'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, token } = useSelector((state) => state.admin)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const onSubmit = (e) => {
    e.preventDefault()

    console.log('Form submitted with:', formData) // Agregar log para el formulario

    if (!isEmailValid(email)) {
      alert('Por favor, introduce un email válido')
      return
    }

    dispatch(loginAdmin({ email, password }))
      .then((result) => {
        console.log('Login result:', result) // Log para verificar el resultado del login
        if (result.meta.requestStatus === 'fulfilled') {
          console.log('Admin conectado con éxito')
          navigate('/admin/dashboard')
        } else {
          console.log('Error en el login:', result)
        }
      })
      .catch((err) => console.error('Error during login:', err)) // Catch en caso de error
  }

  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard')
    }
  }, [token, navigate])

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000

      if (payload.exp < now) {
        dispatch(logoutAdmin())
      }
    }
  }, [token, dispatch])

  return (
    <div className='admin-login-container'>
      <h1>Iniciar Sesión como Administrador</h1>
      <form onSubmit={onSubmit}>
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
          />
        </div>
        <div className='form-group'>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </div>
        {error && (
          <p className='error'>
            {error.message || 'Credenciales incorrectas. Inténtalo de nuevo.'}
          </p>
        )}
      </form>
    </div>
  )
}

export default AdminLogin
