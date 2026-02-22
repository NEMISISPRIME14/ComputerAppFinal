import React, { useContext, useEffect, useState } from 'react'
import supportImg from '../../assets/images/carsupport.png'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import Aos from 'aos'
import 'aos/dist/aos.css'
export default function Feedback() {
    Aos.init()
    let { LoginData } = useContext(AuthContext)
    let [message, setMessage] = useState('')
    let [subject, setSubject] = useState('')

    let handleSubmit = async (e) => {
        e.preventDefault()
        if (subject.length < 1) {
            return Swal.fire({
                title: 'Error',
                text: 'Please enter a subject.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }

        if (message.length < 1) {
            return Swal.fire({
                title: 'Error',
                text: 'Please enter a message.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        try {
            let response = await axios.post(`http://localhost:3000/messages/addmessage?user_id=${LoginData?.id}`, {
                user_id: LoginData?.id,
                content: message,
                subject
            })
            Swal.fire({
                title: 'Success',
                text: 'Your feedback has been submitted successfully.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                window.location.reload()
            })
        } catch (error) {

        }
    }
    return (
        <>
            <div className="container-fluid  p-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 p-5" data-aos="zoom-in" data-aos-delay="500">
                            <img src={supportImg} alt="support" className="w-100 h-100 d-block m-auto" />
                        </div>
                        <div className="col-md-6" data-aos="fade-left" data-aos-delay="500">
                            <h1 className="text-center fw-bold mb-3 text-uppercase">Feedback / Support</h1>
                            <p className="text-center text-muted mt-3">
                                We are always looking for ways to improve our services. If you have any feedback or suggestions, please don't hesitate to contact us.
                            </p>
                            <form action="">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
                                    <label htmlFor="floatingInput">Subject</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea className="form-control h-100" id="floatingTextarea" rows="5" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
                                    <label htmlFor="floatingTextarea">Message</label>
                                </div>
                                <button type="submit" className="btn btn-outline-dark p-3 fw-bold w-100" onClick={handleSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
