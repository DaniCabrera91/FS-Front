import React from 'react'
import { Home, ArrowLeftRight, PlusCircle, HelpCircle } from 'lucide-react'

export default function BottomNavigation() {
  return (
    <nav className="flex justify-around items-center bg-white py-2 border-t">
      <button className="flex flex-col items-center">
        <Home className="w-6 h-6 kbred" />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button className="flex flex-col items-center">
        <ArrowLeftRight className="w-6 h-6 text-gray-600" />
        <span className="text-xs mt-1">Transferencia</span>
      </button>
      <button className="flex flex-col items-center">
        <PlusCircle className="w-6 h-6 text-gray-600" />
        <span className="text-xs mt-1">Operar</span>
      </button>
      <button className="flex flex-col items-center">
        <HelpCircle className="w-6 h-6 text-gray-600" />
        <span className="text-xs mt-1">Ayuda</span>
      </button>
    </nav>
  )
}