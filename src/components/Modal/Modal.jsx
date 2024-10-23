import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.scss'

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null

  const handleButtonClick = (event) => {
    event.stopPropagation()
    event.preventDefault()
    onClose()
  }

  const handleOverlayClick = (event) => {
    event.stopPropagation()
    onClose()
  }

  const handleModalClick = (event) => {
    event.stopPropagation()
  }

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content' onClick={handleModalClick}>
        <div className='modal-header'>
          <h2 className='modal-title'>{title}</h2>
          <button className='close-button' onClick={handleButtonClick}>
            &times;
          </button>
        </div>
        <div>{children}</div>
        <div className='modal-footer'>
          <button className='accept-button' onClick={handleButtonClick}>
            Entendido
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root'),
  )
}

export default Modal
