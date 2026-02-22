import React, { use } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { UsersContext } from '../Context/UsersContext';
import { useContext } from 'react';
import { MechanicsContext } from '../Context/MechanicsContext';
import { ServicesContext } from '../Context/ServicesContext';
import { AppointmentsContext } from '../Context/AppointmentsContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PendingAppointments() {
    let navigate = useNavigate()
    let { UsersData } = useContext(UsersContext)
    let { MechanicsData } = useContext(MechanicsContext)
    let { ServicesData } = useContext(ServicesContext)
    let { AppointmentsData, getAppointments } = useContext(AppointmentsContext)
    let [pendingAppointments, setPendingAppointments] = useState([])
    let onClickDeleteAppointment = async (id) => {
        try {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Do you want to cancel this appointment?',
                confirmButtonColor: '#ffbf00ff',
                cancelButtonColor: '#d33',
                showCancelButton: true,
                cancelButtonText: 'No, Keep It',
                confirmButtonText: 'Yes, Delete'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let response = await axios.delete(`http://localhost:3000/appointments/deleteappointment?id=${id}`);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Appointment Deleted',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    getAppointments();
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAppointments()
    }, [])
    useEffect(() => {
        if (AppointmentsData) {
            let pendingAppointments = AppointmentsData.filter(a => a.appointment_status === 'pending')
            setPendingAppointments(pendingAppointments)
        }
    }, [AppointmentsData])
    useEffect(() => {
        if (pendingAppointments.length === 0) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No pending appointments',
                showConfirmButton: false,
                timer: 1000
            });
        }else{
          
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `There is ${pendingAppointments.length} pending appointments`,
            showConfirmButton: false,
            timer: 2000
        });
        }
    }, [pendingAppointments])
    return (
        <>
        <h2 className="text-center text-uppercase fw-bold h1 mb-5">Pending Appointments</h2>
            <div className="container my-5 p-3 bg-dark rounded-4">
                <table className="table table-hover table-borderless">
                    <thead>
                        <tr className="text-center align-middle ">
                            <th scope="col" className='bg-transparent text-secondary'>User Name</th>
                            <th scope="col" className='bg-transparent text-secondary'>Service</th>
                            <th scope="col" className='bg-transparent text-secondary'>Date</th>
                            <th scope="col" className='bg-transparent text-secondary'>Price</th>
                            <th scope="col" className='bg-transparent text-secondary'>Mechanic Name</th>
                            <th scope="col" className='bg-transparent text-secondary'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pendingAppointments.map((appointment, index) => {
                                const user = UsersData?.find(u => u.id === appointment.user_id);
                                const service = ServicesData?.find(s => s.id === appointment.service_id);
                                const mechanic = MechanicsData?.find(m => m.id === appointment.mechanic_id);

                                return (
                                    <tr key={index} className="text-center align-middle border border-secondary">
                                        <td className="bg-transparent text-light">
                                            {user ? `${user.first_name} ${user.last_name}` : "Unknown User"}
                                        </td>
                                        <td className="bg-transparent text-light">
                                            {service?.name || "Unspecified"}
                                        </td>
                                        <td className="bg-transparent text-light">
                                            {new Date(appointment.appointment_date).toLocaleString()}
                                        </td>
                                        <td className="bg-transparent text-light">
                                            {service?.price || "-"}
                                        </td>
                                        <td className="bg-transparent text-light">
                                            {mechanic?.name || "Unassigned"}
                                        </td>
                                        <td className='bg-transparent text-light'>
                                            <button className="btn btn-danger me-2" onClick={() => onClickDeleteAppointment(appointment.id)}><i className="fa-solid fa-cancel"></i></button>
                                            <button className="btn btn-warning" onClick={() => navigate(`/admin/usersappointments/edit/${appointment.id}`)}><i className="fa-solid fa-edit" ></i></button>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
