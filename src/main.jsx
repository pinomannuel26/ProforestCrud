import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Crud from './Components/Crud.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Crud />
  </StrictMode>,
)
