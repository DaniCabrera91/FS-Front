import React from 'react'
import { Home, RefreshCw, PlusCircle, HelpCircle } from 'lucide-react'

export default function TheFooter() {
  return (
    <footer className="bg-white shadow-lg rounded-t-xl fixed bottom-0 left-0 right-0 w-[375px] mx-auto">
      <div className="flex justify-around py-2">
        <button className="flex flex-col items-center text-red-500">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <RefreshCw size={24} />
          <span className="text-xs mt-1">Transferencia</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <PlusCircle size={24} />
          <span className="text-xs mt-1">Operar</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <HelpCircle size={24} />
          <span className="text-xs mt-1">Ayuda</span>
        </button>
      </div>
    </footer>
  )
}
