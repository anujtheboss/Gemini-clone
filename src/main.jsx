import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/context.jsx'

createRoot(document.getElementById('root')).render(
  // multiple components are nested inside this contextProvider 
  <ContextProvider>
    <App />
  </ContextProvider>,
)
