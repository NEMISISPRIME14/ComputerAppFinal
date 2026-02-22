import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Swal from 'sweetalert2'


export default function UserData() {
    let { LoginData } = useContext(AuthContext)
    let navigate = useNavigate()
    return (
        <>
            <div className="container d-flex justify-content-around align-items-center py-5">
                <div className="row w-100 mx-auto g-3 bg-light p-5 rounded-5 fs-5">
                    <div className="col-12">
                        <h2 className="text-uppercase  fs-1 fw-bold">User Profile</h2>
                    </div>
                    <div className="col-6">
                        <label htmlFor="firstname" className="form-label text-muted fs-6">First Name</label>
                        <input type="text" className="form-control p-3" id='firstname' value={LoginData?.first_name || ''} disabled />
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastname" className="form-label text-muted fs-6">Last Name</label>
                        <input type="text" className="form-control p-3" id='lastname' value={LoginData?.last_name || ''} disabled />
                    </div>
                    <div className="col-6">
                        <label htmlFor="address" className="form-label text-muted fs-6">Address</label>
                        <input type="text" className="form-control p-3" id='address' value={LoginData?.address || ''} disabled />
                    </div>
                    <div className="col-6">
                        <label htmlFor="phone" className="form-label text-muted fs-6">Phone</label>
                        <input type="text" className="form-control p-3" id='phone' value={LoginData?.phone || ''} disabled />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label text-muted fs-6">Email</label>
                        <input type="text" className="form-control p-3" id='email' value={LoginData?.email || ''} disabled />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label text-muted fs-6">Password</label>
                        <input type="password" className="form-control p-3" id='password' value={LoginData?.password || ''} disabled />
                    </div>
                </div>
            </div>
        </>
    )
}
