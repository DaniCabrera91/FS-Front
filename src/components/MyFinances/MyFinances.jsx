import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTotalBalance, getMonthlyTransactions } from '../../redux/trans/transSlice'

import TheFooter from '../TheFooter/TheFooter'
import Chart from '../Chart/Chart'
import CategoryCardPanel from '../CategoryCard/CategoryCardPanel'

function MyFinances() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { totalBalance, transactions, isLoading, error, monthlyIncome, monthlyExpense } = useSelector((state) => state.trans)
  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni){
      dispatch(getTotalBalance(dni))
      dispatch(getMonthlyTransactions(dni))
    }
  }, [dispatch])

  return (
    <>
      <div className="my-10 text-center " >Mis finanzas</div>

      <div className="bg-white rounded-lg shadow p-4 mb-4 mx-6">
        <h2 className="text-lg font-semibold mb-2">Ingresos y gastos</h2>
        <p className="text-sm text-gray-600 mb-4">
          Consulta, ordena, agrupa y compara tus gastos e ingresos
        </p>

        <Chart />

        <div className="flex justify-between mt-4 text-sm">
          <div>
            <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
            Ingresos
            <span className="ml-2 font-semibold">{monthlyIncome.toFixed()} €</span>
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-gray-600 mr-2"></span>
            Gastos
            <span className="ml-2 font-semibold">{monthlyExpense.toFixed()} €</span>
          </div>
        </div>

        <CategoryCardPanel
           transactions={transactions}
           monthlyIncome={monthlyIncome}
           monthlyExpense={monthlyExpense}
        />

      </div>

      <TheFooter />

    </>
  )
}

export default MyFinances
