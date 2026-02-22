import React from 'react'
import { AppointmentsContext } from '../Context/AppointmentsContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function UserAppointments() {
  let { AppointmentsData } = useContext(AppointmentsContext)
  let navigate = useNavigate()
  
  useEffect(() => {
  }, [AppointmentsData])
  return (
    <>
    <h2 className="text-center text-uppercase fw-bold fs-1">Users Appointments</h2>
      <div className="container d-flex justify-content-around align-items-center py-5">
        <button className="btn btn-dark fw-bold fs-5 text-uppercase" onClick={()=>navigate('/admin/usersappointments/pending')}>Pending</button>
        <button className="btn btn-success fw-bold fs-5 text-uppercase" onClick={()=>navigate('/admin/usersappointments/accepted')}> Accepted</button>
        <button className="btn btn-danger fw-bold fs-5 text-uppercase" onClick={()=>navigate('/admin/usersappointments/deleted')}>Cancelled</button>
      </div>
      <Outlet />
    </>
  )
}
