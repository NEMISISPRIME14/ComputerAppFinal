import React, { useContext, useEffect, useState } from 'react'
import { ServicesContext } from '../Context/ServicesContext'
import ServiceCard from './ServiceCard'
import './AllServices.css'
import { Link } from 'react-router-dom'
export default function AllServices() {
  let { services } = useContext(ServicesContext)
  const [search, setSearch] = useState('')
  let filteredServices = services.filter((service) => {
    return service.name.toLowerCase().includes(search.toLowerCase())
  })
  return (
    <>
      <div className="container py-2">
        <div className="container services-search position-relative my-5 w-75">
          <input className="form-control w-100 m-auto p-3 fs-6" type="text" placeholder="Search for a car..." onChange={(e) => { setSearch(e.target.value) }} />
          <div className="search-icon position-absolute">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="row h-100 d-flex align-items-center g-3">
          {filteredServices.length>0?
            filteredServices.map((service, index) => {
              return (
                <ServiceCard service={service} key={index} />
              )
            }):<h4 className="text-center py-5 text-muted">No services found</h4>
          }
        </div>
      </div>
    </>
  )
}
