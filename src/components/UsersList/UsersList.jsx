import React, { useEffect, useState } from 'react'
import { Table, Button, Empty, Spin, message, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllUsers,
  deleteUser,
  getUserByDni,
} from '../../redux/admin/adminSlice'
import UserSearch from '../UserSearch/UserSearch'

const UsersList = ({ onEditUser, onUserSelect }) => {
  const dispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state) => state.admin)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    dispatch(getAllUsers({ page: currentPage, limit: pageSize }))
  }, [dispatch, currentPage, pageSize])

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  const handleDeleteUser = (userId) => {
    Modal.confirm({
      title: '¿Estás seguro de que quieres eliminar este usuario?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return dispatch(deleteUser(userId))
          .unwrap()
          .then(() => {
            message.success('Usuario eliminado con éxito.')
            dispatch(getAllUsers({ page: currentPage, limit: pageSize }))
          })
          .catch(() => {
            message.error('Error al eliminar el usuario.')
          })
      },
      onCancel() {},
    })
  }

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const handleSearch = (searchTerm) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.dni.includes(searchTerm),
    )
    setFilteredUsers(filtered)
  }

  const handleUserSelect = async (record) => {
    try {
      const { transactions } = await dispatch(getUserByDni(record.dni)).unwrap()
      onUserSelect(transactions)
    } catch (error) {
      message.error('Error al cargar las transacciones.')
      console.error('Error al cargar transacciones:', error)
    }
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span
          onClick={() => handleUserSelect(record)}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Apellido',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEditUser(record._id)}
            size='small'
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record._id)}
            size='small'
            danger
          />
        </>
      ),
    },
  ]

  if (isLoading) return <Spin tip='Cargando usuarios...' />
  if (error) return <p>Error al cargar los usuarios.</p>

  return (
    <div>
      <UserSearch onSearch={handleSearch} />
      <Table
        columns={columns}
        dataSource={filteredUsers.map((user) => ({ ...user, key: user._id }))}
        rowKey='_id'
        pagination={{ pageSize: 10, onChange: handleTableChange }}
        locale={{
          emptyText: <Empty description='No se encontraron usuarios.' />,
        }}
      />
    </div>
  )
}

export default UsersList
