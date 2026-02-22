import React, { useContext, useEffect, useState } from 'react'
import { ServicesContext } from '../Context/ServicesContext'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import servCss from './ServicePage.module.css'
export default function ServicePage() {
    let{id}=useParams()
    let [service, setService] = useState([])
    let getService = async () => {
        try {
            let response = await axios.get(`http://localhost:3000/services?id=${id}`);
            setService(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getService();
    }, [id])
  return (
    <>
    <div className="container">
        <div className={`row ${servCss.serviceContainer} m-auto my-3`}>
            <div className="col-md-6 h-100">
                <img src={service.image} className={`img-sm-fluid ${servCss.serviceImage}`} alt={service.name} />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center text-center text-md-start align-items-center align-items-md-start">
                <h1 className="fw-bold my-4">{service.name}</h1>
                <p className="text-muted fs-5 my-0 my-md-2">{service.description}</p>
                <p className="text-success fs-1 fw-bold">{service.price} EGP</p>
                <Link className="btn btn-outline-dark p-3 text-uppercase fw-bold" style={{width:'fit-content'}} to={`/home/profile/appointments/add/${service.id}`}>Reserve Now</Link>
            </div>
        </div>
    </div>
    </>
  )
}
