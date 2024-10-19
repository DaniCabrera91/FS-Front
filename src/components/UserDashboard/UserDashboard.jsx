import React from 'react'
import { useNavigate } from 'react-router-dom'
import './UserDashboard.styled.scss'
import AccountSummary from './AccountSummary'
import FinanceOverview from './FinanceOverview'
import TransactionList from './TransactionList'

import { ChevronRight } from 'lucide-react'
import ProjectPlannerCard from '../ProjectPlannerCard/ProjectPlannerCard'

const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    setTimeout(() => {
      navigate('/user/finances')
    }, 250)
  }

  // Ejemplos de proyectos ficticios de ahorro para mostrar en el dashboard
  const projects = [
    {
      id: 1,
      name: 'Viaje a Europa',
      estimatedCost: 2000, // Objetivo de ahorro en euros
      monthlySavings: 1000, // Ahorros mensuales
      currentSavings: 600, // Ahorros actuales
      targetDate: '2024-12-01', // Fecha límite para alcanzar el objetivo
    },
    {
      id: 2,
      name: 'Comprar una Laptop',
      estimatedCost: 1200, // Objetivo de ahorro en euros
      monthlySavings: 100, // Ahorros mensuales
      currentSavings: 500, // Ahorros actuales
      targetDate: '2024-08-01', // Fecha límite para alcanzar el objetivo
    },
  ]

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
    
        <main className="flex-1 overflow-y-auto p-4">
      
          <AccountSummary />

          <div className="bg-white rounded-lg p-4 mb-4" onClick={handleClick}>
              <div className="flex items-center text-red-600">
                  <span className="text-sm">Mis finanzas</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
              </div>
          </div>

          <FinanceOverview />

          <TransactionList />

          Sección de Proyectos
          <h2>Mis Objetivos de Ahorro</h2>
          <div className='project-cards'>
            {projects.map((project) => (
              <div key={project.id} style={{ marginBottom: '20px' }}>
                <ProjectPlannerCard
                projectName={project.name}
                estimatedCost={project.estimatedCost}
                monthlySavings={project.monthlySavings}
                currentSavings={project.currentSavings}
                targetDate={project.targetDate}
                />
            </div>
            ))}
          </div>

        </main>
      </div>
    </>
  )
}

export default Home
