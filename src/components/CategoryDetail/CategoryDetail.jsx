// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { getCategoryDetails } from '../../redux/trans/transSlice'

// const CategoryDetail = () => {
//   const { name } = useParams()
//   const dispatch = useDispatch()
//   const { categoryDetails, isLoading, error } = useSelector(
//     (state) => state.trans,
//   )

//   useEffect(() => {
//     if (name) {
//       dispatch(getCategoryDetails(name))
//     }
//   }, [dispatch, name])

//   if (isLoading) {
//     return <div>Cargando...</div>
//   }

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   if (!categoryDetails || !categoryDetails.transactions) {
//     return <div>No hay detalles disponibles para esta categoría.</div>
//   }

//   return (
//     <div className='bg-white rounded-lg shadow p-4 mb-4 mx-6'>
//       <h2 className='text-lg font-semibold mb-2'>{categoryDetails.category}</h2>
//       <p className='text-sm text-gray-600 mb-4'>
//         {categoryDetails.percentageExpense} del gasto total mensual
//       </p>
//       <p className='text-sm text-gray-600 mb-4'>
//         Total de gastos: {categoryDetails.totalExpense}€
//       </p>
//       <p className='text-sm text-gray-600 mb-4'>
//         Total de ingresos: {categoryDetails.totalIncome}€
//       </p>
//       <div className='mt-4'>
//         {categoryDetails.transactions.map((transaction) => (
//           <div key={transaction._id} className='border-b py-2'>
//             <p className='text-sm text-gray-600'>
//               {transaction.type}: {transaction.amount}€ -{' '}
//               {new Date(transaction.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default CategoryDetail

// import React from 'react'
// import { ChevronRight } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// export default function CategoryDetail({ name, percentage, monthlyExpense }) {
//   const navigate = useNavigate()
//   const displayType = type === 'incomes' ? 'ingreso' : 'gasto'

//   const handleClick = () => {
//     setTimeout(() => {
//       navigate(`/category/detail`)
//     }, 250)
//   }

//   return (
//     <div className="bg-white rounded-lg shadow p-4 mb-4" onClick={handleClick}>
//       <div className="flex items-center justify-between py-3 border-b last:border-b-0">
//         <div>
//           <h3 className="font-semibold text-red-500">{name}</h3>
//           <div className="w-24 h-1 bg-gray-200 mt-1">
//             <div className="h-full bg-red-500" style={{ width: `${percentage}%` }}></div>
//           </div>
//           <p className="text-sm text-gray-600 mt-1">{percentage}% de tu {displayType} mensual</p>
//         </div>
//         <div className="text-right">
//           <ChevronRight className="text-gray-400 mb-1" />
//           <p className="font-semibold">{amount}€</p>
//         </div>
//       </div>
//     </div>
//   )
// }
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllTransactionsByCategory } from '../../redux/trans/transSlice';

const CategoryDetail = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { transactionsPerCategory, isLoading, error } = useSelector((state) => state.trans);

  useEffect(() => {
    const dni = localStorage.getItem('dni');
    if (dni && name) {
      dispatch(getAllTransactionsByCategory({dni, category: name}))
    }
  }, [dispatch, name]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log("transactionsPerCategory:", JSON.stringify(transactionsPerCategory, null, 2));

  if (!transactionsPerCategory || !transactionsPerCategory.length === 0) {
    return <div>No hay detalles disponibles para esta categoría.</div>;
  }

  return (
    <>
        <div className="bg-white rounded-lg p-4">
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
    </>
  )
}

export default CategoryDetail;
