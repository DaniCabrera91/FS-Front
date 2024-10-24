import React, { useState } from 'react'

const ProjectPlannerCard = ({
  projectName,
  estimatedCost,
  monthlySavings,
  currentSavings,
  targetDate,
}) => {
  const [isTaktikActive, setIsTaktikActive] = useState(false)

  const handleTaktikSwitch = () => {
    setIsTaktikActive(!isTaktikActive)
  }

  const calculateMonthsRemaining = () => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffInMonths =
      (target.getFullYear() - today.getFullYear()) * 12 +
      (target.getMonth() - today.getMonth())
    return diffInMonths > 0 ? diffInMonths : 0
  }

  const calculateStatus = () => {
    const monthsRemaining = calculateMonthsRemaining()
    const neededSavings = estimatedCost - currentSavings
    const totalPossibleSavings = monthsRemaining * monthlySavings

    if (totalPossibleSavings >= neededSavings) {
      return 'on-track'
    } else if (
      totalPossibleSavings > 0 &&
      totalPossibleSavings < neededSavings
    ) {
      return 'needs-review'
    } else {
      return 'off-track'
    }
  }

  const status = calculateStatus()

  return (
    <div
      className={`project-card card-transition ${
        status === 'off-track'
          ? 'card-off-track'
          : status === 'needs-review'
          ? 'card-needs-review'
          : 'card-on-track'
      }`}
    >
      <div className='header-section flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>
          {projectName || 'Nombre del Proyecto'}
        </h2>
        <span
          className={`status-indicator ${
            status === 'on-track'
              ? 'indicator-green'
              : status === 'needs-review'
              ? 'indicator-yellow'
              : 'indicator-red'
          }`}
          aria-label={`Estado del proyecto: ${
            status === 'on-track'
              ? 'Posible'
              : status === 'needs-review'
              ? 'Revisar Ahorros'
              : 'Imposible'
          }`}
        ></span>
      </div>

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

      <div className='status-message bg-gray-100 text-sm p-2 mt-3 rounded'>
        Estado del Objetivo:{' '}
        {status === 'on-track'
          ? 'Posible'
          : status === 'needs-review'
          ? 'Revisar Ahorros'
          : 'Imposible'}
      </div>

      <div className='taktik-container'>
        <span className='taktik-label'>Ahorro Taktik</span>
        <label className='switch'>
          <input
            type='checkbox'
            checked={isTaktikActive}
            onChange={handleTaktikSwitch}
          />
          <span className='slider round'></span>
        </label>
      </div>
    </div>
  )
}

export default ProjectPlannerCard
