import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min'
import AdminAuthContextProvider from './component/Context/AuthAdminContext.jsx'
import UsersContextProvider from './component/Context/UsersContext.jsx'
import AppointmentsContextProvider from './component/Context/AppointmentsContext.jsx'
import MechanicsContextProvider from './component/Context/MechanicsContext.jsx'
import ServicesContextProvider from './component/Context/ServicesContext.jsx'
import MessagesContextProvider from './component/Context/MessagesContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthContextProvider>
      <UsersContextProvider>
        <MechanicsContextProvider>
          <ServicesContextProvider>
          <AppointmentsContextProvider>
            <MessagesContextProvider>
            <App />
            </MessagesContextProvider>
          </AppointmentsContextProvider>
          </ServicesContextProvider>
        </MechanicsContextProvider>
      </UsersContextProvider>
    </AdminAuthContextProvider>

  </StrictMode>,
)
