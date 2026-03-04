import React from 'react'
import styled from 'styled-components'
import HeroSection from '../HeroSection/HeroSection'
import ServicesSection from '../ServicesSection/ServicesSection'
import WhatWeOffer from '../WhatWeOffer/WhatWeOffer'
import Feedback from '../Feedback/Feedback'
import Card from '../appartments/card'
import Button from '../button/button'
import './home.css'
import Territories from '../territories/Territories'
import Features from '../features/features'



export default function Home() {
  return (
    <div>
      <HeroSection />
      {/* Your apartment cards */}
      <Card />
      {/* Popular Territories section */}
      <Territories />
      {/* about us mainly ya3ny */}
      <Features />
    </div>
  );
}

const PageWrapper = styled.div``;