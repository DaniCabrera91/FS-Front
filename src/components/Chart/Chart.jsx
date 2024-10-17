import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getLastFiveMonthsData } from '../../redux/trans/transSlice'

function Chart() {
  const dispatch = useDispatch()

  const { lastFiveMonthsData, isLoading, error } = useSelector((state) => state.trans)

  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni) {
      dispatch(getLastFiveMonthsData(dni))
    }
  }, [dispatch])

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  const data = lastFiveMonthsData
    .map((data) => ({
      month: monthNames[data.month - 1],
      Ingresos: Number(Math.abs(data.income)).toFixed(),
      Gastos: Number(Math.abs(data.expenses)).toFixed(),
    }))
    .reverse()

  const maxValue = Math.max(
    ...data.map(d => Math.max(d.Ingresos, d.Gastos))
  )

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, maxValue]} />
          <Tooltip />
          <Bar dataKey="Ingresos" fill="#E0001A" />
          <Bar dataKey="Gastos" fill="#3E413F" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-between mt-4 text-sm">
        <div>
          <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
          Ingresos
          <span className="ml-2 font-semibold">{data[data.length - 1]?.Ingresos} €</span>
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-gray-600 mr-2"></span>
          Gastos
          <span className="ml-2 font-semibold">{data[data.length - 1]?.Gastos} €</span>
        </div>
      </div>
    </>
  )
}

export default Chart
