import React, { useContext, useEffect } from 'react'
import { AdminAuthContext } from '../Context/AuthAdminContext'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function EditProfile() {
  let { LoginData, saveLoginData } = useContext(AdminAuthContext)
  let { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: LoginData?.name,
      phone: LoginData?.phone,
      email: LoginData?.email,
      password: LoginData?.password,
    }
  });
  let navigate = useNavigate()
  let onsubmit = async (data) => {
    try {
      let response = await axios.put(
        `http://localhost:3000/admin/updateadmin?id=${LoginData?.id}`,
        data
      );

      localStorage.setItem("token", response.data.token);
      saveLoginData();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        navigate("/admin/adminprofile/view");
      });

    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

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
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100 w-100">
        <div className="row  p-5">
          <div className="col-md-12 bg-light mx-auto p-4 rounded-4">
            <h3 className="text-center text-uppercase fw-bold h1 mb-5">Admin Profile</h3>
            <form className="row g-3" onSubmit={handleSubmit(onsubmit)}>
              <div className="col-md-6 mb-3">
                <label htmlFor="Name" className="form-label">Name</label>
                <input type="text" className="form-control" id="Name" aria-describedby="emailHelp"  {...register('name', { required: 'Name is required' })} />
                {errors.name && <span className="text-danger">{errors.name.message}</span>}
              </div>
              <div className="col-md-6 ">
                <label htmlFor="Phone" className="form-label">Phone</label>
                <input type="text" className="form-control" id="Phone" aria-describedby="emailHelp"   {...register('phone', { required: 'Phone is required' })} />
                {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
              </div>
              <div className="col-md-6 ">
                <label htmlFor="Email" className="form-label">Email</label>
                <input type="text" className="form-control" id="Email" aria-describedby="emailHelp"    {...register('email', { required: 'Email is required' })} />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
              </div>
              <div className="col-md-6">
                <label htmlFor="Pass" className="form-label">Password</label>
                <input type="text" className="form-control" id="Pass"  {...register('password', { required: 'Password is required' })} />
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
              </div>
              <div className="col-md-6">
                <button type='submit' className="btn btn-warning text-uppercase text-white fw-bold fs-5 my-2" >Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
