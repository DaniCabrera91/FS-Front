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
          <XAxis dataKey="month" axisLine={false} tickLine={false}/>
          <YAxis  domain={[0, maxValue]} hide />
          <Tooltip />
          <Bar dataKey="Ingresos" fill="#E30613" radius={[10, 10, 0, 0]} barSize={15} />
          <Bar dataKey="Gastos" fill="#3E413F" radius={[10, 10, 0, 0]} barSize={15}/>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
export default Chart
