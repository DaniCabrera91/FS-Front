import React from 'react'
import { ChevronRight } from 'lucide-react'

export default function CategoryCard({ name, percentage, amount, type }) {

  const displayType = type === 'incomes' ? 'ingreso' : 'gasto'

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex items-center justify-between py-3 border-b last:border-b-0">
          <div>
            <h3 className="font-semibold text-red-500">{name}</h3>
            <div className="w-24 h-1 bg-gray-200 mt-1">
              <div className="h-full bg-red-500" style={{ width: `${percentage}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{percentage}% de tu {displayType} mensual</p>
          </div>
          <div className="text-right">
            <ChevronRight className="text-gray-400 mb-1" />
            <p className="font-semibold">{amount}€</p>
          </div>
        </div>
      </div>
    </>
  )
}
