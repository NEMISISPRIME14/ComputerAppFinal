import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../Sidebar/SideBar'
import { AdminAuthContext } from '../Context/AuthAdminContext';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(true);
  let { LoginData } = useContext(AdminAuthContext)
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])
  useEffect(() => {
    if (LoginData) {
      document.title = `${LoginData?.name} - Admin`
    }
  }, [LoginData])
  return (
    <>
      <div className={`content d-flex ${collapsed ? "content-collapsed" : "content-expanded"}`}>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="admin-content w-100">
          <Outlet />
        </div>
      </div>
    </>
  )
}
