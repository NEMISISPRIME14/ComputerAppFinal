import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Authlayout from './components/Authlayout/Authlayout'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Masterlayout from './components/Masterlayout/Masterlayout'
import { ToastContainer } from 'react-toastify'
import Home from './components/Home/Home'
import AllServices from './components/ServicesSection/AllServices'
import UserProfile from './components/UserProfile/UserProfile'
import UserData from './components/UserData/UserData'
import UpdateUserData from './components/UpdateUserData/UpdateUserData'
import AddUserCar from './components/AddUserCar/AddUserCar'
import UserCars from './components/UserCars/UserCars'
import AllCars from './components/UserCars/AllCars'
import EditUserCar from './components/EditUserCar/EditUserCar'
import ServicePage from './components/ServicePage/ServicePage'
import Faq from './components/Faq/Faq'
import UserAppointment from './components/UserAppointment/UserAppointment'
import AddUserAppointment from './components/AddUserAppointment/AddUserAppointment'


function App() {

  let routes = createBrowserRouter([
    {
      path: '/',
      element: <Authlayout />,
      children: [
        { index: true, element: <Login /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> }
      ]
    }, {
      path: '/home',
      element: <Masterlayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "profile",
          element: <UserProfile />,
          children: [
            { index: true, element: <UserData /> },
            { path: "update", element: <UpdateUserData /> },

            {
              path: "appointments",
              element: <UserAppointment />,
            },
            {
              path: "appointments/add",
              element: <AddUserAppointment />,
            },
            {
              path: "appointments/add/:id",
              element: <AddUserAppointment />,
            },
          ],
        },
        ,
        { path: 'services', element: <AllServices /> },
        { path: 'service/:id', element: <ServicePage /> },

        {
          path: 'usercars',
          element: <UserCars />,
          children: [
            { index: true, element: <AllCars /> },
            { path: 'addcar', element: <AddUserCar /> },
            { path: 'editcar/:id', element: <EditUserCar /> }
          ]
        }, {
          path: 'faq',
          element: <Faq />
        }
      ]
    },
  ])


  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
