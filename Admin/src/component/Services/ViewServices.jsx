import React, { useContext, useEffect, useState } from 'react'
import { ServicesContext } from '../Context/ServicesContext'
import Swal from 'sweetalert2';
import axios from 'axios';
import serCss from './Services.module.css'
import { Link } from 'react-router-dom';

export default function ViewServices() {
    let { ServicesData, setServicesData, getServices } = useContext(ServicesContext)
    let [search, setSearch] = useState('')
    useEffect(() => {
        getServices()
    }, [])
    let filteredServices = search ? ServicesData.filter(s => s.name.toLowerCase().includes(search.toLowerCase())) : ServicesData
    
    let deleteService = async (id) => {
        try {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Do you want to delete this service?',
                confirmButtonColor: '#ffbf00ff',
                cancelButtonColor: '#d33',
                showCancelButton: true,
                cancelButtonText: 'No, Keep It',
                confirmButtonText: 'Yes, Delete'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let response = await axios.delete(`http://localhost:3000/services/deleteservice?id=${id}`);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Service Deleted',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    getServices();
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    if (!ServicesData) return <div>Loading...</div>;
    return (
        <>
            <h2 className="text-center text-uppercase fw-bold h1 mb-5">Services</h2>
            <div className='container text-end d-flex justify-content-between align-items-center'>
                <div className="search-bar w-75">
                    <input type="text" className="form-control p-2 fw-bold shadow-lg" placeholder="Search for a service..." onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Link className="btn btn-success text-uppercase text-white fw-bold fs-5 " to='/admin/services/add'>ADD SERVICE</Link>
            </div>
            <div className="container my-5 p-4 bg-dark rounded-4">
                <table className="table table-hover table-borderless">
                    <thead>
                        <tr className="text-center align-middle p-5">
                            <th scope="col" className='bg-transparent text-secondary p-4'>Image</th>
                            <th scope="col" className='bg-transparent text-secondary'>Service Name</th>
                            <th scope="col" className='bg-transparent text-secondary'>Description</th>
                            <th scope="col" className='bg-transparent text-secondary'>Price</th>
                            <th scope="col" className='bg-transparent text-secondary'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredServices.map((service, index) => {
                                return (
                                    <tr key={index} className="text-center align-middle border border-secondary">
                                        <td className={`${serCss.serviceImage} bg-transparent text-light`}>
                                            <img src={service.image} alt="service" className="" />
                                        </td>
                                        <td className="bg-transparent text-light">
                                            {service.name}
                                        </td>
                                        <td className="bg-transparent text-light">
                                            {service.description}
                                        </td>
                                        <td className="bg-transparent text-light">
                                            {service.price} - EGP
                                        </td>

                                        <td className="bg-transparent text-light">
                                            <Link className="btn btn-warning text-uppercase text-white fw-bold fs-5 my-2 mx-2" to={`/admin/services/edit/${service.id}`}><i className="fa-solid fa-pen"></i></Link>
                                            <button className="btn btn-danger text-uppercase text-white fw-bold fs-5 my-2" onClick={() => deleteService(service.id)}><i className="fa-solid fa-trash"></i></button>
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
