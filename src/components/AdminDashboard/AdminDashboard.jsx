import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  createUser,
  getAllUsers,
  updateUser,
  updateTransaction,
  deleteTransaction,
  createTransaction,
} from '../../redux/admin/adminSlice'
import UserForm from '../UserForm/UserForm'
import UsersList from '../UsersList/UsersList'
import TransactionsList from '../TransactionsList/TransactionsList'
import TransactionForm from '../TransactionForm/TransactionForm'
import { Button, Modal, message, Spin, Tabs } from 'antd'
import './AdminDashboard.styled.scss'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, users, transactions } = useSelector(
    (state) => state.admin,
  )
  const [editingUserId, setEditingUserId] = useState(null)
  const [isUserModalVisible, setIsUserModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTransactions, setSelectedTransactions] = useState([])
  const [activeTabKey, setActiveTabKey] = useState('users')
  const [editingTransactionId, setEditingTransactionId] = useState(null)
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false)
  const usersPerPage = 10

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login')
      return
    }
    setIsLoading(true)
    dispatch(getAllUsers({ page: 1, limit: usersPerPage }))
      .unwrap()
      .catch((error) => message.error('Error al cargar los usuarios.'))
      .finally(() => setIsLoading(false))
  }, [navigate, isLoggedIn, dispatch, usersPerPage])

  const handleEditUser = (userId) => {
    setEditingUserId(userId)
    setIsUserModalVisible(true)
  }

  const showUserModal = () => {
    setEditingUserId(null)
    setIsUserModalVisible(true)
  }

  const handleUserModalCancel = () => {
    setIsUserModalVisible(false)
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
      dispatch(getAllUsers({ page: 1, limit: usersPerPage }))
      handleUserModalCancel()
    } catch (error) {
      message.error('Error al guardar el usuario.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserSelect = (transactions) => {
    setSelectedTransactions(transactions)
    setActiveTabKey('transactions')
  }

  const handleEditTransaction = (transactionId) => {
    setEditingTransactionId(transactionId)
    setIsTransactionModalVisible(true)
  }

  const handleTransactionModalCancel = () => {
    setIsTransactionModalVisible(false)
    setEditingTransactionId(null)
  }

  const handleSaveTransaction = async (transactionData) => {
    try {
      const { updatedTransaction } = await dispatch(
        updateTransaction({
          transactionId: editingTransactionId,
          transactionData,
        }),
      ).unwrap()

      message.success('Transacción actualizada con éxito.')

      setSelectedTransactions((prev) =>
        prev.map((trans) =>
          trans._id === editingTransactionId
            ? { ...trans, ...updatedTransaction }
            : trans,
        ),
      )

      handleTransactionModalCancel()
    } catch (error) {
      message.error('Error al guardar la transacción.')
    }
  }

  const handleCreateTransaction = async () => {
    setEditingTransactionId(null)
    setIsTransactionModalVisible(true)
  }

  const handleDeleteTransaction = (transactionId) => {
    Modal.confirm({
      title: '¿Estás seguro de que quieres eliminar esta transacción?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return dispatch(deleteTransaction(transactionId))
          .unwrap()
          .then(() => {
            message.success('Transacción eliminada con éxito.')

            setSelectedTransactions((prev) =>
              prev.filter((trans) => trans._id !== transactionId),
            )
          })
          .catch(() => {
            message.error('Error al eliminar la transacción.')
          })
      },
      onCancel() {},
    })
  }

  const handleSaveNewTransaction = async (transactionData) => {
    try {
      const newTransaction = await dispatch(
        createTransaction(transactionData),
      ).unwrap()
      message.success('Transacción creada con éxito.')

      setSelectedTransactions((prev) => [...prev, newTransaction])
      handleTransactionModalCancel()
    } catch (error) {
      message.error('Error al crear la transacción.')
    }
  }

  const tabItems = [
    {
      key: 'users',
      label: 'Gestión de Usuarios',
      children: (
        <>
          <h2>Gestión de Usuarios</h2>
          <Button type='primary' onClick={showUserModal}>
            Crear Nuevo Usuario
          </Button>

          {isLoading ? (
            <Spin />
          ) : users && users.length > 0 ? (
            <UsersList
              users={users}
              onEditUser={handleEditUser}
              onUserSelect={handleUserSelect}
            />
          ) : (
            <p>No hay usuarios disponibles.</p>
          )}
        </>
      ),
    },
    {
      key: 'transactions',
      label: 'Transacciones',
      children: (
        <>
          <h2>Transacciones del Usuario Seleccionado</h2>
          <Button type='primary' onClick={handleCreateTransaction}>
            Crear Nueva Transacción
          </Button>
          {selectedTransactions.length > 0 ? (
            <TransactionsList
              transactions={selectedTransactions}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          ) : (
            <p>
              No hay transacciones disponibles. Selecciona un usuario para ver
              sus transacciones.
            </p>
          )}
        </>
      ),
    },
  ]

  return (
    <div className='admin-dashboard'>
      <h1>Panel de Control del Administrador</h1>

      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        items={tabItems}
      />

      {/* Modal para editar usuarios */}
      <Modal
        title={editingUserId ? 'Editar Usuario' : 'Crear Usuario'}
        open={isUserModalVisible}
        footer={null}
        onCancel={handleUserModalCancel}
      >
        <UserForm
          userId={editingUserId}
          onSave={handleSaveUser}
          onCancel={handleUserModalCancel}
        />
      </Modal>

      {/* Modal para editar transacciones */}
      <Modal
        title={
          editingTransactionId ? 'Editar Transacción' : 'Crear Transacción'
        }
        open={isTransactionModalVisible}
        footer={null}
        onCancel={handleTransactionModalCancel}
      >
        <TransactionForm
          transactionId={editingTransactionId}
          onSave={
            editingTransactionId
              ? handleSaveTransaction
              : handleSaveNewTransaction
          }
          onCancel={handleTransactionModalCancel}
        />
      </Modal>
    </div>
  )
}

export default AdminDashboard
