import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import WhyWeDo from './components/WhyWeDo';
import HowWeDo from './components/HowWeDo';
import Benefits from './components/Benefits';
import WhoShouldJoin from './components/WhoShouldJoin';
import CallToAction from './components/CallToAction';
import SignUpForm from './components/SignUpForm';
import Footer from './components/Footer';
import ScrollObserver from './components/ScrollObserver';
import PrivacyOwnership from './components/Privacy';
import FloatingChatbot from './components/FloatingChatBot';
function App() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollObserver>
        <FloatingChatbot/>
        <Navbar />
        <Hero />
        <PrivacyOwnership/>
        <WhatWeDo />
        <WhyWeDo />
        <HowWeDo />
        <Benefits />
        <WhoShouldJoin />
        {/* <CallToAction /> */}
        <SignUpForm />
        <Footer />
      </ScrollObserver>
    </div>
  );
}

export default App;