import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserDashboard.styled.scss'
import AccountSummary from './AccountSummary'
import FinanceOverview from './FinanceOverview'
import TransactionList from './TransactionList'
import { ChevronRight } from 'lucide-react'
import ProjectPlannerCard from '../ProjectPlannerCard/ProjectPlannerCard'
import InfoButton from '../InfoButton/InfoButton'
import Modal from '../Modal/Modal'
import 'flickity/css/flickity.css'

import Flickity from 'react-flickity-component'

const Home = () => {
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)
  const [cardTransition, setCardTransition] = useState(false)
  const [fadeOtherCards, setFadeOtherCards] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', text: '' })

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

  const handleInfoClick = (title, text) => {
    setModalContent({ title, text })
    setIsModalOpen(true)
  }

  const projects = [
    {
      id: 1,
      name: 'Renovar Ordenador',
      estimatedCost: 800,
      monthlySavings: 50,
      currentSavings: 800,
      targetDate: '2024-08-01',
    },
    {
      id: 2,
      name: 'Viaje a Europa',
      estimatedCost: 4000,
      monthlySavings: 50,
      currentSavings: 800,
      targetDate: '2025-18-01',
    },

    {
      id: 'demo',
      name: 'Añadir nuevo proyecto',
    },
  ]

  const flickityOptions = {
    cellAlign: 'center',
    contain: false,
    freeScroll: false,
    wrapAround: true,
    initialIndex: 0,
    pageDots: true,
  }

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <main className='flex-1 overflow-y-auto p-4'>
        {showMore ? (
          <>
            <AccountSummary />
            <TransactionList />
          </>
        ) : (
          <>
            <AccountSummary />
            <div
              className={`bg-white rounded-lg p-4 mb-4 ${
                fadeOtherCards ? 'card-fade card-fade-hidden' : ''
              }`}
              onClick={handleClick}
            >
              <div className='flex justify-between items-center'>
                <span className='text-sm kbred font-semibold'>
                  Mis finanzas
                </span>
                <div className='flex justify-between items-center'>
                  <InfoButton
                    ariaLabel='Gastos e Ingresos estimados info button'
                    title='¿Quieres saber en qué estás gastando tus ahorros?'
                    content={
                      <p>
                        Aquí puedes ver información detallada sobre los gastos
                        estimados.
                      </p>
                    }
                  />
                  <ChevronRight className='w-4 h-4 ml-1 kbred' />
                </div>
              </div>
            </div>
            <div
              className={`finance-overview ${
                fadeOtherCards ? 'card-fade card-fade-hidden' : ''
              }`}
            >
              <FinanceOverview />
            </div>
            <div
              className={`bg-white rounded-lg p-4 card-transition ${
                cardTransition ? 'card-hidden' : ''
              }`}
            >
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-sm font-semibold kbred'>
                  Últimos movimientos
                </h2>
                <button
                  onClick={handleShowMore}
                  className='text-sm hover:underline'
                >
                  Ver más
                </button>
              </div>
              <TransactionList limit={5} />
            </div>
            <div className='flex justify-center mt-4'>
              <h2>Mis Objetivos de Ahorro</h2>
            </div>
            <div className='project-cards'>
              <Flickity
                className={'carousel'}
                elementType={'div'}
                options={flickityOptions}
              >
                {projects.map((project) => (
                  <div key={project.id} className='carousel-cell mx-5 mb-5'>
                    {project.id === 'demo' ? (
                      <div
                        className='project-card add-new-project-card flex justify-center items-center cursor-pointer'
                        onClick={() =>
                          alert('Funcionalidad para agregar un nuevo proyecto')
                        }
                      >
                        <div className='text-center'>
                          <span className='add-project-icon'>+</span>
                          <p>Añadir nuevo proyecto</p>
                        </div>
                      </div>
                    ) : (
                      <ProjectPlannerCard
                        projectName={project.name}
                        estimatedCost={project.estimatedCost}
                        monthlySavings={project.monthlySavings}
                        currentSavings={project.currentSavings}
                        targetDate={project.targetDate}
                      />
                    )}
                  </div>
                ))}
              </Flickity>
            </div>
          </>
        )}
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
      >
        <p>{modalContent.text}</p>
      </Modal>
    </div>
  )
}

export default Home
