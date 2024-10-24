import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './UserForm.styled.scss'

const UserForm = ({ userId, onSave }) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.admin.users)

  const [user, setUser] = useState({
    name: '',
    surname: '',
    birth_date: '',
    dni: '',
    email: '',
    city: '',
  })

  useEffect(() => {
    if (userId) {
      const userToEdit = users.find((u) => u._id === userId)
      if (userToEdit) {
        setUser({
          name: userToEdit.name,
          surname: userToEdit.surname,
          birth_date: userToEdit.birth_date
            ? new Date(userToEdit.birth_date).toISOString().substring(0, 10)
            : '',
          dni: userToEdit.dni,
          email: userToEdit.email,
          city: userToEdit.city,
        })
      }
    } else {
      setUser({
        name: '',
        surname: '',
        birth_date: '',
        dni: '',
        email: '',
        city: '',
      })
    }
  }, [userId, users])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSave(user)
  }

  return (
    <form className='user-form-container' onSubmit={handleSubmit}>
      <h3>{userId ? 'Editar Usuario' : 'Crear Usuario'}</h3>

      <div>
        <label>Nombre:</label>
        <input
          type='text'
          name='name'
          value={user.name || ''}
          onChange={handleChange}
          placeholder='Nombre'
          required
        />
      </div>

      <div>
        <label>Apellido:</label>
        <input
          type='text'
          name='surname'
          value={user.surname || ''}
          onChange={handleChange}
          placeholder='Apellido'
          required
        />
      </div>

      <div>
        <label>Fecha de Nacimiento:</label>
        <input
          type='date'
          name='birth_date'
          value={user.birth_date || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>DNI:</label>
        <input
          type='text'
          name='dni'
          value={user.dni || ''}
          onChange={handleChange}
          placeholder='DNI'
          required
        />
      </div>

      <div>
        <label>Correo Electrónico:</label>
        <input
          type='email'
          name='email'
          value={user.email || ''}
          onChange={handleChange}
          placeholder='Correo Electrónico'
          required
        />
      </div>

      <div>
        <label>Ciudad:</label>
        <input
          type='text'
          name='city'
          value={user.city || ''}
          onChange={handleChange}
          placeholder='Ciudad'
          required
        />
      </div>

      <button type='submit'>{userId ? 'Actualizar' : 'Crear'}</button>
    </form>
  )
}

export default UserForm
