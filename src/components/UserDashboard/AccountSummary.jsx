import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalBalance } from '../../redux/trans/transSlice'
import { getUserData } from '../../redux/user/userSlice'

export default function AccountSummary() {
  const dispatch = useDispatch()
  const { totalBalance, isLoading, error } = useSelector((state) => state.trans)
  const { initialBalance, iban } = useSelector((state) => state.user)

  useEffect(() => {
    const dni = localStorage.getItem('dni')
    if (dni) {
      dispatch(getUserData(dni)).unwrap().then(() => {
        dispatch(getTotalBalance({ dni, initialBalance }))
      }).catch((err) => {
        console.error("Failed to load user data:", err)
      })
    }
  }, [dispatch, initialBalance])

  const formatBalance = (balance) => {
    if (isNaN(balance)) return '0.00'
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const displayIban = iban ? `*${iban.slice(-4)}` : '****'

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar los datos: {error}</div>

  return (
    <>
      <div className="mx-8 p-4">
        <div className="flex justify-between mb-2 ">
          <h2 className="text-sm text-red-600 mb-1 font-semibold">Cuenta Personal</h2>
          <p className="text-xs text-gray-500 mb-2">{displayIban}</p>
        </div>
        <h3 className="text-sm font-medium mb-1 font-semibold">Saldo Total</h3>
        <h1 className="text-3xl font-bold mb-4">{formatBalance(totalBalance.toFixed(2))} €</h1>
      </div>
    </>
  )
}
