import React from 'react'
import './Keyboard.styled.scss'

const Keyboard = ({ onKeyPress }) => {
  const keys = ['5', '0', '1', '4', '2', '7', '3', '8', '9', '6'] // Números
  const deleteKey = 'C' // Borrar

  const handleKeyPress = (key) => {
    onKeyPress(key)
  }

  return (
    <div className='keyboard'>
      <div className='keypad'>
        {keys.map((key, index) => (
          <button
            key={index}
            onClick={() => handleKeyPress(key)}
            className='key'
          >
            {key}
          </button>
        ))}
      </div>
      <button
        className='key delete-key' // Clave especial para el botón de borrar
        onClick={() => handleKeyPress(deleteKey)}
      >
        {deleteKey}
      </button>
    </div>
  )
}

export default Keyboard
