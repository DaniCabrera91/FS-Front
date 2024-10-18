import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  createUser,
  getAllUsers,
  updateUser,
} from '../../redux/admin/adminSlice'
import UserForm from '../UserForm/UserForm'
import UsersList from '../UsersList/UsersList'
import { Button, Modal, message, Spin } from 'antd'
import './AdminDashboard.styled.scss'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, users } = useSelector((state) => state.admin)
  const [editingUserId, setEditingUserId] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const usersPerPage = 10 // Definir un límite como constante

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login')
      return
    }
    setIsLoading(true)
    dispatch(getAllUsers({ page: 1, limit: usersPerPage })) // Usar la constante
      .unwrap()
      .catch((error) => message.error('Error al cargar los usuarios.'))
      .finally(() => setIsLoading(false))
  }, [navigate, isLoggedIn, dispatch, usersPerPage])

  const handleEditUser = (userId) => {
    setEditingUserId(userId)
    setIsModalVisible(true)
  }

  const showModal = () => {
    setEditingUserId(null)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingUserId(null)
  }

  const handleSaveUser = async (userData) => {
    try {
      setIsLoading(true)
      if (editingUserId) {
        await dispatch(updateUser({ userId: editingUserId, userData })).unwrap()
        message.success('Usuario actualizado con éxito.')
      } else {
        await dispatch(createUser(userData)).unwrap()
        message.success('Usuario creado con éxito.')
      }

      handleCancel()
      await dispatch(getAllUsers({ page: 1, limit: usersPerPage })) // Usar la constante aquí también
    } catch (error) {
      message.error('Error al guardar el usuario.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='admin-dashboard'>
      <h1>Panel de Control del Administrador</h1>
      <h2>Gestión de Usuarios</h2>
      <Button type='primary' onClick={showModal}>
        Crear Nuevo Usuario
      </Button>
      {isLoading ? (
        <Spin />
      ) : users && users.length > 0 ? (
        <UsersList users={users} onEditUser={handleEditUser} />
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
      <Modal
        title={editingUserId ? 'Editar Usuario' : 'Crear Usuario'}
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <UserForm userId={editingUserId} onSave={handleSaveUser} />
      </Modal>
    </div>
  )
}

export default AdminDashboard
