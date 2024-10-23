import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import InfoButton from '../InfoButton/InfoButton'

export default function CategoryCard({ name, percentage, amount, type }) {
  const navigate = useNavigate()
  const displayType = type === 'incomes' ? 'ingreso' : 'gasto'

  const handleClick = () => {
    setTimeout(() => {
      navigate(`/category/${name}`)
    }, 250)
  }

  const modalInfo = [
    {
      name: 'Transporte',
      title: 'Piensa en verde',
      content: 'Usa transporte público o comparte viajes. Lleva un registro de gastos para identificar áreas de ahorro.'
    },
    {
      name: 'Salud y Educación',
      title: 'Invierte en salud y educación',
      content: 'Aprovecha programas públicos y busca becas. Crea un fondo de emergencia para gastos médicos.'
    },
    {
      name: 'Gastos Personales',
      title: 'Controla tus gastos',
      content: 'Establece un presupuesto y limita gastos innecesarios. Revisa suscripciones que no usas.'
    },
    {
      name: 'Impuestos y Otros',
      title: 'Planifica tus impuestos',
      content: 'Conoce tus obligaciones fiscales y utiliza deducciones. Consulta con un profesional si es necesario.'
    },
    {
      name: 'Vivienda y Servicios',
      title: 'Gestiona tu vivienda',
      content: 'No destines más del 30% de tus ingresos a vivienda. Busca opciones que se ajusten a este rango.'
    }    
  ]

  const matchedInfo = modalInfo.find((info) => info.name === name)

  return (
    <div
      className='bg-white rounded-lg shadow px-4 py-2 mb-2'
      onClick={handleClick}
    >
      <div className='flex items-center justify-between py-3 border-b last:border-b-0'>
        <div>
          <h3 className='font-semibold text-red-500'>{name}</h3>
          <div className='w-24 h-1 bg-gray-200 mt-1'>
            <div
              className='h-full bg-red-500'
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className='text-sm text-gray-600 mt-1'>
            {percentage}% de tu {displayType} mensual
          </p>
        </div>
        <div className='text-right '>
          <div className='flex justify-between items-center'>

            {matchedInfo ? (
              <InfoButton
                ariaLabel={`${name} category info button`}
                title={matchedInfo.title}
                content={<p>{matchedInfo.content}</p>}
              />
            ) : (
              <InfoButton
                ariaLabel={`${name} category info button`}
                title='Información no disponible'
                content={<p>No hay información detallada para esta categoría.</p>}
              />
            )}

                  
            <ChevronRight className='text-gray-400' />
          </div>
          <div className='flex justify-end'>
            <p className='font-semibold'>{amount}€</p>
          </div>
        </div>
      </div>
    </div>
  )
}
