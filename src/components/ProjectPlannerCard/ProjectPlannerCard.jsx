import React, { useState } from 'react'

const ProjectPlannerCard = ({
  projectName,
  estimatedCost,
  monthlySavings,
  currentSavings,
  targetDate,
}) => {
  // Calcular meses restantes hasta la fecha del objetivo
  const calculateMonthsRemaining = () => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffInMonths =
      (target.getFullYear() - today.getFullYear()) * 12 +
      (target.getMonth() - today.getMonth())
    return diffInMonths > 0 ? diffInMonths : 0 // Asegurarse que no sea negativo
  }

  // Calcular si el objetivo es alcanzable
  const calculateStatus = () => {
    const monthsRemaining = calculateMonthsRemaining()
    const neededSavings = estimatedCost - currentSavings
    const totalPossibleSavings = monthsRemaining * monthlySavings

    // Evaluar estado del proyecto basado en el tiempo y ahorros
    if (totalPossibleSavings >= neededSavings) {
      return 'green' // Buen camino
    } else if (
      totalPossibleSavings > 0 &&
      totalPossibleSavings < neededSavings
    ) {
      return 'yellow' // Necesitas revisar
    } else {
      return 'red' // Imposible lograrlo
    }
  }

  const statusColor = calculateStatus()

  return (
    <div
      className='project-card'
      style={{
        border: `2px solid ${statusColor}`,
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <h2>{projectName || 'Nombre del Proyecto'}</h2>
      <p>
        <strong>Objetivo de Ahorro:</strong> €{estimatedCost}
      </p>
      <p>
        <strong>Ahorros Actuales:</strong> €{currentSavings}
      </p>
      <p>
        <strong>Ahorros Mensuales:</strong> €{monthlySavings}
      </p>
      <p>
        <strong>Fecha Límite:</strong>{' '}
        {new Date(targetDate).toLocaleDateString()}
      </p>

      <div
        style={{
          backgroundColor: statusColor,
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        Estado del Objetivo:{' '}
        {statusColor === 'green'
          ? 'Posible'
          : statusColor === 'yellow'
          ? 'Revisar Ahorros'
          : 'Imposible'}
      </div>
    </div>
  )
}

export default ProjectPlannerCard
