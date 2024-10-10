import React, { useState } from 'react' // Asegúrate de importar React
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/user/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.user)

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
    dispatch(login({ dni, password }))
  }

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
        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}

export default Login
