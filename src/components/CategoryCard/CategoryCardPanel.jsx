import React, { useState } from 'react'
import CategoryCard from './CategoryCard'

function CategoryCardPanel({ transactions, monthlyIncome, monthlyExpense }) {
  const [selectedType, setSelectedType] = useState('incomes')

  const handleButtonClick = (type) => {
    setSelectedType(type)
  }

  return (
    <>
          
      <div className="flex border-b mt-4">
        <button
          className={`incomes px-4 py-2 ${selectedType === 'incomes' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
          onClick={() => handleButtonClick('incomes')}
        >
          Ingresos
        </button>
        <button
          className={`expenses px-4 py-2 ${selectedType === 'expenses' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
          onClick={() => handleButtonClick('expenses')}
        >
          Gastos
        </button>
      </div>
      <div className="h-px bg-gray-200 mb-2"></div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Gastos por categoría</span>
          <span>01 oct - 30 oct</span>
        </div>

      {transactions && transactions.map((category) => (
        Object.keys(category).map((key) => {
          
          const amount = category[key].transactions.reduce((total, t) => total + t.amount, 0)

          const percentage = selectedType === 'expenses'
            ? (monthlyExpense > 0 ? (Math.abs(amount) / monthlyExpense) * 100 : 0)
            : (monthlyIncome > 0 ? (Math.abs(amount) / monthlyIncome) * 100 : 0)

          const type = selectedType === 'expenses' ? 'expenses' : 'incomes'

          return (
            category[key].name !== 'Ingresos' ? (
              
              <CategoryCard
                key={key}
                name={category[key].name}
                amount={Math.abs(amount).toFixed()}
                percentage={percentage.toFixed()}
                type={type}
              />
            ) : null
          )
        })
      ))}
    </>
  )
}

export default CategoryCardPanel
