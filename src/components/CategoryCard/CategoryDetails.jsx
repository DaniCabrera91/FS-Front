import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryDetails() {
  const { name } = useParams()

  return (
    <div>
      <h1>Details for {name}</h1>
      {/* Add more details and logic here */}
    </div>
  )
}

export default CategoryDetails
