// src/pages/HomePage.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
// import WhatWeDo from '../components/WhatWeDo';
// import WhyWeDo from '../components/WhyWeDo';
import HowWeDo from '../components/HowWeDo';
import Benefits from '../components/Benefits';
import WhoShouldJoin from '../components/WhoShouldJoin';
import CallToAction from '../components/CallToAction';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';
import ScrollObserver from '../components/ScrollObserver';
import FloatingChatbot from '../components/FloatingChatBot';
import OurMission from '../components/OurMission';

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollObserver>
        <FloatingChatbot />
        <Navbar />
        <Hero />
        <WhoShouldJoin />
        <HowWeDo />
        {/* <OurMission /> */}
        <Benefits />
        {/* <SignUpForm /> */}
        <Footer />
      </ScrollObserver>
    </div>
  );
}

export default HomePage;