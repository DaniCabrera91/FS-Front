import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from '../../redux/admin/adminSlice'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.admin)

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

    if (!isEmailValid(email)) {
      alert('Por favor, introduce un email válido')
      return
    }

    // Limpiar localStorage antes de iniciar sesión
    localStorage.removeItem('token')
    localStorage.removeItem('admin')

    dispatch(loginAdmin({ email, password }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          console.log('Admin conectado con éxito')
          localStorage.setItem('token', result.payload.token)
          localStorage.setItem('admin', JSON.stringify(result.payload))
          navigate('/admin/dashboard')
        } else {
          console.error('Error en el login:', result.error)
          alert(result.error.message || 'Error en el inicio de sesión')
        }
      })
      .catch((err) => {
        console.error('Error durante el inicio de sesión:', err)
        // Limpiar localStorage si hay error en el inicio de sesión
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
      })
  }

  // Efecto para redirigir si ya hay un token
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      navigate('/admin/dashboard')
    }
  }, [navigate]) // Dependencia correcta

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
