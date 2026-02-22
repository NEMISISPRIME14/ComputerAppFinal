

import React from 'react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service }) {
    return (
        <>
            <div className="col-md-4 col-12 text-start" data-aos="fade-right" data-aos-duration="1000">
                <div className='card m-auto'>
                    <img src={service.image} className="card-img-top" alt={service.name} />
                    <div className="card-body d-flex flex-column justify-content-center">
                        <h5 className="card-title fs-4 fw-bold m-0">{service.name}</h5>
                        <p className="card-text">{service.description}</p>
                        <span className="text-uppercase fs-5 fw-bold ms-auto">{service.price} EGP</span>
                        <Link className="btn btn-dark" to={`/home/service/${service.id}`} onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>View Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
