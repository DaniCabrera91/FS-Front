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
import { Button, Modal, message } from 'antd' // Importar Modal
import './AdminDashboard.styled.scss'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, users, isLoggedIn } = useSelector(
    (state) => state.admin,
  )

  const [editingUserId, setEditingUserId] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login')
      return
    }

    if (users.length === 0) {
      dispatch(getAllUsers())
    }
  }, [dispatch, navigate, users.length, isLoggedIn])

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
      .unwrap() // Usar unwrap para manejar el resultado directamente
      .then(() => {
        message.success('Usuario eliminado con éxito.')
      })
      .catch(() => {
        message.error('Error al eliminar el usuario.')
      })
  }

  const handleEditUser = (userId) => {
    setEditingUserId(userId)
    setIsModalVisible(true) // Abrir el modal al editar un usuario
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingUserId(null)
  }

  return (
    <div className='admin-dashboard'>
      <h1>Panel de Control del Administrador</h1>
      {error && <p className='error'>{error}</p>}
      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <>
          <h2>Gestión de Usuarios</h2>
          <Button type='primary' onClick={showModal}>
            Crear Nuevo Usuario
          </Button>
          <UsersList
            users={users}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
          <Modal
            title={editingUserId ? 'Editar Usuario' : 'Crear Usuario'}
            open={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <UserForm
              userId={editingUserId}
              onSave={handleCancel} // Resetea el estado de edición y cierra el modal
            />
          </Modal>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
