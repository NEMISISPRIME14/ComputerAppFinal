import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext'
import Swal from 'sweetalert2';

export default function Login({ }) {
  let { saveLoginData } = useContext(AuthContext)
  let { register, handleSubmit, formState: { errors } } = useForm()
  let navigate = useNavigate()
  let onSubmit = async (data) => {
    try {
      let response = await axios.post('http://localhost:3000/users/login', data);
      localStorage.setItem('token', response.data.token);
      saveLoginData()
      navigate('/home');
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Signed in successfully",
        showConfirmButton: false,
        timer: 1000
      });
    } catch (error) {
      console.log('Not Logged In');
      toast.error('Invalid Credentials', {
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 col-10 bg-light mx-auto p-4 rounded-4">
          <h3 className="text-center text-uppercase fw-bold h1 mb-5">Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('email', { required: 'Email is required', })} />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" {...register('password', { required: 'Password is required' })} />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </div>
            <div className="mb-4">
              <Link to="/signup" className="">Don't have an account? Signup</Link>
            </div>
            <button type="submit" className="btn btn-warning text-uppercase text-white fw-bold w-100">LogIn</button>
          </form>

        </div>
      </div>
    </>
  )
}
