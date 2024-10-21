import axios from 'axios'
import userService from '../user/userService'

import categories from "../../utils/categories"

const API_URL = 'http://localhost:3000/trans'

const getAllTransactions = async () => {
  const dni = localStorage.getItem('dni')
  const response = await axios.post(`${API_URL}/getByUserDni`, { dni })
  return response.data
}

const getAllTransactionsByCategory = async (dni, category) => {
  try {
    const categoryEntry = Object.entries(categories).find(([key, value]) => value.name === category)

    if (!categoryEntry) throw new Error('Categoría no encontrada')
    
    const [categoryKey] = categoryEntry
    const response = await axios.post(`${API_URL}/getByUserDni`, { dni, category: categoryKey })
    
    const categoriesArray = response.data.categories

    if (categoriesArray.length) {
      const categoryData = categoriesArray[0][categoryKey]
      const transactions = categoryData.transactions
      
      const transactionsWithIcons = transactions.map((trans) => {
        let icon = null
        let categoryName = null

        Object.keys(categories).forEach((categoryKey) => {
          const category = categories[categoryKey]
          const matchingItem = category.items.find(item => item.type === trans.category)

          if (matchingItem) {
            console.log("match")
            icon = matchingItem.icon
            categoryName = matchingItem.name
          }
        })

        if (!icon) {
          icon = '../assets/other.svg'
        }

        return {
          ...trans,
          icon,
          categoryName,
        }
      })

      const sortedTransactions = transactionsWithIcons.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return { transactions: sortedTransactions }
    }

  } catch (error) {
    console.error('Error fetching transactions:', error)
    return { transactions: [] }
  }
}

const getMonthlyTransactions = async (dni) => {
  const response = await axios.post(`${API_URL}/getMonthlyByUserDni`, { dni })

  let monthlyIncome = 0
  let monthlyExpense = 0
  response.data.categories.forEach(category => {
    Object.values(category).forEach(cat => {
      cat.transactions.forEach(transaction => {
        if (transaction.type === 'incomes') {
          monthlyIncome += transaction.amount
        }
        else{
          monthlyExpense+= transaction.amount
        }
      })
    })
  })
  return { transactions: response.data.categories, monthlyIncome, monthlyExpense: Math.abs(monthlyExpense) }
}


const getMonthlyTransactionsByMonth = async (dni, year, month) => {
  try {
  const response = await axios.post(`${API_URL}/getMonthlyByUserDni`, { dni, month, year })
    const transactions = response.data.categories
    let income = 0
    let expenses = 0

    transactions.forEach(category => {
      Object.values(category).forEach(cat => {
        cat.transactions.forEach(transaction => {
          if (transaction.type === 'incomes') {
            income += transaction.amount
          } else if (transaction.type === 'expenses') {
            expenses += transaction.amount
          }
        })
      })
    })
    return { month, income, expenses }
  } catch (error) {
    console.error(`Error al obtener las transacciones del mes ${month}:`, error)
    throw error
  }
}


const getThreeMonthsData = async (dni) => {
  try {
    const response = await axios.post(`${API_URL}/getThreeMonthsByUserDni`, { dni })

    const transactionsWithIcons = response.data.transactions.map((trans) => {
      let icon = null
      let categoryName = null

      Object.keys(categories).forEach((categoryKey) => {
        const category = categories[categoryKey]
        const matchingItem = category.items.find(item => item.type === trans.category)

        if (matchingItem) {
          icon = matchingItem.icon
          categoryName = matchingItem.name
        }
      })
      if (!icon) {
        icon = '../assets/other.svg'
      }
      return {
        ...trans,
        icon,
        categoryName,
      }
    })

    return { transactions: transactionsWithIcons }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return { transactions: [] }
  }
}


const getLastFiveMonthsData = async (dni) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const results = []
  
  for (let i = 0; i < 5; i++) {
   
    const month = currentMonth - i
    const year = month <= 0 ? currentYear - 1 : currentYear
    const adjustedMonth = month <= 0 ? month + 12 : month
    
    const monthlyData = await getMonthlyTransactionsByMonth(dni, year, adjustedMonth)
    results.push(monthlyData)
  }
  return results
}


const getTotalBalance = async (dni) => {
  try {
    const initialBalance = await userService.getInitialBalance(dni)
    console.log(initialBalance)
    const data = await getAllTransactions(dni)

    let totalBalance = initialBalance

    data.categories.forEach(category => {
      Object.values(category).forEach(cat => {
        cat.transactions.forEach(transaction => {
          if (transaction.type === 'incomes') {
            totalBalance += transaction.amount
          } else if (transaction.type === 'expenses') {
            totalBalance -= transaction.amount
          }
        })
      })
    })
    console.log(totalBalance)
    return totalBalance
  } catch (error) {
    console.error('Error al obtener el balance total:', error)
  }
}


// Exportar los servicios
const transService = {
  getAllTransactions,
  getMonthlyTransactions,
  getTotalBalance,
  getMonthlyTransactionsByMonth,
  getLastFiveMonthsData,
  getThreeMonthsData,
  getAllTransactionsByCategory,
}

export default transService
