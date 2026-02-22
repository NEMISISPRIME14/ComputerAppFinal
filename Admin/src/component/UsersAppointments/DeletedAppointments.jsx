import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UsersContext } from '../Context/UsersContext';
import { useContext } from 'react';
import { MechanicsContext } from '../Context/MechanicsContext';
import { ServicesContext } from '../Context/ServicesContext';
import Swal from 'sweetalert2';
export default function DeletedAppointments() {
  let { UsersData } = useContext(UsersContext)
  let { MechanicsData } = useContext(MechanicsContext)
  let { ServicesData } = useContext(ServicesContext)
  let [deletedAppointments, setDeletedAppointments] = useState([])
  let getDeletedAppointments = async () => {
    try {
      let response = await axios.get(`http://localhost:3000/appointments/deleted`);
      setDeletedAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDeletedAppointments()
  }, [])
  useEffect(() => {
    if (deletedAppointments.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No deleted appointments',
        showConfirmButton: false,
        timer: 1000
      });
    }else{
      Swal.fire({
      position: 'center',
      icon: 'error',
      title: `There is ${deletedAppointments.length} deleted appointments`,
      showConfirmButton: false,
      timer: 2000
    });
    }
  }, [deletedAppointments])
  return (
    <>
    <h2 className="text-center text-uppercase fw-bold h1 mb-5">Deleted Appointments</h2>
      <div className="container my-5 p-3 bg-dark rounded-4">
        <table className="table table-hover table-borderless">
          <thead>
            <tr className="text-center align-middle ">
              <th scope="col" className='bg-transparent text-secondary'>User Name</th>
              <th scope="col" className='bg-transparent text-secondary'>Service</th>
              <th scope="col" className='bg-transparent text-secondary'>Date</th>
              <th scope="col" className='bg-transparent text-secondary'>Price</th>
              <th scope="col" className='bg-transparent text-secondary'>Mechanic Name</th>
            </tr>
          </thead>
          <tbody>
            {deletedAppointments.map((appointment, index) => {
              const mechanic = MechanicsData.find(m => m.id === appointment.mechanic_id);
              const user = UsersData.find(u => u.id === appointment.user_id);
              const service = ServicesData.find(s => s.id === appointment.service_id);
              return (
                <tr key={index} className=" text-center align-middle border border-secondary">
                  <td className='bg-transparent text-light py-4'>{user.first_name} {user.last_name}</td>
                  <td className='bg-transparent text-light'>{service?.name }</td>
                  <td className='bg-transparent text-light'>{appointment.price}</td>
                  <td className='bg-transparent text-light'>  {new Date(appointment.appointment_date).toLocaleString()}</td>
                  <td className='bg-transparent text-light'>
                    {mechanic?.name || 'Unspecified'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
