import React from 'react'
import { ShoppingCart, ShoppingBag, Stethoscope, Droplet } from 'lucide-react'

const transactions = [
  { icon: ShoppingCart, name: 'Mercadona', date: '14 mayo', amount: -56.30 },
  { icon: ShoppingBag, name: 'Shopify', date: '14 mayo', amount: -26.75 },
  { icon: Stethoscope, name: 'Clínica', date: '13 mayo', amount: -130.00 },
  { icon: Droplet, name: 'Gasolina', date: '13 mayo', amount: -66.20 },
]

export default function TransactionList() {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-red-600">Últimos movimientos</h2>
        <span className="text-sm ">Ver más</span>
      </div>
      {transactions.map((transaction, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
          <div className="flex items-center">
            <transaction.icon className="w-8 h-8 mr-3 text-gray-600" />
            <div>
              <p className="font-semibold">{transaction.name}</p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
          </div>
          <span className="font-semibold">{transaction.amount.toFixed(2)}€</span>
        </div>
      ))}
    </div>
  )
}