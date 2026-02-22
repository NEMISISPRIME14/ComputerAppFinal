import React, { use, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ServicesContext } from '../Context/ServicesContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddUserAppointment() {
    let { id } = useParams()
    let { LoginData } = useContext(AuthContext)
    let { services } = useContext(ServicesContext)
    let [serviceChosen, setServiceChosen] = useState(id)
    let [date, setDate] = useState('')
    let [time, setTime] = useState('')
    let [userId, setUserId] = useState(LoginData?.id)
    let hours = []

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split("T")[0];
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7); 
    const max = maxDate.toISOString().split("T")[0];

    let navigate = useNavigate()
    let addAppointment = async (e) => {
        e.preventDefault()

        try {
            let formattedDate = `${date} ${time}:00`;
            let response = await axios.post('http://localhost:3000/appointments/addappointment', {
                user_id: userId,
                service_id: serviceChosen,
                appointment_date: formattedDate,
            })
            navigate('/home/profile/appointments')
            Swal.fire({
                title: 'Appointment Added',
                text: 'Your appointment has been added successfully. And one of our mechanics will be in touch with you shortly.',
                icon: 'success',
                confirmButtonText: 'Ok',
            })
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    title: 'Error',
                    text: 'Please fill all the fields',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        }

    }
    for (let i = 12; i < 21; i++) {
        hours.push(i)
    }
    console.log(hours)
    useEffect(() => {
        if (LoginData?.id) {
            setUserId(LoginData?.id);
        }
    }, [LoginData])

    return (
        <div className="container d-flex justify-content-around align-items-center py-5">
            <div className="row w-100 mx-auto g-3 bg-light p-5 rounded-5 fs-5">
                <div className="col-12">
                    <h2 className="text-uppercase  fs-1 fw-bold">Apply for an Appointment</h2>
                </div>
                <div className="col-6">
                    <label htmlFor="firstname" className="form-label text-muted fs-6">User Name</label>
                    <input type="text" className="form-control p-3" id='firstname' value={LoginData?.first_name + ' ' + LoginData?.last_name || ''} disabled />
                </div>
                <div className="col-6">
                    <label className="form-label text-muted fs-6">Choose Service</label>
                    <select
                        className="form-select p-3 fw-bold"
                        value={serviceChosen}
                        onChange={(e) => setServiceChosen(e.target.value)}
                    >
                        <option value="">-- Select a service --</option>
                        {services.map((s, index) => (
                            <option key={index} value={s.id} >{s.name} | {s.price} EGP</option>
                        ))}
                    </select>
                </div>
                <div className="col-6">
                    <label htmlFor="appointmentdate" className="form-label text-muted fs-6">Appointment Date</label>
                    <input type="date" className="form-control p-3" id='appointmentdate' onChange={(e) => setDate(e.target.value)} min={minDate} max={max} />
                </div>
                <div className="col-6">
                    <label className="form-label text-muted fs-6">Appointment Time (WORKING HOURS 12PM - 8PM)</label>
                    <select
                        className="form-select p-3"
                        onChange={(e) => setTime(e.target.value)}
                    >
                        <option value="">-- Choose Time --</option>
                        {
                            hours.map((h, index) => (
                                <option key={index} value={h} >{h}:00</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" onClick={addAppointment}>Add Appointment</button>
                </div>
            </div>
        </div>
    )
}
