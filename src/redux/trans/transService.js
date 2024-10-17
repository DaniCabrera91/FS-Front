import axios from 'axios'

const API_URL = 'http://localhost:3000/trans'

const getAllTransactions = async () => {
  const dni = localStorage.getItem('dni')
  const response = await axios.post(`${API_URL}/getByUserDni`, { dni })
  return response.data;
}

//añadir posibilidad de month y year
const getMonthlyTransactions = async () => {
  const dni = localStorage.getItem('dni')
  const response = await axios.post(`${API_URL}/getMonthlyByUserDni`, { dni })

  let monthlyIncome = 0
  response.data.categories.forEach(category => {
    Object.values(category).forEach(cat => {
      cat.transactions.forEach(transaction => {
        if (transaction.type === 'incomes') {
          monthlyIncome += transaction.amount
        }
      })
    })
  })
  return { transactions: response.data.categories, monthlyIncome }
}

const getTotalBalance = async () => {
  try {
    const data = await getAllTransactions();

    let totalBalance = 0;
    data.categories.forEach(category => {
      Object.values(category).forEach(cat => { 
        cat.transactions.forEach(transaction => { 
          if (transaction.type === 'incomes') {
            totalBalance += transaction.amount
          } else if (transaction.type === 'expenses') {
            totalBalance += transaction.amount;
          }
        })
      })
    })
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
}

export default transService
