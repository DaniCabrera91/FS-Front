import React, { useEffect, useState } from 'react'
import { Table, Button, Empty, Spin, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, deleteUser } from '../../redux/admin/adminSlice'

const UsersList = ({ onEditUser }) => {
  const dispatch = useDispatch()
  const { users, isLoading, error, totalUsers } = useSelector(
    (state) => state.admin,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    dispatch(getAllUsers({ page: currentPage, limit: pageSize }))
  }, [dispatch, currentPage, pageSize])

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
      .unwrap()
      .then(() => {
        message.success('Usuario eliminado con éxito.')
        dispatch(getAllUsers({ page: currentPage, limit: pageSize }))
      })
      .catch(() => {
        message.error('Error al eliminar el usuario.')
      })
  }

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
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

  return (
    <div>
      <h3>Lista de Usuarios</h3>
      {error && <p className='error'>{error}</p>}
      {users && users.length > 0 ? (
        <Table
          dataSource={users}
          columns={columns}
          rowKey='_id'
          pagination={{
            current: currentPage,
            pageSize,
            total: totalUsers, // Aquí se usa totalUsers en lugar de users.length
          }}
          onChange={handleTableChange}
        />
      ) : (
        <Empty description='No hay usuarios disponibles.' />
      )}
    </div>
  )
}

export default UsersList
