import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jun', Ingresos: 1800, Gastos: 1400 },
  { month: 'Jul', Ingresos: 2000, Gastos: 1600 },
  { month: 'Ago', Ingresos: 1700, Gastos: 1300 },
  { month: 'Sep', Ingresos: 1900, Gastos: 1500 },
  { month: 'Oct', Ingresos: 1600, Gastos: 1200 },
]

export default function Chart() {
  return (
    <>
    
      
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Ingresos" fill="#ff0000" />
          <Bar dataKey="Gastos" fill="#666666" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-between mt-4 text-sm">
        <div>
          <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
          Ingresos
          <span className="ml-2 font-semibold">2000€</span>
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-gray-600 mr-2"></span>
          Gastos
          <span className="ml-2 font-semibold">1000€</span>
        </div>
      </div>

      
   </>
  )
}