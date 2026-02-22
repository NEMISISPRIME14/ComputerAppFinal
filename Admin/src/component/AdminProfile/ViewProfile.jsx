import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AdminAuthContext } from '../Context/AuthAdminContext'
import { useForm } from 'react-hook-form';

export default function ViewProfile() {
  let { LoginData } = useContext(AdminAuthContext)
  let { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: LoginData?.name || "",
      phone: LoginData?.phone || "",
      email: LoginData?.email || "",
      password: LoginData?.password || "",
    }
  });

  useEffect(() => {
    if (LoginData) {
      reset({
        name: LoginData.name,
        phone: LoginData.phone,
        email: LoginData.email,
        password: LoginData.password,
      })
    }
  }, [LoginData, reset])
  if (!LoginData) return <div>Loading...</div>;
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="row  p-5">
        <div className="col-md-12 bg-light mx-auto p-4 rounded-4">
          <h3 className="text-center text-uppercase fw-bold h1 mb-5">Admin Profile</h3>
          <div className="row g-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={LoginData?.name} disabled />
            </div>
            <div className="col-md-6 ">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" aria-describedby="emailHelp" value={`+2${LoginData?.phone}`} disabled />
            </div>
            <div className="col-md-6 ">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" className="form-control" id="email" aria-describedby="emailHelp" value={LoginData?.email} disabled />
            </div>
            <div className="col-md-6">
              <label htmlFor="pass" className="form-label">Password</label>
              <input type="password" className="form-control" id="pass" value={LoginData?.password} disabled />
            </div>
            <div className="col-md-6">
              <Link className="btn btn-warning text-uppercase text-white fw-bold fs-5 my-2" to={'/admin/adminprofile/edit'}>Update Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
