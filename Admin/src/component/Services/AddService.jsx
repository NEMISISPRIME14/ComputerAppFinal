import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function AddService() {
    let navigate = useNavigate()
    let { register, handleSubmit, formState: { errors }} = useForm()
    let onSubmit = async (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to add this service?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--bs-success)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add!'
        }).then(async (result) => {
            try {
                let response = await axios.post(`http://localhost:3000/services/addservice`, data);
                Swal.fire({
                    title: 'Success',
                    text: 'Service added successfully',
                    icon: 'success',
                })
                navigate('/admin/services/view')
            } catch (error) {
                console.log(error);
            }
        })
    }
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center w-100">
        <div className="row  p-5">
          <div className="col-md-12 bg-light mx-auto p-4 rounded-4">
            <h3 className="text-center text-uppercase fw-bold h1 mb-5">Add Service</h3>
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-6 ">
                <label htmlFor="name" className="form-label">Name</label>
                {errors.name && <span className="text-danger mx-3">{errors.name.message}</span>}
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp"  {...register('name', { required: 'Please enter a name' })} />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="description" className="form-label">Description</label>
                {errors.description && <span className="text-danger mx-3">{errors.description.message}</span>}
                <input type="text" className="form-control" id="description" aria-describedby="emailHelp" {...register('description', { required: 'Please enter a description' })} />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="price" className="form-label">Price</label>
                {errors.price && <span className="text-danger mx-3">{errors.price.message}</span>}
                <input type="text" className="form-control" id="price" aria-describedby="emailHelp"  {...register('price', { required: 'Please enter a price' })} />
              </div>
              <div className="col-md-6">
                <label htmlFor="image" className="form-label">Image</label>
                {errors.image && <span className="text-danger mx-3">{errors.image.message}</span>}
                <input type="text" className="form-control" id="image" aria-describedby="emailHelp"   {...register('image', { required: 'Please enter an image' })} />
              </div>
              <div className="col-md-12 text-center">
                <button type='submit' className="btn btn-success text-uppercase text-white fw-bold fs-5 my-2" >ADD SERVICE <i className="fa-solid fa-check"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>    
    </>
  )
}
