import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './UserProfile.css'

export default function UserProfile() {
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="container m-auto g-3 p-5 rounded-5 bg-dark">
                       <div className="nav nav-pills fs-5 fs-md-4 list-unstyled text-white gap-4 justify-content-center">
                            <li><i className='fa fa-user'></i><Link className="text-white ms-1 text-decoration-none" to={'/home/profile/'}>My Profile</Link></li><span className="d-md-none d-inline-block">|</span>
                            <li><i className="fa-solid fa-pen-to-square"></i><Link className="text-white ms-1 text-decoration-none" to={'/home/profile/update'}>Update Profile</Link></li>
                            <li><i className="fa-solid fa-clipboard-list"></i><Link className="text-white ms-1 text-decoration-none" to={'/home/profile/appointments'}>My Appointments</Link></li>

                        </div> 
                    </div>
                </div>
                <div className="col-md-12">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
