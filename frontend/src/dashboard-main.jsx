import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('dashboard-root')).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)