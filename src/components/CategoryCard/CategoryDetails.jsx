import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ExpenseDetails from './ExpenseDetails'
import IncomeDetails from './IncomeDetails'
import categories from "../../utils/categories"
//
// const [selectedCategory, setSelectedCategory] = useState(null)
// import {
//   getTotalBalance,
//   getMonthlyTransactions,
// } from '../../redux/trans/transSlice'

function CategoryDetails() {
  const { name } = useParams()
  const location = useLocation()
  const { percentage, amount, type } = location.state || {}

  // Find the selected category based on the name
  const selectedCategory = Object.values(categories).find(
    (category) => category.name === name,
  )

  return (
    <div>
      <h1>Details for {name}</h1>
      <p>Percentage: {percentage}%</p>
      <p>Amount: {amount}€</p>
      <p>Type: {type}</p>

      {/* Conditionally render components based on the type */}
      {type === 'expenses' ? (
        <ExpenseDetails percentage={percentage} amount={amount} />
      ) : (
        <IncomeDetails percentage={percentage} amount={amount} />
      )}

      {/* Render the subcategories */}
      {selectedCategory && (
        <>
          <h2>Subcategories</h2>
          <ul>
            {selectedCategory.items.map((item, index) => (
              <li key={index}>
                {item}
                {/* {item.name} */}
                {/* {item.amount} */}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default CategoryDetails
