import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getTotalBalance,
  getMonthlyTransactions,
} from '../../redux/trans/transSlice'
import {
  getUserData,
} from '../../redux/user/userSlice'

import Chart from '../Chart/Chart'
import CategoryCardPanel from '../CategoryCard/CategoryCardPanel'

function MyFinances() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    totalBalance,
    transactions,
    isLoading,
    error,
    monthlyIncome,
    monthlyExpense,
  } = useSelector((state) => state.trans)
  const {
    initialBalance,
  } = useSelector((state) => state.user)

  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni) {
      dispatch(getUserData(dni)) 
      .unwrap()
      .then(() => {
        dispatch(getTotalBalance({ dni, initialBalance }))
        dispatch(getMonthlyTransactions(dni))
      })
    }
  }, [dispatch])

  return (
    <>
      <div className='my-10 text-center text-lg font-semibold'>Mis finanzas</div>

      <div className='bg-white rounded-lg shadow p-4 mb-16 mx-6'>
        <h2 className=' font-semibold mb-2'>Ingresos y gastos</h2>
        <p className='text-sm text-gray-600 mb-4'>
          Consulta, ordena, agrupa y compara tus gastos e ingresos
        </p>

        <Chart />

        <div className='flex flex-col mt-4 text-sm'>
          <div className='mb-2'>
            <span className='inline-block w-3 h-3 bg-red-500 mr-2'></span>
            Ingresos
            <span className='ml-2 font-semibold'>
              {monthlyIncome.toFixed()} €
            </span>
          </div>
          <div>
            <span className='inline-block w-3 h-3 bg-gray-600 mr-2'></span>
            Gastos
            <span className='ml-2 font-semibold'>
              {monthlyExpense.toFixed()} €
            </span>
          </div>
        </div>

        <CategoryCardPanel
          transactions={transactions}
          monthlyIncome={monthlyIncome}
          monthlyExpense={monthlyExpense}
        />
      </div>
    </>
  )
}

export default MyFinances
