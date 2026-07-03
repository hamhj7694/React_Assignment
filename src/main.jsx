import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import PageRouter from './Router/PageRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageRouter />
  </StrictMode>,
)
