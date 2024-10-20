import React from 'react'
import { Table, Button } from 'antd'
import './TransactionsList.styled.scss'

const TransactionsList = ({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  const columns = [
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Importe',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => {
        const amountFormatted =
          typeof amount === 'number' ? amount.toFixed(2) : '0.00'
        return amountFormatted
      },
    },
    {
      title: 'Fecha',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            onClick={() => onEditTransaction(record._id)}
            size='small'
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>
          <Button
            onClick={() => onDeleteTransaction(record._id)}
            size='small'
            danger
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Table
      className='tableContainer'
      columns={columns}
      dataSource={transactions.map((transaction) => ({
        ...transaction,
        key: transaction._id,
      }))}
      rowKey='_id'
      pagination={{ pageSize: 5 }}
    />
  )
}

export default TransactionsList
