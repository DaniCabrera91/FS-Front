import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createUser,
  updateUser,
  getAllUsers,
} from '../../redux/admin/adminSlice'
import './UserForm.styled.scss' // Importa el archivo de estilos

const UserForm = ({ userId, onSave }) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.admin.users)

  const [user, setUser] = useState({
    profile: '',
    name: '',
    surname: '',
    birth_date: '',
    dni: '',
    email: '',
    password: '',
    city: '',
    iban: '',
    assets: 0,
  })

  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (userId) {
      setIsEditMode(true)
      const userToEdit = users.find((u) => u._id === userId)
      if (userToEdit) {
        setUser(userToEdit)
      }
    } else {
      setUser({
        profile: '',
        name: '',
        surname: '',
        birth_date: '',
        dni: '',
        email: '',
        password: '',
        city: '',
        iban: '',
        assets: 0,
      })
      setIsEditMode(false)
    }
  }, [userId, users])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditMode) {
      dispatch(updateUser({ userId: user._id, userData: user }))
    } else {
      dispatch(createUser(user)).then(() => {
        // Después de crear el usuario, vuelve a cargar la lista de usuarios
        dispatch(getAllUsers())
      })
    }
    onSave() // Resetea el estado de edición
  }

  return (
    <form className='user-form-container' onSubmit={handleSubmit}>
      <h3>{isEditMode ? 'Editar Usuario' : 'Crear Usuario'}</h3>
      <input
        type='text'
        name='profile'
        value={user.profile}
        onChange={handleChange}
        placeholder='Perfil'
        required
      />
      <input
        type='text'
        name='name'
        value={user.name}
        onChange={handleChange}
        placeholder='Nombre'
        required
      />
      <input
        type='text'
        name='surname'
        value={user.surname}
        onChange={handleChange}
        placeholder='Apellido'
        required
      />
      <input
        type='date'
        name='birth_date'
        value={user.birth_date}
        onChange={handleChange}
        required
      />
      <input
        type='text'
        name='dni'
        value={user.dni}
        onChange={handleChange}
        placeholder='DNI'
        required
      />
      <input
        type='email'
        name='email'
        value={user.email}
        onChange={handleChange}
        placeholder='Correo Electrónico'
        required
      />
      <input
        type='password'
        name='password'
        value={user.password}
        onChange={handleChange}
        placeholder='Contraseña'
        required
      />
      <input
        type='text'
        name='city'
        value={user.city}
        onChange={handleChange}
        placeholder='Ciudad'
        required
      />
      <input
        type='text'
        name='iban'
        value={user.iban}
        onChange={handleChange}
        placeholder='IBAN'
        required
      />
      <input
        type='number'
        name='assets'
        value={user.assets}
        onChange={handleChange}
        placeholder='Activos'
        required
      />
      <button type='submit'>{isEditMode ? 'Actualizar' : 'Crear'}</button>
    </form>
  )
}

export default UserForm
