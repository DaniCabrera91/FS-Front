import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCategoryDetails } from '../../redux/trans/transSlice'

const CategoryDetail = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const { categoryDetails, isLoading, error } = useSelector(
    (state) => state.trans,
  )

  useEffect(() => {
    if (name) {
      dispatch(getCategoryDetails(name))
    }
  }, [dispatch, name])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!categoryDetails || !categoryDetails.transactions) {
    return <div>No hay detalles disponibles para esta categoría.</div>
  }

  return (
    <div className='bg-white rounded-lg shadow p-4 mb-4 mx-6'>
      <h2 className='text-lg font-semibold mb-2'>{categoryDetails.category}</h2>
      <p className='text-sm text-gray-600 mb-4'>
        {categoryDetails.percentageExpense} del gasto total mensual
      </p>
      <p className='text-sm text-gray-600 mb-4'>
        Total de gastos: {categoryDetails.totalExpense}€
      </p>
      <p className='text-sm text-gray-600 mb-4'>
        Total de ingresos: {categoryDetails.totalIncome}€
      </p>
      <div className='mt-4'>
        {categoryDetails.transactions.map((transaction) => (
          <div key={transaction._id} className='border-b py-2'>
            <p className='text-sm text-gray-600'>
              {transaction.type}: {transaction.amount}€ -{' '}
              {new Date(transaction.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryDetail
