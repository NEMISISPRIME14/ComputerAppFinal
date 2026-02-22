import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './ServicesSection.css'
import ServiceCard from './ServiceCard'
import { ServicesContext } from '../Context/ServicesContext'
import { Link } from 'react-router-dom'
export default function ServicesSection() {
   let { slicedServices } = useContext(ServicesContext)
    return (
        <>
            <div className="container-fluid " data-aos="fade-in" data-aos-duration="1000">
                <div className="container d-flex align-items-center flex-column bg-dark text-white rounded-4 p-4 ">
                    <div className="container d-flex flex-md-row flex-column justify-content-between align-items-center ">
                        <h2 className="text-uppercase my-3 m-md-0" style={{letterSpacing:'4px'}}>top Services</h2>
                        <Link className='btn btn-outline-light my-3 m-md-0' to={'/home/services'}>View All Services<i className=" fa fa-arrow-right"></i></Link>
                    </div>
                    <div className="row p-5 gx-md-5 gy-md-2 gy-3" >
                        {
                            slicedServices.map((service, index) => {
                                return (
                                <ServiceCard service={service}  key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        </>
    )
}
