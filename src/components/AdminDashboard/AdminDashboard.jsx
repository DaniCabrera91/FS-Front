import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAllUsers,
  logoutAdmin,
  deleteUser,
} from '../../redux/admin/adminSlice'
import UserForm from '../UserForm/UserForm'
import UsersList from '../UserList/UserList'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, users, isLoggedIn } = useSelector(
    (state) => state.admin,
  )

  const [editingUserId, setEditingUserId] = useState(null)

  useEffect(() => {
    // Si el admin no está logueado, redirigir a la página de login
    if (!isLoggedIn) {
      console.log('El administrador no está logueado, redirigiendo a login...')
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      dispatch(logoutAdmin())
      navigate('/admin/login')
      return
    }

    // Si hay un token y no se han cargado usuarios o transacciones, cargar los datos
    if (users.length === 0) {
      console.log('Obteniendo usuarios...')
      dispatch(getAllUsers())
    }
  }, [dispatch, navigate, users.length, isLoggedIn])

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
  }

  // Función para establecer el usuario en modo de edición
  const handleEditUser = (userId) => {
    setEditingUserId(userId) // Establece el ID del usuario a editar
  }

  return (
    <div className='admin-dashboard'>
      <h1>Panel de Control del Administrador</h1>
      {error && <p className='error'>{error}</p>}
      <h2>Gestión de Usuarios</h2>
      <UserForm userId={editingUserId} onSave={() => setEditingUserId(null)} />
      <UsersList
        users={users}
        onDeleteUser={handleDeleteUser}
        onEditUser={handleEditUser}
      />
      {isLoading && <p>Cargando...</p>}
    </div>
  )
}

export default AdminDashboard
