import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './UserForm.styled.scss'

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

  useEffect(() => {
    if (userId) {
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
      {Object.keys(user).map((key) => (
        <input
          key={key}
          type={
            key === 'password'
              ? 'password'
              : key === 'birth_date'
              ? 'date'
              : 'text'
          }
          name={key}
          value={user[key]}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          required
        />
      ))}
      <button type='submit'>{userId ? 'Actualizar' : 'Crear'}</button>
    </form>
  )
}

export default UserForm
