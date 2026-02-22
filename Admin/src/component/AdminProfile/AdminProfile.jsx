import React, { useContext } from 'react'
import { AdminAuthContext } from '../Context/AuthAdminContext'
import { Link, Outlet } from 'react-router-dom'
export default function AdminProfile() {
  let { LoginData } = useContext(AdminAuthContext
  )
  return (
    <>
      <Outlet />
    </>
  )
}
