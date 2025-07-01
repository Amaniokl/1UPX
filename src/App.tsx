import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OnboardingProvider } from './components/context/OnboardingContext';

import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import OurMissionPage from './pages/OurMissionPage';
import OnboardingStep1 from './pages/OnboardingPage1';
import OnboardingStep2 from './pages/OnboardingPage2';
import OnboardingStep4 from './pages/OnboaedingPage4';
import OnboardingStep3  from './pages/OnboardingPage3';
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
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <HomePage />
      
      {isSignedIn && (
        <div className="fixed top-20 right-6 z-50 flex flex-col items-end">
          {/* Pulsing notification indicator */}
          <div className="relative mb-3">
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              aria-label="Continue onboarding"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </button>
          </div>
          
          {/* Tooltip/Popup */}
          <div 
            className={`transform transition-all duration-300 origin-top-right ${
              showTooltip 
                ? 'scale-100 opacity-100 translate-y-0' 
                : 'scale-95 opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <div className="w-72 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden">
              {/* Header with gradient */}
              <div className="relative h-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNTEuOTUtMi44MyAyLjI0bC0uMDEzLS4wMDFMMjkuMDQgMzIuMjVsLTQuNDMtMTIuMTgtLjAxLS4wMzVDMjQuMjcgMTguOTIgMjMuMTQgMTggMjEuODUgMThsLTQuOTguMDFjLTEuMzggMC0yLjUgMS4xMi0yLjUgMi41cy0uMDEgMi41IDEuMzcgMi41aDMuMjJsNy40NSAyMC4xNWMuNDMgMS4xNSAxLjUzIDEuOTIgMi43OCAxLjkyIDEuMjUgMCAyLjM1LS43NyAyLjc4LTEuOTJsNy40NS0yMC4xNWgzLjIyYzEuMzggMCAyLjUtMS4xMiAyLjUtMi41cy0xLjEyLTIuNS0yLjUtMi41bC00Ljk4LS4wMXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start mb-3">
                  <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-2 rounded-lg">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-cyan-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-bold text-sm">Continue Your Setup</h3>
                    <p className="text-slate-400 text-xs mt-1">Your onboarding process is waiting for completion.</p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-800/50 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full w-1/3"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="text-slate-400 hover:text-slate-300 text-xs transition-colors"
                  >
                    Dismiss
                  </button>
                  
                  <button
                    onClick={() => navigate('/onboarding1')}
                    className="group relative inline-flex items-center px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></span>
                    <span className="relative">Continue Setup</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3.5 w-3.5 ml-1.5 relative group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                    <OnboardingNavbar />
                    <OnboardingStep1 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding2" 
                element={
                  <ProtectedRoute>
                    <OnboardingNavbar />
                    <OnboardingStep2 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding3" 
                element={
                  <ProtectedRoute>
                    <OnboardingNavbar />
                    <OnboardingStep3 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding4" 
                element={
                  <ProtectedRoute>
                    <OnboardingNavbar />
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
