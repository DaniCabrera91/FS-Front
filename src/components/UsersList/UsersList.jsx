import React from 'react'

const UsersList = ({ users, onDeleteUser, onEditUser }) => {
  console.log('Usuarios en UsersList:', users) // Verifica si hay usuarios aquí

  return (
    <div>
      <h3>Lista de Usuarios</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              {' '}
              {user.name} {user.surname}
              <button onClick={() => onDeleteUser(user._id)}>Eliminar</button>
              <button onClick={() => onEditUser(user._id)}>Editar</button>
            </li>
          ))
        ) : (
          <li>No hay usuarios registrados.</li>
        )}
      </ul>
    </div>
  )
}

export default UsersList
