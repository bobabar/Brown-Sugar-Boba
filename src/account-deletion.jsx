import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AccountDeletion from './AccountDeletion.jsx'
import './legal.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccountDeletion />
  </StrictMode>,
)
