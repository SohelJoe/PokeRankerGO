import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Main JSX File
import App from './App.jsx'
// Root CSS File
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
