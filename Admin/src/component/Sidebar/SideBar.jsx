import React, { useContext } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SideBar.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AdminAuthContext } from '../Context/AuthAdminContext'
export default function SideBar({ collapsed, setCollapsed }) {
  const [active, setActive] = useState(0)
  let { LoginData } = useContext(AdminAuthContext)
  let navigate = useNavigate()
  let toggling = () => {
    setCollapsed(!collapsed)
    console.log(collapsed)
  }
  let activeMenuItem = (n) => {
    setActive(n)
  }
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await axios.post(
          "http://localhost:3000/admin/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    }
    localStorage.removeItem("token");
    navigate("/");
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1000
    });
  };
  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffbf00ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          handleLogout()
        }
      })
  }
  return (
    <>
      <div className={collapsed ? "sidebar-container-collapsed container " : 'sidebar-container container'}>
        <h1 className="sidebar-title me-auto text-light text-uppercase">Car repair</h1>
        <div className="sidebar-header rounded-circle">
          <button className="btn" onClick={toggling}>
            {collapsed ? <i className="fa-solid fa-chevron-left"></i> : <i className="fa-solid fa-chevron-right"></i>}
          </button>
        </div>
        <div className="profile d-flex flex-column justify-content-center align-items-center">
          <h2 className={collapsed ? 'h6 text-light' : 'h4 text-light'}>{LoginData?.name}</h2>
          <h6 className='fw-base text-warning'>Admin</h6>
          <h6 className={collapsed ? 'd-none' : 'text-warning'}>{LoginData?.email}</h6>
        </div>
        <Sidebar collapsed={collapsed} className="ps-sidebar-container text-light">
          <Menu className="mx-auto">
            <MenuItem icon={<i className="fa-regular fa-user"></i>} className={`menu-item ${collapsed ? 'menu-item-collapsed' : 'menu-item-uncollapsed'} ${active == 1 ? 'isActive' : ''}`} onClick={() => activeMenuItem(1)} component={<Link to='adminprofile/view'></Link>}>Admin Profile</MenuItem>
            <MenuItem icon={<i className="fa fa-users"></i>} className={`menu-item ${collapsed ? 'menu-item-collapsed' : 'menu-item-uncollapsed'} ${active == 2 ? 'isActive' : ''} `} onClick={() => activeMenuItem(2)} component={<Link to='userslist/view'></Link>}>Users List</MenuItem>
            <MenuItem icon={<i className="fa-solid fa-toolbox"></i>} className={`menu-item ${collapsed ? 'menu-item-collapsed' : 'menu-item-uncollapsed'} ${active == 3 ? 'isActive' : ''} `} onClick={() => activeMenuItem(3)} component={<Link to='mechanics'></Link>}>Mechanics List</MenuItem>
            <MenuItem icon={<i className="fa-solid fa-calendar"></i>} className={`menu-item ${collapsed ? 'menu-item-collapsed' : 'menu-item-uncollapsed'} ${active == 4 ? 'isActive' : ''} `} onClick={() => activeMenuItem(4)} component={<Link to='usersappointments/pending'></Link>}>Appointments</MenuItem>
            <MenuItem icon={<i className="fa-solid fa-screwdriver-wrench"></i>} className={`menu-item ${collapsed ? 'menu-item-collapsed' : 'menu-item-uncollapsed'} ${active == 5 ? 'isActive' : ''} `} onClick={() => activeMenuItem(5)} component={<Link to='services'></Link>}>Services</MenuItem>
            <MenuItem icon={<i className="fa-solid fa-envelope"></i>} className={`menu-item ${collapsed ? 'menu-item-collapsed' : 'menu-item-uncollapsed'} ${active == 6 ? 'isActive' : ''} `} onClick={() => activeMenuItem(6)} component={<Link to='messages'></Link>}>Messages</MenuItem>
          </Menu>
        </Sidebar>
        <div className="logout-btn">
            <button className="btn btn-outline-light text-uppercase" onClick={handleClick}>logout </button>
        </div>
      </div>
    </>
  )
}
