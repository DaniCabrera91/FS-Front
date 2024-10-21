import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalBalance } from '../../redux/trans/transSlice'

export default function AccountSummary() {
  
  const dispatch = useDispatch()
  
  const { totalBalance, isLoading, error } = useSelector((state) => state.trans)
  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni) {
      dispatch(getTotalBalance(dni))
    }
  }, [dispatch])

  const formatBalance = (balance) => {
    if (isNaN(balance)) return '0.00' 
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
      <div className="mx-8 p-4">
      <div className="flex justify-between mb-2 ">
        <h2 className="text-sm text-red-600 mb-1 font-semibold">Cuenta Personal</h2>
        <p className="text-xs text-gray-500 mb-2">CAMBIAR *2345</p>
        </div> 
        <h3 className="text-sm font-medium mb-1 font-semibold">Saldo Total</h3>
        <h1 className="text-3xl font-bold mb-4">{formatBalance(totalBalance.toFixed(2))} €</h1>
      </div>
    </>
  )
}