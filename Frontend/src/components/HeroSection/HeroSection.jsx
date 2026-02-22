import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import './HeroSection.css'
import homeCar from '../../assets/images/homeCar.png'
import { useNavigate } from 'react-router-dom'
export default function HeroSection() {
    let { LoginData } = useContext(AuthContext)
    let navigate = useNavigate()
    const handleClick = () => {
        navigate('/home/profile/appointments/add')
    }
    return (
        <>
            <div id='homesec' className="row py-3 hero-content-container" style={{ height: 'fit-content' }}>
                <div className=" col-md-6 d-flex justify-content-between align-items-center">
                    <div className="hero-content mx-auto text-md-start text-center" data-aos="fade-right" data-aos-duration="1000">
                        <h2 className='text-uppercase'>Welcome,</h2>
                        <h3 className="text-uppercase ">{LoginData?.first_name} {LoginData?.last_name}</h3>
                        <p className="text-muted">Welcome to the Car Repair System</p>
                        <button className="btn btn-outline-dark mt-2 p-3 fs-5" onClick={handleClick}>APPLY FOR A SERVICE</button>
                    </div>
                </div>
                <div className="col-md-6 position-relative overflow-hidden ">
                    <div className="image-container" >
                        <img src={homeCar} alt="" className='carHero h-100 position-absolute' data-aos="fade-left" data-aos-duration="1000"/>
                    </div>
                </div>
            </div>
        </>
    )
}
