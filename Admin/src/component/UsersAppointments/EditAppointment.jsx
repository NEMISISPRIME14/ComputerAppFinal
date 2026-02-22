import React, { useContext, useEffect, useState } from 'react'
import { AdminAuthContext } from '../Context/AuthAdminContext'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AppointmentsContext } from '../Context/AppointmentsContext'
import { UsersContext } from '../Context/UsersContext'
import { ServicesContext } from '../Context/ServicesContext'
import { MechanicsContext } from '../Context/MechanicsContext'

export default function EditAppointment() {
  let { id } = useParams()
  let { register, handleSubmit, formState: { errors }, reset } = useForm()
  let { AppointmentsData, getAppointments } = useContext(AppointmentsContext)
  let [filterAppointment, setFilterAppointment] = useState(null)
  let { UsersData } = useContext(UsersContext)
  let [user, setUser] = useState(null)
  let { ServicesData } = useContext(ServicesContext)
  let [service, setService] = useState(null)
  let { MechanicsData } = useContext(MechanicsContext)
  let navigate = useNavigate()
  let onSubmit = async (data) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to update this appointment?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'var(--bs-success)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await axios.put(
            `http://localhost:3000/appointments/updateappointment?id=${id}`, data
          );
          setTimeout(() => {
            navigate('/admin/usersappointments/accepted');
          }, 150);
          Swal.fire({
            title: 'Success',
            text: 'Appointment updated successfully',
            icon: 'success',
          })
        }
      })
      console.log("DATA SENT:", data);

    } catch (error) {

    }
  }
  useEffect(() => {
    getAppointments()
  }, [])
  useEffect(() => {
    if (AppointmentsData) {
      let filter = AppointmentsData.find(a => a.id === Number(id))
      setFilterAppointment(filter)
    }
  }, [AppointmentsData, id])

  useEffect(() => {
    if (filterAppointment) {
      let user = UsersData.find(u => u.id === Number(filterAppointment.user_id))
      setUser(user)
    }
  }, [filterAppointment, UsersData])

  useEffect(() => {
    if (filterAppointment) {
      let service = ServicesData.find(s => s.id === Number(filterAppointment.service_id))
      setService(service)
    }
  }, [filterAppointment, ServicesData])

  useEffect(() => {
    if (filterAppointment && user) {
      reset({
        user_id: user.id,
        service_id: service.id,
        mechanic_id: mechanic.id,
        price: service.price,
        appointment_date: filterAppointment.appointment_date,
      })
    }
  }, [filterAppointment, user, service, reset])
  if (!filterAppointment || !user || !service) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center w-100">
        <div className="row  p-5">
          <div className="col-md-12 bg-light mx-auto p-4 rounded-4">
            <h3 className="text-center text-uppercase fw-bold h1 mb-5">Accept Appointment</h3>
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-6 ">
                <label htmlFor="User" className="form-label">User Name</label>
                <input type="text" className="form-control" id="User" aria-describedby="emailHelp" value={`${user.first_name} ${user.last_name}`} disabled />
                <input type="hidden" value={user.id} {...register("user_id")} />
              </div>
              <div className="col-md-6 mb-3" >
                <label htmlFor="service" className="form-label">Service Name</label>
                <input type="text" className="form-control" id="service" aria-describedby="emailHelp" value={`${service.name}`} disabled />
                <input type="hidden" value={service.id} {...register("service_id")} />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="Price" className="form-label">Price</label>
                <input type="text" className="form-control" id="Price" aria-describedby="emailHelp" {...register('price')} disabled />
              </div>
              <div className="col-md-6">
                <label htmlFor="mechanic" className="form-label">Mechanic</label>
                {errors.mechanic_id && <span className="text-danger mx-3">{errors.mechanic_id.message}</span>}
                <select className="form-select form-control" id="mechanic" {...register("mechanic_id", { required: 'Please select a mechanic' })}>
                  <option value="">Select mechanic...</option>
                  {MechanicsData.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.specialization}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 ">
                <label htmlFor="date" className="form-label">Appointment Date</label>
                <input type="text" className="form-control" id="date" {...register('appointment_date')} disabled />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="status" className="form-label">Appointment Status</label>
                <input type="text" className="form-control" id="status" value={'ACCEPTED'} disabled />
                <input type="hidden" value="accepted" {...register("appointment_status")} />
              </div>
              <div className="col-md-12 text-center">
                <button type='submit' className="btn btn-success text-uppercase text-white fw-bold fs-5 my-2" >ACCEPT APPOINTMENT <i className="fa-solid fa-check"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
