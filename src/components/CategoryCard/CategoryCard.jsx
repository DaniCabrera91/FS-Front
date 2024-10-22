import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import InfoButton from '../InfoButton/InfoButton'

export default function CategoryCard({ name, percentage, amount, type }) {
  const navigate = useNavigate()
  const displayType = type === 'incomes' ? 'ingreso' : 'gasto'

  const handleClick = () => {
    setTimeout(() => {
      navigate(`/category/${name}`)
    }, 250)
  }

  return (
    <div className="bg-white rounded-lg shadow px-4 py-2 mb-2" onClick={handleClick}>
      <div className="flex items-center justify-between py-3 border-b last:border-b-0">
        <div>
          <h3 className="font-semibold text-red-500">{name}</h3>
          <div className="w-24 h-1 bg-gray-200 mt-1">
            <div className="h-full bg-red-500" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{percentage}% de tu {displayType} mensual</p>
        </div>
        <div className="text-right "> 
          <div className="flex justify-between items-center">
            <InfoButton/>
            <ChevronRight className="text-gray-400" />
          </div>
          <div className="flex justify-between items-center">
          <p className="font-semibold">{amount}€</p>
          </div>
        </div>
      </div>
    </div>
  )
}
