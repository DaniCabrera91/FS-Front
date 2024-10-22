import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserDashboard.styled.scss'
import AccountSummary from './AccountSummary'
import FinanceOverview from './FinanceOverview'
import TransactionList from './TransactionList'
import { ChevronRight } from 'lucide-react'
import ProjectPlannerCard from '../ProjectPlannerCard/ProjectPlannerCard'
import iconPaths from '../../utils/iconPath'
import InfoButton from '../InfoButton/InfoButton.jsx'

const Home = () => {
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)
  const [cardTransition, setCardTransition] = useState(false)
  const [fadeOtherCards, setFadeOtherCards] = useState(false)

  const handleClick = () => {
    setTimeout(() => {
      navigate('/user/finances')
    }, 250)
  }

  const handleShowMore = () => {
    setCardTransition(true)
    setFadeOtherCards(true)

    setTimeout(() => {
      setShowMore(true)
      setFadeOtherCards(false)
    }, 500)
  }

  // Ejemplos de proyectos ficticios de ahorro para mostrar en el dashboard
  const projects = [
    {
      id: 1,
      name: 'Viaje a Europa',
      estimatedCost: 2000,
      monthlySavings: 1000,
      currentSavings: 600,
      targetDate: '2024-12-01',
    },
    {
      id: 2,
      name: 'Comprar una Laptop',
      estimatedCost: 1200,
      monthlySavings: 100,
      currentSavings: 500,
      targetDate: '2024-08-01',
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-4">
        {showMore ? (
          <>
            <AccountSummary />
            <TransactionList /> 
          </>
        ) : (
          <>
            <AccountSummary />

            <div className={`bg-white rounded-lg p-4 mb-4 ${fadeOtherCards ? 'card-fade card-fade-hidden' : ''}`} onClick={handleClick}>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600 font-semibold">Mis finanzas</span>
                <div className="flex justify-between items-center">
                <InfoButton/>
                  <ChevronRight className="w-4 h-4 ml-1 text-red-600" />
                </div>
              </div>
            </div>

            <div className={`finance-overview ${fadeOtherCards ? 'card-fade card-fade-hidden' : ''}`}>
              <FinanceOverview />
            </div>

            <div className={`bg-white rounded-lg p-4 card-transition ${cardTransition ? 'card-hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-red-600">Últimos movimientos</h2>
                <button
                  onClick={handleShowMore}
                  className="text-sm hover:underline"
                >
                  Ver más
                </button>
              </div>
              <TransactionList limit={5} /> 
            </div>


            <h2>Mis Objetivos de Ahorro</h2>
            <div className='project-cards'>
              {projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '20px' }} className={`${fadeOtherCards ? 'card-fade card-fade-hidden' : ''}`}>
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
          </>
        )}
      </main>
    </div>
  )
}

export default Home
