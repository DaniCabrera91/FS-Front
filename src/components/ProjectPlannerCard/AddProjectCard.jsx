import React from 'react'

const AddProjectCard = ({ onClick }) => {
  return (
    <div
      className="carousel-cell mx-5 mb-5 project-card card-transition flex flex-col justify-center items-center cursor-pointer border-dashed border-2 border-gray-300 h-full"
      onClick={onClick}
    >
      <h2 className="text-3xl font-bold text-gray-500">+</h2>
      <p className="text-gray-600">Crear nuevo proyecto</p>
    </div>
  )
}

export default AddProjectCard
