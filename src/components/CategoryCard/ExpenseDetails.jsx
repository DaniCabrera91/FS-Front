import React from 'react'

function ExpenseDetails({ percentage, amount }) {
  return (
    <div>
      <h2>Expense Details</h2>
      <p>Expense Percentage: {percentage}%</p>
      <p>Expense Amount: {amount}€</p>
      {/* Add more expense-specific details here */}
    </div>
  )
}

export default ExpenseDetails
