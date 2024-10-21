import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllTransactionsByCategory } from '../../redux/trans/transSlice'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CategoryDetail = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const { transactionsPerCategory, totalAnnualExpense, isLoading, error } = useSelector((state) => state.trans)

  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni && name) {
      dispatch(getAllTransactionsByCategory({dni, category: name}))
    }
  }, [dispatch, name])

  const formatBalance = (balance) => {
    if (isNaN(balance)) return '0.00'
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  console.log("transactionsPerCategory:", JSON.stringify(transactionsPerCategory, null, 2))

  if (!transactionsPerCategory || !transactionsPerCategory.length === 0) {
    return <div>No hay detalles disponibles para esta categoría.</div>
  }

  const data = [
    { name: 'Jun', expense: 800 },
    { name: 'Jul', expense: 900 },
    { name: 'Ago', expense: 500 },
    { name: 'Sep', expense: 1000 },
    { name: 'Oct', expense: 400 },
  ]

  return (
    <>

<div className=" bg-gray-100">

    <div className="mx-8 p-4">
        <div className="flexmb-2 ">
        <h2 className="text-sm text-600 mb-1 font-semibold">Educación y cultura</h2>
    </div>
        
    <h1 className="text-3xl font-bold mb-4">{formatBalance(totalAnnualExpense.toFixed(2))} €</h1>
    <h3 className="text-sm font-medium mb-1 font-semibold">Gasto Anual</h3> 
</div>

        <main className="p-4">
        
                
            <div className="h-64 w-full p-4">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            {/* <YAxis  domain={[0, maxValue]} hide /> */}
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="expense" fill="#3E413F"  radius={[10, 10, 0, 0]} barSize={15}/>
            </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Gastos</span>
            <span>1000€</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Representa un 24% de tu gasto total</p>
        </div>

        </main>
     
    </div>


    <div className="bg-white rounded-lg p-4 card-transition">
    <div className="bg-white p-4 rounded-t-3xl shadow-lg ">
        <h2 className="text-lg font-semibold mb-2">Movimientos</h2>
        <div className="h-px bg-gray-200 mb-2"></div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Todos los movimientos</span>
          <span>01 oct - 30 oct</span>
        </div>
      

        <div className="bg-white rounded-lg p-4 my-2">
            {transactionsPerCategory.map((transaction, index) => {
                const date = new Date(transaction.createdAt)
                const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`

                return (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center">
                    <img src={transaction.icon} alt={transaction.category} className="w-8 h-8 mr-3 text-gray-600" />
                    <div>
                        <p className="font-semibold">{transaction.categoryName}</p>
                        <p className="text-xs text-gray-500">{formattedDate}</p>
                    </div>
                    </div>
                    <span className="font-semibold">{transaction.amount.toFixed(2)}€</span>
                </div>
                )
            })}
            </div>
            </div>
            </div>
           
    </>
  )
}

export default CategoryDetail
