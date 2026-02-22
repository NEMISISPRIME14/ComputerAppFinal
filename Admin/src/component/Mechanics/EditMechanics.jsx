import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { MechanicsContext } from '../Context/MechanicsContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function EditMechanics() {
  let { id } = useParams()
  let { MechanicsData, getMechanics } = useContext(MechanicsContext)
  let { register, handleSubmit, formState: { errors }, reset } = useForm()
  let navigate = useNavigate()
  let [mechanic, setMechanics] = useState(null)
  useEffect(() => {
    getMechanics()
  }, [])
  useEffect(() => {
    if (MechanicsData) {
      const filter = MechanicsData.find(m => m.id === Number(id))
      setMechanics(filter)
    }
  }, [MechanicsData,id])
  let onSubmit = async (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to update this mechanic?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-success)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await axios.put(`http://localhost:3000/mechanics/updatemechanic?id=${id}`, data);
          Swal.fire({
            title: 'Success',
            text: 'Mechanic updated successfully',
            icon: 'success',
          })
          navigate('/admin/mechanics/view')
        } catch (error) {
          console.log(error);
        }
      }
    })
  }
  useEffect(() => {
    if (mechanic) {
      reset({
        name: mechanic.name,
        email: mechanic.email,
        phone: mechanic.phone,
        specialization: mechanic.specialization,
        rating: mechanic.rating,
      })
    }
  }, [mechanic, reset])
  if (!MechanicsData) return <div>Loading...</div>;

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center w-100">
        <div className="row  p-5">
          <div className="col-md-12 bg-light mx-auto p-4 rounded-4">
            <h3 className="text-center text-uppercase fw-bold h1 mb-5">Edit Mechanic</h3>
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-6 ">
                <label htmlFor="name" className="form-label">Name</label>
                {errors.name && <span className="text-danger mx-3">{errors.name.message}</span>}
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp"  {...register('name', { required: 'Please enter a name' })} />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="email" className="form-label">Email</label>
                {errors.email && <span className="text-danger mx-3">{errors.email.message}</span>}
                <input type="text" className="form-control" id="email" aria-describedby="emailHelp"  {...register('email', { required: 'Please enter an email' })} />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="phone" className="form-label">Phone</label>
                {errors.phone && <span className="text-danger mx-3">{errors.phone.message}</span>}
                <input type="text" className="form-control" id="phone" aria-describedby="emailHelp"  {...register('phone', { required: 'Please enter a phone' })} />
              </div>
              <div className="col-md-6">
                <label htmlFor="specialization" className="form-label">Specialization</label>
                {errors.specialization && <span className="text-danger mx-3">{errors.specialization.message}</span>}
                <input type="text" className="form-control" id="specialization" aria-describedby="emailHelp" {...register('specialization', { required: 'Please enter a specialization' })} />
              </div>
              <div className="col-md-6">
                <label htmlFor="rating" className="form-label">Rating</label>
                {errors.rating && <span className="text-danger mx-3">{errors.rating.message}</span>}
                <input type="text" className="form-control" id="rating" aria-describedby="emailHelp"  {...register('rating', { required: 'Please enter a rating' })} />
              </div>
              <div className="col-md-12 text-center">
                <button type='submit' className="btn btn-success text-uppercase text-white fw-bold fs-5 my-2" >UPDATE MECHANIC <i className="fa-solid fa-check"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
