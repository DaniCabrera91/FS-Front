import React from 'react' // Importar React es esencial
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import './App.scss'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
