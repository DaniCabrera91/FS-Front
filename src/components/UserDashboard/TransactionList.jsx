import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getThreeMonthsData } from '../../redux/trans/transSlice'

export default function TransactionList({ limit }) {
  const dispatch = useDispatch()
  const { threeMonthsTransactions } = useSelector((state) => state.trans)

  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni) {
      dispatch(getThreeMonthsData(dni))
    }
  }, [dispatch])

  const displayedTransactions = limit
    ? threeMonthsTransactions.slice(0, limit)
    : threeMonthsTransactions

  return (
    <div className='bg-white rounded-lg p-4'>
      {displayedTransactions.map((transaction, index) => {
        const date = new Date(transaction.createdAt)
        const formattedDate = `${date.getDate()} ${date.toLocaleString(
          'default',
          { month: 'long' },
        )}`

        return (
          <div
            key={index}
            className='flex items-center justify-between py-2 border-b last:border-b-0'
          >
            <div className='flex items-center'>
              <img
                src={transaction.icon}
                alt={transaction.category}
                className='w-8 h-8 mr-3 text-gray-600'
              />
              <div>
                <p className='font-semibold'>{transaction.categoryName}</p>
                <p className='text-xs text-gray-500'>{formattedDate}</p>
              </div>
            </div>
            <span className='font-semibold'>
              {transaction.amount.toFixed(2)}€
            </span>
          </div>
        )
      })}
    </div>
  )
}
