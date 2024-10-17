import axios from 'axios'

const API_URL = 'http://localhost:3000/trans'

const getAllTransactions = async () => {
  const dni = localStorage.getItem('dni')
  const response = await axios.post(`${API_URL}/getByUserDni`, { dni })
  return response.data;
}

//añadir posibilidad de month y year
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
          console.log("desde servi ce" +monthlyExpense)
        }
      })
    })
  })
  return { transactions: response.data.categories, monthlyIncome, monthlyExpense: Math.abs(monthlyExpense) }
}

const getMonthlyTransactionsByMonth = async (dni, year, month) => {
  try {
    console.log("getMonthlyTransactionsByMonth dni"+dni+" year "+year+" month "+month)
  const response = await axios.post(`${API_URL}/getMonthlyByUserDni`, { dni, month, year })
console.log(response)
  const transactions = response.data.categories
  let income = 0;
  let expenses = 0;

  transactions.forEach(category => {
    Object.values(category).forEach(cat => {
      cat.transactions.forEach(transaction => {
        if (transaction.type === 'incomes') {
          income += transaction.amount;
        } else if (transaction.type === 'expenses') {
          expenses += transaction.amount;
        }
      })
    })
  })

  return { month, income, expenses };
} catch (error) {
  console.error(`Error al obtener las transacciones del mes ${month}:`, error);
  throw error;
}
}

const getLastFiveMonthsData = async (dni) => {
  console.log("getLastFiveMonthsData dni "+dni)
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
  getMonthlyTransactionsByMonth,
  getLastFiveMonthsData,
}

export default transService
