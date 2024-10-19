import React from 'react'
import AccountSummary from './AccountSummary'
import FinanceOverview from './FinanceOverview'
import TransactionList from './TransactionList'
import BottomNavigation from './BottomNavigation'
import { ChevronRight } from 'lucide-react'


export default function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
  
      <main className="flex-1 overflow-y-auto p-4">
        <AccountSummary />


        <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center text-red-600">
                <span className="text-sm">Mis finanzas</span>
                <ChevronRight className="w-4 h-4 ml-1" />
            </div>
        </div>


        <FinanceOverview />

        <TransactionList />
      </main>
      <BottomNavigation />
    </div>
  )
}