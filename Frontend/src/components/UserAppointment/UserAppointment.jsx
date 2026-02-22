import React, { useContext, useEffect, useState } from 'react'
import { ServicesContext } from '../Context/ServicesContext'
import { AuthContext } from '../Context/AuthContext'
import { MechanicsContext } from '../Context/MechanicsContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { get } from 'react-hook-form'
import Swal from 'sweetalert2'

export default function UserAppointment() {
  let { services } = useContext(ServicesContext)
  let { LoginData } = useContext(AuthContext)
  let { mechanics } = useContext(MechanicsContext)
  let [appointments, setAppointments] = useState([])
  let navigate = useNavigate()
  let getAppointments = async () => {
    try {
      let response = await axios.get(`http://localhost:3000/appointments/getappointment?user_id=${LoginData?.id}`)
      setAppointments(response.data)
      if (response.data.length === 0) {
        const result = await Swal.fire({
          title: 'No Appointments Found',
          text: 'You have no appointments made yet',
          icon: 'warning',
          confirmButtonColor: '#ffbf00ff',
          cancelButtonColor: '#d33',
          showCancelButton: true,
          cancelButtonText: 'Other Time',
          confirmButtonText: 'Make an Appointment'
        });

        if (result.isConfirmed) {
          navigate('add');
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
  let getServiceName = (service_id) => {
    let serviceName = services.find((s) => s.id === service_id)
    return services ? serviceName.name : 'null';
  }
  let getMechanicName = (mechanic_id) => {
    let mechanic = mechanics.find(m => m.id === mechanic_id);
    return mechanic ? mechanic.name : "Unspecified";
  };

  let onClickDeleteAppointment = async (id) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Do you want to delete this appointment?',
      confirmButtonColor: '#ffbf00ff',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      cancelButtonText: 'No, Keep It',
      confirmButtonText: 'Yes, Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await axios.delete(`http://localhost:3000/appointments/deleteappointment?id=${id}`);
          getAppointments();
        } catch (error) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: "Appointment deleted successfully!",
            showConfirmButton: false,
            timer: 1000
          });
        }
      }
    });

  }

  useEffect(() => {
    if (LoginData?.id) {
      getAppointments()
    }
  }, [LoginData])

  return (
    <>
      <div className="container py-5">
        <div className="appointments-card">

          <div className="table-responsive-wrapper">
            <Link className='text-center btn btn-primary ' to={'add'} style={{ width: 'fit-content' }}>Make an Appointment</Link>

            <table className="modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Mechanic</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{getServiceName(a.service_id)}</td>
                    <td className={!a.mechanic_id ? "missing" : ""}>
                      {getMechanicName(a.mechanic_id)}
                    </td>
                    <td>{new Date(a.appointment_date).toLocaleString()}</td>
                    <td>{a.price}</td>
                    <td>
                      <span className={
                        a.appointment_status === "pending"
                          ? "badge pending"
                          : ["rejected", "cancelled"].includes(a.appointment_status)
                            ? "badge danger"
                            : "badge success"
                      }>
                        {a.appointment_status}
                      </span>
                    </td>
                    <td>
                      <button className='btn btn-danger me-2' onClick={() => onClickDeleteAppointment(a.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  )
}
