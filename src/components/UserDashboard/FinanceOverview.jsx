import React from 'react'
import { ChevronRight } from 'lucide-react'
import InfoButton from '../InfoButton/InfoButton'

export default function FinanceOverview() {
  return (
    <div className='bg-white rounded-lg p-4 mb-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-sm kbred font-semibold'>
          Gastos e Ingresos estimados
        </h2>
        <div className='flex justify-between items-center'>
          <InfoButton
            ariaLabel='Gastos e Ingresos estimados info button'
            title='¿Quieres saber en que estás gastando tus ahorros?'
            content={
              <p>
                Aquí puedes ver información detallada sobre los gastos e
                ingresos estimados.
              </p>
            }
          />
          <ChevronRight className='w-4 h-4 kbred' />
        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          <p className='text-sm font-semibold'>Ingresos</p>
          <p className='text-lg'>2000€</p>
        </div>
        <div>
          <p className='text-sm font-semibold'>Gastos</p>
          <p className='text-lg'>1000€</p>
        </div>
      </div>
    </div>
  )
}
