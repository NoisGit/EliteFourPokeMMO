import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './team-modal.css'
import './spanish-only.css'
import './desktop-polish.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
