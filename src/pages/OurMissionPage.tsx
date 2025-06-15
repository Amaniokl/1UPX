// src/pages/PrivacyPage.tsx
import React from 'react';
// import Navbar from '../components/Navbar';
import PrivacyOwnership from '../components/Privacy';
import Footer from '../components/Footer';
import ScrollObserver from '../components/ScrollObserver';
import FloatingChatbot from '../components/FloatingChatBot';
import OurMission from '../components/OurMission';

function OurMissionPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollObserver>
        <FloatingChatbot />
        {/* <Navbar /> */}
        <OurMission />
        <Footer />
      </ScrollObserver>
    </div>
  );
}

export default OurMissionPage;