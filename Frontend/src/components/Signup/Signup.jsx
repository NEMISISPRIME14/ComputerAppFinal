
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export default function Signup() {
  let { register, handleSubmit, formState: { errors } } = useForm()
  let navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post('http://localhost:3000/users/signup', data);

      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Signed up successfully you can login now ❤",
        showConfirmButton: false,
        timer: 1000
      });
      navigate('/login')

    } catch (error) {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Error",
        text: error.response.data.message,
        showConfirmButton: false,
        timer: 1000
      });
    }
  }
  return (
    <>
      <div className="row">
        <div className="col-md-6 col-10 bg-light mx-auto p-4 rounded-4">
          <h3 className="text-center text-uppercase fw-bold h1 mb-5">Join us now</h3>
          <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <label htmlFor="Name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="Name" {...register('Name', { required: 'Full Name is required' })} />
              {errors.fullname && <span className="text-danger">{errors.name.message}</span>}
            </div>

            <div className="col-md-6">
              <label htmlFor="inputphone4" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" {...register('phone', { required: 'Phone is required' })} />
              {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
            </div>

            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4" {...register('email', { required: 'Email is required' })} />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>

            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" {...register('password', { required: 'Password is required' })} />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </div>

            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">confirm Password</label>
              <input type="password" className="form-control" id="inputPassword4" {...register('confirmpassword', { required: 'Password is required' })} />
              {errors.confirmpassword && <span className="text-danger">{errors.confirmpassword.message}</span>}
            </div>

            <div className="col-md-6">
              <label htmlFor="inputnationalid" className="form-label">national-id</label>
              <input type="file" className="form-control" id="national_id" {...register('national_id', { required: 'national_id is required' })} />
              {errors.NationalId && <span className="text-danger">{errors.NationalId.message}</span>}
            </div>

            <div className="col-md-6">
              <label htmlFor="role" className="form-label">role</label>
              <input type="input" className="form-control" id="role" {...register('role', { required: 'role is required' })} />
              {errors.role && <span className="text-danger">{errors.role.message}</span>}
            </div>

            <div className="mb-4">
              <Link to="/login" className="">Already Have an account?</Link>
            </div>
            <button type="submit" className="btn btn-warning text-uppercase text-white fw-bold w-100">LogIn</button>
          </form>
        </div>
      </div>
    </>
  )
}


