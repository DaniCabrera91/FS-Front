import React from 'react'
import iconPaths from '../../utils/iconPath'

const InfoButton = ({ ariaLabel }) => {
  const handleClick = (e) => {
    e.stopPropagation() //para que solo se ejecute este onclick y no el de la carta en el que está colocado

    switch (ariaLabel) {
      case 'Gastos e Ingresos estimados info button':
        console.log('Abriendo modal de información Gastos e Ingresos estimados info button...')
        break
      case 'Settings Button':
        console.log('Abriendo modal de configuración...')
        break
      default:
        console.log('Botón sin acción específica')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="p-1 focus:outline-none"
      aria-label={ariaLabel}
    >
      <img src={iconPaths.info} alt={ariaLabel} className="inline-block w-4 h-4 ml-2" />
    </button>
  )
}

export default InfoButton
