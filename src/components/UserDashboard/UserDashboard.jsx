import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectPlannerCard from '../ProjectPlannerCard/ProjectPlannerCard' // Asegúrate de que la ruta sea correcta
import './UserDashboard.styled.scss'
import App from './test/App'

const Home = () => {
  const navigate = useNavigate()

  const handleMyFinancesClick = () => {
    navigate('/user/finances')
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
    // <div>
    //   <h1>Home Dashboard</h1>

    //   <button onClick={handleMyFinancesClick} className='financesBtn'>
    //     Mis Finanzas
    //   </button>

    //   {/* Sección de Proyectos */}
    //   <h2>Mis Objetivos de Ahorro</h2>
    //   <div className='project-cards'>
    //     {projects.map((project) => (
    //       <div key={project.id} style={{ marginBottom: '20px' }}>
    //         <ProjectPlannerCard
    //           projectName={project.name}
    //           estimatedCost={project.estimatedCost}
    //           monthlySavings={project.monthlySavings}
    //           currentSavings={project.currentSavings}
    //           targetDate={project.targetDate}
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <>
    <App/>
    </>
  )
}

export default Home
