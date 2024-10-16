import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import Keyboard from '../Keyboard/Keyboard'
import './Login.styled.scss' // Importamos los estilos para el footer y el botón

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    dni: '',
    password: '',
    rememberDni: false,
  })

  const { dni, password, rememberDni } = formData

  const [hiddenDni, setHiddenDni] = useState('')

  useEffect(() => {
    const savedDni = localStorage.getItem('savedDni')
    if (savedDni) {
      const unmaskedDni = savedDni.replace(/\*/g, '') // Elimina los asteriscos
      setFormData((prevState) => ({
        ...prevState,
        dni: unmaskedDni, // Guardar el DNI completo en el estado
        rememberDni: true, // Si se guardó previamente, marcar la opción
      }))
      // Ocultar parte del DNI, dejando los últimos 4 dígitos visibles
      const maskedDni = '***' + unmaskedDni.slice(-4)
      setHiddenDni(maskedDni) // Guardar la versión oculta del DNI
    }
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = () => {
    const maskedDni = '***' + dni.slice(-4) // Crea la versión oculta del DNI

    if (rememberDni) {
      localStorage.setItem('savedDni', maskedDni) // Guardar el DNI oculto en localStorage
    } else {
      localStorage.removeItem('savedDni') // Eliminar el DNI si no se selecciona "Recordar DNI"
    }

    dispatch(login({ dni, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        localStorage.setItem('token', result.payload.token)
        navigate('/user/dashboard') // Redirigir al dashboard tras el login
      }
    })
  }

  const handleKeyPress = (key) => {
    if (key === 'C') {
      setFormData({ ...formData, password: password.slice(0, -1) }) // Borrar el último carácter de la contraseña
    } else if (key === 'OK') {
      onSubmit() // Llama a la función de envío cuando se presione "OK"
    } else {
      setFormData({ ...formData, password: password + key }) // Añadir el carácter presionado a la contraseña
    }
  }

  return (
    <div className='login-container'>
      <h1>¡Hola de nuevo!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit() // Enviar el formulario al presionar "Enter" si se usa teclado físico
        }}
      >
        <div className='form-group'>
          <label htmlFor='dni'>DNI</label>
          <input
            type='text'
            id='dni'
            name='dni'
            value={hiddenDni || dni} // Mostrar el DNI oculto si está disponible
            onChange={onChange}
            placeholder='Introduce tu DNI'
            required
            inputMode='numeric'
            autoComplete='username'
            readOnly={hiddenDni} // Evitar que el usuario cambie el DNI si está oculto
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
          <label>
            <input
              type='checkbox'
              name='rememberDni'
              checked={rememberDni}
              onChange={(e) =>
                setFormData({ ...formData, rememberDni: e.target.checked })
              }
            />
            Recordar DNI
          </label>
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
      <Keyboard onKeyPress={handleKeyPress} />
      <footer className='submit-footer'>
        <button
          className='submit-button'
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Enviar'}
        </button>
      </footer>
    </div>
  )
}

export default Login
