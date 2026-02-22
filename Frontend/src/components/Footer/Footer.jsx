import React from 'react'
import { Link } from 'react-router-dom'
import footerCss from './Footer.module.css'
import Swal from 'sweetalert2';

export default function Footer() {
    let privacyModel = () => {
        Swal.fire({
            title: 'Privacy Policy',
            text: 'We take your privacy seriously. Please read our privacy policy before using our services.',
            icon: 'info',
            confirmButtonText: 'Ok'
        });
    }
    let termsModel = () => {
        Swal.fire({
            title: 'Terms & Conditions',
            text: 'Please read our terms and conditions before using our services.',
            icon: 'info',
            confirmButtonText: 'Ok'
        });
    }
    return (
        <>
            <div className="container-fluid bg-dark">
                <div className="container pt-5 pb-2">
                    <div className={`row py-3 ${footerCss.footer}`}>
                        <div className="col-md-4">
                            <h2 className="text-uppercase text-white fw-bold mb-3">About Us</h2>
                            <p className="text-secondary">We are a team of car enthusiasts who are passionate about providing the best repairs and services to our customers.</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="text-uppercase text-white fw-bold mb-3">Links</h2>
                            <ul className="list-unstyled ">
                                <li className='mb-2'><Link to="/home" className="text-secondary text-decoration-none" onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link></li>
                                <li className='mb-2'><Link to="/home/profile" className="text-secondary text-decoration-none" onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Profile</Link></li>
                                <li className='mb-2'><Link to="/home/services" className="text-secondary text-decoration-none" onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Services</Link></li>
                                <li className='mb-2'><Link to="/home/profile/appointments" className="text-secondary text-decoration-none" onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>Appointments</Link></li>
                                <li className='mb-2'><Link to="/home/faq" className="text-secondary text-decoration-none" onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}>FAQ</Link></li>
                                <button className="btn btn-outline-primary my-3 me-2" onClick={privacyModel}>Privacy Policy</button>
                                <button className="btn btn-outline-primary" onClick={termsModel}>Terms & Conditions</button>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h2 className="text-uppercase text-white fw-bold mb-3">Contact Us</h2>
                            <p className="text-secondary">Feel free to contact us if you have any questions or concerns.</p>
                            <div className="d-flex align-items-center mt-3 text-secondary gap-2">
                                <i className="fa fa-envelope"></i>
                                <p className=" m-0">info@example.com</p>
                            </div>
                            <div className="d-flex align-items-center mt-3 text-secondary gap-2">
                                <i className="fa fa-phone"></i>
                                <p className=" m-0">+1 (123) 456-7890</p>

                            </div>
                        </div>
                    </div>
                    <p className="text-secondary text-center mt-3">Copyright © 2025 Car Repair System</p>
                </div>
            </div>
        </>
    )
}
