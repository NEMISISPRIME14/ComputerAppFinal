import React from "react";
import "./home.css";

import HeroSection from "../HeroSection/HeroSection";
import Card from "../appartments/card";
import Territories from "../territories/Territories";
import Features from "../features/features";


import AnimateOnScroll from "../AnimateOnScroll";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <AnimateOnScroll preset="fadeUp" duration={0.9}>
        <Card />
      </AnimateOnScroll>

      <AnimateOnScroll preset="fadeLeft" duration={1}>
        <Territories />
      </AnimateOnScroll>

      <AnimateOnScroll preset="fadeRight" duration={1}>
        <Features />
      </AnimateOnScroll>
    </div>
  );
}