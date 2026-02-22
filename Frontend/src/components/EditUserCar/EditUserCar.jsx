import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext'

export default function EditUserCar() {
    let { LoginData } = useContext(AuthContext)
    let { id } = useParams()
    let navigate = useNavigate()

    let [model, setModel] = useState('')
    let [brand, setBrand] = useState('')
    let [year, setYear] = useState('')
    let [image, setImage] = useState('')

    let getCar = async () => {
        try {
            let response = await axios.get(`http://localhost:3000/userscars?id=${id}`)
            let car = response.data[0]
            setBrand(car.brand)
            setModel(car.model)
            setYear(car.year)
            setImage(car.car_image)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load car data"
            })
        }
    }

    useEffect(() => {
        getCar()
    }, [id])

    let handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.put(`http://localhost:3000/userscars/updateusercar?id=${id}`, {
                brand,
                model,
                year,
                car_image: image
            })

            Swal.fire({
                title: 'Success',
                text: 'Car updated successfully',
                icon: 'success'
            })

            navigate('/home/usercars')

        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error'
            })
        }
    }
    return (
        <>
            <div className="container d-flex justify-content-around align-items-center py-5">
                <form onSubmit={handleSubmit}>
                    <div className="row w-100 mx-auto g-3 bg-light p-5 rounded-5 fs-5">
                        <div className="col-12">
                            <h2 className="text-uppercase  fs-1 fw-bold">Update Your Car</h2>
                        </div>
                        <div className="col-6">
                            <label htmlFor="carimage" className="form-label text-muted fs-6">Car Image</label>
                            <input type="text" className="form-control p-3" value={image} id='carimage' onChange={(e) => setImage(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="carbrand" className="form-label text-muted fs-6">Car Brand</label>
                            <input type="text" className="form-control p-3" value={brand} id='carbrand' onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="carmodel" className="form-label text-muted fs-6">Car Model</label>
                            <input type="text" className="form-control p-3" value={model} id='carmodel' onChange={(e) => setModel(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="caryear" className="form-label text-muted fs-6">Car Year</label>
                            <input type="text" className="form-control p-3" value={year} id='caryear' onChange={(e) => setYear(e.target.value)} />
                        </div>
                        <div className="col-12 text-md-start text-center">
                            <button className="btn btn-warning w-100 text-white fs-5 fw-bold text-uppercase" type="submit">Update Car</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
