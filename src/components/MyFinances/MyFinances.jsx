import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTotalBalance, getMonthlyTransactions } from '../../redux/trans/transSlice'

import TheFooter from '../TheFooter/TheFooter'
import Chart from '../Chart/Chart'
import CategoryCard from '../CategoryCard/CategoryCard'

function MyFinances() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { totalBalance, transactions, isLoading, error, monthlyIncome } = useSelector((state) => state.trans)

  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni){
      dispatch(getTotalBalance(dni))
      dispatch(getMonthlyTransactions(dni))
    }
  }, [dispatch])

  return (
    <>
      <div>My Finances: {totalBalance.toFixed(2)}</div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Ingresos y gastos</h2>
        <p className="text-sm text-gray-600 mb-4">
          Consulta, ordena, agrupa y compara tus gastos e ingresos
        </p>

        <Chart />


        <div className="flex border-b mt-4">
          <button className="px-4 py-2 text-red-500 border-b-2 border-red-500">Gastos</button>
          <button className="px-4 py-2 text-gray-600">Ingresos</button>
        </div>

        {/* logica para crear las cartas de gastos mensuales por categoria  */}
        {transactions && transactions.map((category) => (
          Object.keys(category).map((key) => {
            const amount = category[key].transactions.reduce((total, t) => total + t.amount, 0)
           /*  console.log("monthly income" + monthlyIncome)
            console.log("amount" +amount) */
            const percentage = monthlyIncome > 0 ? (Math.abs(amount) / monthlyIncome) * 100 : 0

            return (
              category[key].name !== 'Ingresos' ? (
                <CategoryCard
                  key={key}
                  name={category[key].name}
                  amount={Math.abs(amount).toFixed(2)}
                  percentage={percentage.toFixed()}
                />
              ) : null
            )
          })
        ))
        }

      </div>

        <TheFooter />
    </>
  )
}

export default MyFinances
