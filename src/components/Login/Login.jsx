import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import Keyboard from '../Keyboard/Keyboard'
import './Login.styled.scss'
import fingerPrint from '../../assets/fingerPrint.png'

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
      const unmaskedDni = savedDni.replace(/\*/g, '')
      setFormData((prevState) => ({
        ...prevState,
        dni: unmaskedDni,
        rememberDni: true,
      }))
      const maskedDni = '***' + unmaskedDni.slice(-4)
      setHiddenDni(maskedDni)
    }
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // La función onSubmit no recibe el evento
  const onSubmit = () => {
    // Asegúrate de que el DNI y la contraseña sean válidos
    console.log('Intentando iniciar sesión con:', { dni, password })

    if (!dni || !password) {
      alert('DNI y contraseña son requeridos')
      return
    }

    dispatch(login({ dni, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        localStorage.setItem('token', result.payload.token)
        navigate('/user/dashboard')

        //prueba para probar metodos más facil
        localStorage.setItem('dni', dni); 


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
      // Añade el carácter a la contraseña
      setFormData((prev) => ({ ...prev, password: prev.password + key }))
    }
  }

  return (
    <div className='login-container'>
      <h1>¡Hola de nuevo!</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {' '}
        {/* Previene el comportamiento por defecto */}
        <div className='form-group'>
          <input
            type='text'
            id='dni'
            name='dni'
            value={hiddenDni || dni}
            onChange={onChange}
            placeholder='Introduce tu DNI'
            required
            inputMode='numeric'
            autoComplete='username'
            readOnly={hiddenDni} // Mantén el campo DNI solo lectura si está oculto
          />
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
          {error && error.field === 'dni' && (
            <p className='error'>{error.message}</p>
          )}
        </div>
        <div className='form-group'>
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
        <Keyboard onKeyPress={handleKeyPress} />{' '}
        {/* El teclado solo afecta al campo de contraseña */}
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
          type='button' // Cambiamos a 'button' para evitar el comportamiento por defecto del formulario
          className='submit-button'
          onClick={onSubmit} // Llama a la función onSubmit directamente
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
