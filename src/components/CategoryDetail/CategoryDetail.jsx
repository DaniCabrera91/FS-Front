import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllTransactionsByCategory } from '../../redux/trans/transSlice'

const CategoryDetail = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const { transactionsPerCategory, isLoading, error } = useSelector((state) => state.trans)

  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni && name) {
      dispatch(getAllTransactionsByCategory({dni, category: name}))
    }
  }, [dispatch, name])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  console.log("transactionsPerCategory:", JSON.stringify(transactionsPerCategory, null, 2))

  if (!transactionsPerCategory || !transactionsPerCategory.length === 0) {
    return <div>No hay detalles disponibles para esta categoría.</div>
  }

  return (
    <>
        <div className="bg-white rounded-lg p-4">
            {transactionsPerCategory.map((transaction, index) => {
                const date = new Date(transaction.createdAt)
                const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`

                return (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center">
                    <img src={transaction.icon} alt={transaction.category} className="w-8 h-8 mr-3 text-gray-600" />
                    <div>
                        <p className="font-semibold">{transaction.categoryName}</p>
                        <p className="text-xs text-gray-500">{formattedDate}</p>
                    </div>
                    </div>
                    <span className="font-semibold">{transaction.amount.toFixed(2)}€</span>
                </div>
                )
            })}
            </div>
    </>
  )
}

export default CategoryDetail
