import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('phone', data.phone)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('confirm_password', data.confirm_password)
      formData.append('role', data.role)
      formData.append('national_id', data.national_id[0])

      await axios.post('http://localhost:3000/users/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signed up successfully you can login now ❤",
        showConfirmButton: false,
        timer: 1000
      })

      navigate('/login')
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || error?.response?.data || 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 col-10 bg-light mx-auto p-4 rounded-4">
        <h3 className="text-center text-uppercase fw-bold h1 mb-5">Join us now</h3>

        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              {...register('name', { required: 'Full Name is required' })}
            />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="text-danger">{errors.password.message}</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              {...register('confirm_password', { required: 'Confirm Password is required' })}
            />
            {errors.confirm_password && <span className="text-danger">{errors.confirm_password.message}</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="national_id" className="form-label">National ID</label>
            <input
              type="file"
              className="form-control"
              id="national_id"
              accept=".jpg,.jpeg,.png,.pdf"
              {...register('national_id', { required: 'National ID is required' })}
            />
            {errors.national_id && <span className="text-danger">{errors.national_id.message}</span>}
          </div>

          <div className="col-md-6">
            <label htmlFor="role" className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              {...register('role', { required: 'Role is required' })}
            />
            {errors.role && <span className="text-danger">{errors.role.message}</span>}
          </div>

          <div className="mb-4">
            <Link to="/login">Already Have an account?</Link>
          </div>

          <button type="submit" className="btn btn-warning text-uppercase text-white fw-bold w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

