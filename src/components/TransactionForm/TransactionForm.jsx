import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './TransactionForm.styled.scss'

const TransactionForm = ({ transactionId, onSave, onCancel }) => {
  const { transactions } = useSelector((state) => state.admin)
  const [transaction, setTransaction] = useState({
    type: '',
    category: '',
    amount: 0,
    createdAt: '',
    userId: '',
  })

  useEffect(() => {
    if (transactionId) {
      const transactionToEdit = transactions.find(
        (t) => t._id === transactionId,
      )
      if (transactionToEdit) setTransaction(transactionToEdit)
    } else {
      setTransaction({
        type: '',
        category: '',
        amount: 0,
        createdAt: '',
        userId: '',
      })
    }
  }, [transactionId, transactions])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTransaction({ ...transaction, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(transaction)
  }

  return (
    <form className='transaction-form-container' onSubmit={handleSubmit}>
      <h3>{transactionId ? 'Editar Transacción' : 'Crear Transacción'}</h3>
      <input
        type='text'
        name='type'
        value={transaction.type}
        onChange={handleChange}
        placeholder='Tipo'
        required
      />
      <input
        type='text'
        name='category'
        value={transaction.category}
        onChange={handleChange}
        placeholder='Categoría'
        required
      />
      <input
        type='number'
        name='amount'
        value={transaction.amount}
        onChange={handleChange}
        placeholder='Cantidad'
        required
      />
      <input
        type='date'
        name='createdAt'
        value={transaction.createdAt.split('T')[0]}
        onChange={handleChange}
        required
      />
      <input
        type='text'
        name='userId'
        value={transaction.userId}
        onChange={handleChange}
        placeholder='ID de Usuario'
        required
      />
      <button type='submit'>{transactionId ? 'Actualizar' : 'Crear'}</button>
      <button type='button' onClick={onCancel}>
        Cancelar
      </button>
    </form>
  )
}

export default TransactionForm
