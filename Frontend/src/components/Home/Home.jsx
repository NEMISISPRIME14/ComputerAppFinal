import React, { useEffect, useState } from 'react'
import HeroSection from '../HeroSection/HeroSection'
import ServicesSection from '../ServicesSection/ServicesSection'
import WhatWeOffer from '../WhatWeOffer/WhatWeOffer'
import Feedback from '../Feedback/Feedback'

export default function Home() {
    
    return (
        <>
            <div className="container-fluid p-0 h-100" data-aos="fade-up" data-aos-duration="1000">
                <HeroSection />
                <ServicesSection />
                <WhatWeOffer />
                <Feedback />
            </div >
        </>
    )
}
