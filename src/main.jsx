import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // This imports the CSS
import { TripProvider } from './context/TripContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TripProvider>
      <App />
    </TripProvider>
  </React.StrictMode>
)