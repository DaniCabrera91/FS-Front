import React, { useState } from 'react'
import { Input } from 'antd'

const UserSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <Input
      placeholder='Buscar usuario por nombre o DNI'
      value={searchTerm}
      onChange={handleChange}
      style={{ marginBottom: 16 }}
    />
  )
}

export default UserSearch
