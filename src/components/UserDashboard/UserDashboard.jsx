import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectPlannerCard from '../ProjectPlannerCard/ProjectPlannerCard' // Asegúrate de que la ruta sea correcta

const Home = () => {
  const navigate = useNavigate()

  const handleMyFinancesClick = () => {
    navigate('/user/my-finances')
  }

  // Ejemplos de proyectos ficticios de ahorro para mostrar en el dashboard
  const projects = [
    {
      id: 1,
      name: 'Viaje a Europa',
      estimatedCost: 2000, // Objetivo de ahorro en euros
      monthlySavings: 200, // Ahorros mensuales
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
    <div>
      <h1>Home Dashboard</h1>

      {/* Botón existente de My Finances */}
      <button onClick={handleMyFinancesClick}>My Finances</button>

      {/* Sección de Proyectos */}
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
    </div>
  )
}

export default Home
