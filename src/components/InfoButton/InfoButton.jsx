import React, { useState } from 'react'
import iconPaths from '../../utils/iconPath'
import Modal from '../Modal/Modal'

const InfoButton = ({ ariaLabel, title, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className='p-1 focus:outline-none'
        aria-label={ariaLabel}
      >
        <img
          src={iconPaths.info}
          alt={ariaLabel}
          className='inline-block w-4 h-4 ml-2'
        />
      </button>
      <Modal isOpen={isOpen} title={title} onClose={handleClose}>
        {content}
      </Modal>
    </>
  )
}

export default InfoButton
