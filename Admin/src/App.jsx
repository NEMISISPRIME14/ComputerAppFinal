import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLogin from './component/AdminLogin/AdminLogin'
import AdminLayout from './component/AdminLayout/AdminLayout'
import UsersList from './component/UsersList/UsersList'
import ViewUser from './component/UsersList/ViewUser'
import UsersAppointments from './component/UsersAppointments/UserAppointments'
import EditAppointment from './component/UsersAppointments/EditAppointment'
import DeletedAppointments from './component/UsersAppointments/DeletedAppointments'
import AdminProfile from './component/AdminProfile/AdminProfile'
import EditProfile from './component/AdminProfile/EditProfile'
import ViewProfile from './component/AdminProfile/ViewProfile'
import { ToastContainer } from 'react-toastify'
import AcceptedAppointments from './component/UsersAppointments/AcceptedAppointments'
import PendingAppointments from './component/UsersAppointments/PendingAppointments'
import Messages from './component/Messages/Messages'
import Services from './component/Services/Services'
import EditService from './component/Services/EditService'
import ViewServices from './component/Services/ViewServices'
import AddService from './component/Services/AddService'
import Mechanics from './component/Mechanics/Mechanics'
import ViewMechanics from './component/Mechanics/ViewMechanics'
import EditMechanics from './component/Mechanics/EditMechanics'
import AddMechanics from './component/Mechanics/AddMechanics'


function App() {
  let routes = createBrowserRouter([
    {
      path: '/',
      element: <AdminLogin />,
      children: [
        { index: true, element: <AdminLogin /> },
        { path: '/adminlogin', element: <AdminLogin /> }
      ]
    }, {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <ViewProfile /> },
        {
          path: 'userslist',
          element: <UsersList />,
          children: [
            { index: true, element: <ViewUser /> },
            { path: 'view', element: <ViewUser /> },
          ]
        },
        {
          path: 'usersappointments',
          element: <UsersAppointments />,
          children: [
            { index: true, element: <PendingAppointments /> },
            { path: 'pending', element: <PendingAppointments /> },
            { path: 'accepted', element: <AcceptedAppointments /> },
            { path: 'deleted', element: <DeletedAppointments /> },
            { path: 'edit/:id', element: <EditAppointment /> },
          ]
        },
        {
          path: 'adminprofile',
          element: <AdminProfile />,
          children: [
            { index: true, element: <AdminProfile /> },
            { path: 'view', element: <ViewProfile /> },
            { path: 'edit', element: <EditProfile /> },
          ]
        },
        {
          path: 'messages',
          element: <Messages />,
        },
        {
          path: 'services',
          element: <Services />,
          children: [
            { index: true, element: <ViewServices /> },
            { path: 'view', element: <ViewServices /> },
            { path: 'edit/:id', element: <EditService /> },
            { path: 'add', element: <AddService /> },
          ]
        },
        {
          path:'mechanics',
          element:<Mechanics/>,
          children:[
            {index:true,element:<ViewMechanics/>},
            {path:'view',element:<ViewMechanics/>},
            {path:'edit/:id',element:<EditMechanics/>},
            {path:'add',element:<AddMechanics/>}
          ]
        }
      ]
    }
  ])
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
