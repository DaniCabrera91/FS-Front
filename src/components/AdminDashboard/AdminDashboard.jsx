import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAllUsers,
  logoutAdmin,
  deleteUser,
} from '../../redux/admin/adminSlice'
import UserForm from '../UserForm/UserForm'
import UsersList from '../UsersList/UsersList'
const AdminDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, users, isLoggedIn } = useSelector(
    (state) => state.admin,
  )

  const [editingUserId, setEditingUserId] = useState(null)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login')
      return
    }

    // Cargar usuarios al inicio
    if (users.length === 0) {
      dispatch(getAllUsers())
    }
  }, [dispatch, navigate, users.length, isLoggedIn])

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)) // Esto actualizará automáticamente la lista de usuarios
  }

  const handleEditUser = (userId) => {
    setEditingUserId(userId)
  }

  return (
    <div className='admin-dashboard'>
      <h1>Panel de Control del Administrador</h1>
      {error && <p className='error'>{error}</p>}
      {isLoading ? ( // Mostrar un indicador de carga
        <p>Cargando usuarios...</p>
      ) : (
        <>
          <h2>Gestión de Usuarios</h2>
          <UserForm
            userId={editingUserId}
            onSave={() => setEditingUserId(null)}
          />
          <UsersList
            users={users}
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditUser}
          />
        </>
      )}
    </div>
  )
}

export default AdminDashboard
