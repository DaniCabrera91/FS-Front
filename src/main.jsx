import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App.jsx'
import './main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='phone'>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </StrictMode>,
)
