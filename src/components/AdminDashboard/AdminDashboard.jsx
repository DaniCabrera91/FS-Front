// src/components/AdminDashboard/AdminDashboard.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, deleteUser } from '../../redux/admin/adminSlice'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getAllUsers()) // Obtener todos los usuarios al montar el componente
  }, [dispatch])

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)) // Eliminar usuario
  }

  return (
    <div className='admin-dashboard'>
      <h1>Panel de Control del Administrador</h1>
      {error && <p className='error'>{error}</p>}
      <h2>Usuarios</h2>
      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
              <button onClick={() => handleDeleteUser(user._id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AdminDashboard
