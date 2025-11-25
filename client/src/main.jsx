import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setAuthToken } from './services/auth'

// If a token exists in localStorage (user stayed logged in), set it on axios defaults so
// API requests include Authorization header after a page reload.
const token = localStorage.getItem('token')
if (token) setAuthToken(token)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
