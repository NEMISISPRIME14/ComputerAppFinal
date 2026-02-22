import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function AddUserCar() {
    let { LoginData } = useContext(AuthContext)
    let navigate = useNavigate()
    let [model, setModel] = useState('')
    let [brand, setBrand] = useState('')
    let [year, setYear] = useState('')
    let [image, setImage] = useState('')
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let response = await axios.post(`http://localhost:3000/userscars/addusercar?user_id=${LoginData?.id}`, {
                user_id: LoginData?.id,
                brand,
                model,
                year,
                car_image: image
            });
            if (!model || !brand || !year || !image) {
                Swal.fire({
                    title: 'Error',
                    text: 'Make sure all fields are filled',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return
            }
            navigate('/home/usercars')
            Swal.fire({
                title: 'Success',
                text: 'Car added successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }
    return (
        <>
            <div className="container d-flex justify-content-around align-items-center py-5">
                <form action="">
                    <div className="row w-100 mx-auto g-3 bg-light p-5 rounded-5 fs-5">
                        <div className="col-12">
                            <h2 className="text-uppercase  fs-1 fw-bold">Add New Car</h2>
                        </div>
                        <div className="col-6">
                            <label htmlFor="carimage" className="form-label text-muted fs-6">Car Image</label>
                            <input type="text" className="form-control p-3" id='carimage' onChange={(e) => setImage(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="carbrand" className="form-label text-muted fs-6">Car Brand</label>
                            <input type="text" className="form-control p-3" id='carbrand' onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="carmodel" className="form-label text-muted fs-6">Car Model</label>
                            <input type="text" className="form-control p-3" id='carmodel' onChange={(e) => setModel(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="caryear" className="form-label text-muted fs-6">Car Year</label>
                            <input type="text" className="form-control p-3" id='caryear' onChange={(e) => setYear(e.target.value)} />
                        </div>
                        <div className="col-12 text-md-start text-center">
                            <button className="btn btn-warning w-100 text-white fs-5 fw-bold text-uppercase" type="submit" onClick={handleSubmit}>Add Car</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
