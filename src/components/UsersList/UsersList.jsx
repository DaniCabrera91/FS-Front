import React from 'react'
import { Table, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const UsersList = ({ users, onDeleteUser, onEditUser }) => {
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
            onClick={() => onDeleteUser(record._id)}
            size='small'
            danger
          />
        </>
      ),
    },
  ]

  return (
    <div>
      <h3>Lista de Usuarios</h3>
      <Table
        dataSource={users}
        columns={columns}
        rowKey='_id' // Asegúrate de que este sea el identificador correcto de los usuarios
      />
    </div>
  )
}

export default UsersList
