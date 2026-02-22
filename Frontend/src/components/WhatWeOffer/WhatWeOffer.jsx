import React from 'react'
import './WhatWeOffer.css'
export default function WhatWeOffer() {
    return (
        <>
            <div className="container-fluid">
                <div className="row m-auto px-5">
                    <div className="col-md-4" data-aos="fade-right" data-aos-duration="1000">
                        <div className="card whatCard text-bg-dark my-3 text-center">
                            <div className="card-body">
                                <div className="mb-3"><i className="fa fa-headphones card-icon"></i></div>
                                <h5 className="card-title fw-bold">24/7 Customer Support</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" data-aos="fade-down" data-aos-duration="1000">
                        <div className="card whatCard text-bg-dark my-3 text-center">
                            <div className="card-body">
                                <div className="mb-3"><i className="fa fa-headphones card-icon"></i></div>
                                <h5 className="card-title fw-bold">24/7 Customer Support</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" data-aos="fade-left" data-aos-duration="1000">
                        <div className="card whatCard text-bg-dark my-3 text-center">
                            <div className="card-body">
                                <div className="mb-3"><i className="fa fa-headphones card-icon"></i></div>
                                <h5 className="card-title fw-bold">24/7 Customer Support</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
