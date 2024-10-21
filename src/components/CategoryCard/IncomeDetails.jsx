import React from 'react'

function IncomeDetails({ percentage, amount }) {
  return (
    <div>
      <h2>Income Details</h2>
      <p>Income Percentage: {percentage}%</p>
      <p>Income Amount: {amount}€</p>
      {/* Add more income-specific details here */}
    </div>
  )
}

export default IncomeDetails
