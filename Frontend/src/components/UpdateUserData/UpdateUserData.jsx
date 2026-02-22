import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

export default function UpdateUserData() {
    let { LoginData, setLoginData } = useContext(AuthContext)

    let navigate = useNavigate()
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        if (LoginData) {
            setFirstname(LoginData.first_name || '')
            setLastname(LoginData.last_name || '')
            setAddress(LoginData.address || '')
            setPhone(LoginData.phone || '')
            setEmail(LoginData.email || '')
            setPassword(LoginData.password || '')
        }
    }, [LoginData])
    let handleUpdate = async () => {
        try {
            let response = await axios.put(
                `http://localhost:3000/users/updateuser?id=${LoginData?.id}`, { first_name, last_name, address, phone, email, password })
            localStorage.setItem("token", response.data.token);
            const newUserData = jwtDecode(response.data.token);
            setLoginData(newUserData);
            console.log("Updated:", response.data);
            Swal.fire({
                title: 'Success',
                text: "Your profile has been updated successfully!",
                icon: 'success',
              })
            navigate('/home/profile')
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }
    let handleClick=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to update your profile?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#ffbf00ff',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update!'
          })
          .then((result) => {
            if (result.isConfirmed) {
              handleUpdate()
            }
          })
    }
    return (
        <>
            <div className="container d-flex justify-content-around align-items-center py-5">
                <div className="row w-100 mx-auto g-3 bg-light p-5 rounded-5 fs-5">
                    <div className="col-12">
                        <h2 className="text-uppercase  fs-1 fw-bold">User Profile</h2>
                    </div>
                    <div className="col-6">
                        <label htmlFor="first_name" className="form-label text-muted fs-6">First Name</label>
                        <input type="text" className="form-control p-3" id='first_name' value={first_name} onChange={(e) => { setFirstname(e.target.value) }} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastname" className="form-label text-muted fs-6">Last Name</label>
                        <input type="text" className="form-control p-3" id='lastname' value={last_name} onChange={(e) => { setLastname(e.target.value) }} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="address" className="form-label text-muted fs-6">Address</label>
                        <input type="text" className="form-control p-3" id='address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="phone" className="form-label text-muted fs-6">Phone</label>
                        <input type="text" className="form-control p-3" id='phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label text-muted fs-6">Email</label>
                        <input type="text" className="form-control p-3" id='email' value={email} disabled />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label text-muted fs-6">Password</label>
                        <input type="text" className="form-control p-3" id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="col-12 text-md-start text-center">
                        <button className="btn btn-warning w-100 text-white" to={'/home/profile'} onClick={handleClick}>Save Changes</button>
                    </div>
                </div>
            </div>
        </>
    )
}
