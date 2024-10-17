import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getLastFiveMonthsData } from '../../redux/trans/transSlice'

function Chart() {
  const dispatch = useDispatch()

  const { lastFiveMonthsData, isLoading, error } = useSelector((state) => state.trans)

  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni) {
      dispatch(getLastFiveMonthsData(dni))
    }
  }, [dispatch])

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  const data = lastFiveMonthsData.map((data) => ({
    month: data.month,
    Ingresos: Number(Math.abs(data.income)).toFixed(),
  Gastos: Number(Math.abs(data.expenses)).toFixed(), 
  }))
  console.log("los 5 meses: " + JSON.stringify(lastFiveMonthsData))

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
          <Bar dataKey="Ingresos" fill="#ff0000" />
          <Bar dataKey="Gastos" fill="#666666" />
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


// import React from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// const data = [
//   { month: 'Jun', Ingresos: 1800, Gastos: 1400 },
//   { month: 'Jul', Ingresos: 2000, Gastos: 1600 },
//   { month: 'Ago', Ingresos: 1700, Gastos: 1300 },
//   { month: 'Sep', Ingresos: 1900, Gastos: 1500 },
//   { month: 'Oct', Ingresos: 1600, Gastos: 1200 },
// ]
// // hay que llamar al endpoint que devuelve los datos de los 5 meses
// // hay que recoger de esas cantidades cual es el valor más alto y asignarselo a maxValue
// export default function Chart() {
//   return (
//     <>
    
      
      
//       <ResponsiveContainer width="100%" height={200}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="Ingresos" fill="#ff0000" />
//           <Bar dataKey="Gastos" fill="#666666" />
//         </BarChart>
//       </ResponsiveContainer>

//       <div className="flex justify-between mt-4 text-sm">
//         <div>
//           <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
//           Ingresos
//           <span className="ml-2 font-semibold">€ de mes actual.tofixed</span>
//         </div>
//         <div>
//           <span className="inline-block w-3 h-3 bg-gray-600 mr-2"></span>
//           Gastos
//           <span className="ml-2 font-semibold">€ de mes actual.tofixed</span>
//         </div>
//       </div>

      
//    </>
//   )
// }