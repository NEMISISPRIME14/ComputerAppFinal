import React, { useEffect, useState } from 'react'
import axios from 'axios'
import faqImg from '../../assets/images/faqImg.jpeg'
export default function Faq() {
    let [faqs, setFaq] = useState([])
    let getFaq = async () => {
        let response = await axios.get(`http://localhost:3000/faq`)
        setFaq(response.data)
    }
    useEffect(() => {
        getFaq()
    }, [])
    return (
        <>
        <h2 className="text-uppercase text-center h1 fw-bold my-3">Frequently Asked Questions</h2>
            <div className="row">
                <div className="col-md-4 h-50 rounded-5 overflow-hidden m-auto">
                    <img src={faqImg} alt="faq" className="rounded-circle w-100 h-100" />
                </div>
                <div className="col-md-8 p-4">
                    <div className="accordion" id="accordionExample">
                        {faqs.map((faq, index) => (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${index}`}
                                    >
                                        {faq.question}
                                    </button>
                                </h2>

                                <div
                                    id={`collapse${index}`}
                                    className="accordion-collapse collapse bg-light"
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <p className="card-text">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
