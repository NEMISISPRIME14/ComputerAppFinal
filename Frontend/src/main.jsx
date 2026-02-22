import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'
import AuthContextProvider from './components/Context/AuthContext.jsx'
import ServicesContextProvider from './components/Context/ServicesContext.jsx'
import MechanicsContextProvider, { MechanicsContext } from './components/Context/MechanicsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ServicesContextProvider>
        <MechanicsContextProvider>
          <App />
        </MechanicsContextProvider>
      </ServicesContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
