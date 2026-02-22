import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'

export default function AllCars() {
    let { LoginData } = useContext(AuthContext)
    let navigate = useNavigate()
    let [cars, setCars] = useState([])
    let getCars = async () => {
        try {
            let response = await axios.get(`http://localhost:3000/userscars/getusercars?user_id=${LoginData?.id}`);
            setCars(response.data);
            if (response.data.length === 0) {
                const result = await Swal.fire({
                    title: 'No Cars Found',
                    text: 'You have no cars added yet',
                    icon: 'warning',
                    confirmButtonColor: '#ffbf00ff',
                    cancelButtonColor: '#d33',
                    showCancelButton: true,
                    cancelButtonText: 'Other Time',
                    confirmButtonText: 'Add New Car'
                });
                if (result.isConfirmed) {
                    navigate('/home/usercars/addcar');
                }
            }
        } catch (error) {
        }
    }
    let onClickDeleteCar = async (id) => {
        try {
            let response = await axios.delete(`http://localhost:3000/userscars/deleteusercar?id=${id}`);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Car Deleted',
                showConfirmButton: false,
                timer: 1000
            });
            getCars();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (LoginData?.id) {
            getCars();
        }
    }, [LoginData])
    return (
        <>
            <div className="container-fluid">
                <div className="cars-top-container container d-flex justify-content-md-end justify-content-center align-items-center my-4">
                <Link className='text-center btn btn-primary ' to={'/home/usercars/addcar'} style={{width:'fit-content'}}>Add New Car</Link>
                </div>
                <table className="container table table-bordered table-hover ">
                    <thead className='align-middle'>
                        <tr className='text-center '>
                            <th scope="col" className='p-4'>Image</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Model</th>
                            <th scope="col">Year</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {cars.map((car, index) => {
                            return <tr className='text-center align-middle py-5' key={index}>
                                <td scope='col' className='py-3 px-0' ><img src={car.car_image} alt={car.brand} style={{ width: 'auto', maxHeight: '75px' }} /></td>
                                <td scope='col'>{car.brand}</td>
                                <td scope='col'>{car.model}</td>
                                <td scope='col'>{car.year}</td>
                                <td scope='col'>
                                    <button className='btn btn-danger me-2' onClick={() => onClickDeleteCar(car.id)}>Delete</button>
                                    <button className='btn btn-warning' onClick={() => navigate(`/home/usercars/editcar/${car.id}`)}>Edit</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
