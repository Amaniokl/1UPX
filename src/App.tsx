import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OnboardingProvider } from './components/context/OnboardingContext';

import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import OurMissionPage from './pages/OurMissionPage';
import OnboardingStep1 from './pages/OnboardingPage1';
import OnboardingStep2 from './pages/OnboardingPage2';
import OnboardingStep4 from './pages/OnboaedingPage4';
import { OnboardingStep3 } from './pages/OnboardingPage3';
import Login from './components/Login'; // Import the new Login component

import './index.css';
import OnboardingNavbar from './components/OnboardingNavbar';

// ✅ Web3 Providers
import { Web3AuthProvider } from './providers/Web3AuthProvider';
import Web3ContextProvider from './providers/Web3ContextProvider';
import { Web3Context, CONNECT_STATES } from './providers/Web3ContextProvider';
import { useContext } from 'react';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const web3Context = useContext(Web3Context);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (web3Context.status !== CONNECT_STATES.CONNECTED) {
      navigate('/login');
    }
  }, [web3Context.status, navigate]);
  
  if (web3Context.status !== CONNECT_STATES.CONNECTED) {
    return null;
  }
  
  return children;
};

// Homepage with optional onboarding prompt
const HomePageWithAuth = () => {
  const web3Context = useContext(Web3Context);
  const navigate = useNavigate();
  const isSignedIn = web3Context.status === CONNECT_STATES.CONNECTED;

  return (
    <>
      <HomePage />
      {isSignedIn && (
        <div className="fixed bottom-4 right-4 z-50 bg-blue-900 text-white p-4 rounded-xl shadow-lg border border-blue-500/30 max-w-sm">
          <h3 className="font-bold mb-2">Continue Onboarding</h3>
          <p className="text-sm mb-3">You have an onboarding process in progress.</p>
          <button
            onClick={() => navigate('/onboarding1')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Continue Setup
          </button>
          <button
            className="ml-2 text-blue-300 hover:text-white text-sm"
            onClick={() => {
              const banner = document.querySelector('.fixed.bottom-4.right-4');
              if (banner) banner.classList.add('hidden');
            }}
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
};

// Redirect after sign-in
const AfterSignInRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/onboarding1');
  }, [navigate]);
  return null;
};

function App() {
  return (
    <Web3AuthProvider>
      <Web3ContextProvider>
        <OnboardingProvider>
          <main>
            <Routes>
              <Route path="/" element={<HomePageWithAuth />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/after-sign-in" element={<AfterSignInRoute />} />

              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/our-mission" element={<OurMissionPage />} />

              {/* Protected routes */}
              <Route 
                path="/onboarding1" 
                element={
                  <ProtectedRoute>
                    {/* <OnboardingNavbar /> */}
                    <OnboardingStep1 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding2" 
                element={
                  <ProtectedRoute>
                    {/* <OnboardingNavbar /> */}
                    <OnboardingStep2 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding3" 
                element={
                  <ProtectedRoute>
                    {/* <OnboardingNavbar /> */}
                    <OnboardingStep3 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding4" 
                element={
                  <ProtectedRoute>
                    {/* <OnboardingNavbar /> */}
                    <OnboardingStep4 />
                  </ProtectedRoute>
                } 
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </OnboardingProvider>
      </Web3ContextProvider>
    </Web3AuthProvider>
  );
}

export default App;
