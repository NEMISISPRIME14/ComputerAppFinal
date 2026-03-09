import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Authlayout from './components/Authlayout/Authlayout'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

import Masterlayout from './components/Masterlayout/Masterlayout'
import Home from './components/Home/Home'

import AllServices from './components/ServicesSection/AllServices'
import ServicePage from './components/ServicePage/ServicePage'

import UserProfile from './components/UserProfile/UserProfile'
import UserData from './components/UserData/UserData'
import UpdateUserData from './components/UpdateUserData/UpdateUserData'
import UserAppointment from './components/UserAppointment/UserAppointment'
import AddUserAppointment from './components/AddUserAppointment/AddUserAppointment'

import UserCars from './components/UserCars/UserCars'
import AllCars from './components/UserCars/AllCars'
import AddUserCar from './components/AddUserCar/AddUserCar'
import EditUserCar from './components/EditUserCar/EditUserCar'

import Faq from './components/Faq/Faq'
import Property from './components/property/property'
import TrackProcess from "./components/trackprocess/TrackProcess";
import ProfileManagement from "./components/ProfileManagement/ProfileManagement";
import RealEstatePlatform from './components/RealEstatePlatform/RealEstatePlatform'


function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Authlayout />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
      ],
    },
    {
      path: '/home',
      element: <Masterlayout />,
      children: [
        { index: true, element: <Home /> },

        // ✅ Track page should be directly under /home
        { path: 'track', element: <TrackProcess /> },
        { path: "profile-management", element: <ProfileManagement /> },

        {
          path: 'profile',
          element: <UserProfile />,
          children: [
            { index: true, element: <UserData /> },
            { path: 'update', element: <UpdateUserData /> },
            { path: 'appointments', element: <UserAppointment /> },
            { path: 'appointments/add', element: <AddUserAppointment /> },
            { path: 'appointments/add/:id', element: <AddUserAppointment /> },
          ],
        },

        { path: 'services', element: <AllServices /> },
        { path: 'service/:id', element: <ServicePage /> },

        {
          path: 'usercars',
          element: <UserCars />,
          children: [
            { index: true, element: <AllCars /> },
            { path: 'addcar', element: <AddUserCar /> },
            { path: 'editcar/:id', element: <EditUserCar /> },
          ],
        },

        { path: 'faq', element: <Faq /> },
        { path: 'property', element: <Property /> },
        { path: "track", element: <TrackProcess /> },

        { path: '*', element: <h1>Page Not Found</h1> },
      ],
    },
    {
      path: '/real-estate',
      element: <RealEstatePlatform />,
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
