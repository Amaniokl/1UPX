import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { OnboardingProvider } from './components/context/OnboardingContext';

import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import OurMissionPage from './pages/OurMissionPage';
import OnboardingStep1 from './pages/OnboardingPage1';
import OnboardingStep2 from './pages/OnboardingPage2';
import OnboardingStep4 from './pages/OnboaedingPage4';
import OnboardingStep3 from './pages/OnboardingPage3';
import Login from './components/Login';

import './index.css';
import OnboardingNavbar from './components/OnboardingNavbar';

// ✅ Web3 Providers
import { Web3AuthProvider } from './providers/Web3AuthProvider';
import Web3ContextProvider from './providers/Web3ContextProvider';
import { Web3Context, CONNECT_STATES } from './providers/Web3ContextProvider';

// Enhanced Protected route component with loading state and better UX
const ProtectedRoute = ({ children }) => {
  const web3Context = useContext(Web3Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Give some time for Web3 context to initialize
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 1500); // Increased timeout to allow for proper initialization

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !isChecking) {
      if (web3Context.status === CONNECT_STATES.DISCONNECTED || 
          web3Context.status === CONNECT_STATES.NOT_CONNECTED) {
        // Store the intended route for after login
        sessionStorage.setItem('intendedRoute', location.pathname);
        navigate('/login', { replace: true });
      }
    }
  }, [web3Context.status, navigate, location.pathname, mounted, isChecking]);

  // Show loading while checking authentication
  if (isChecking || !mounted || web3Context.status === CONNECT_STATES.CONNECTING) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-600 border-t-cyan-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-ping mx-auto opacity-20"></div>
          </div>
          <div className="space-y-2">
            <p className="text-white font-medium">Checking authentication...</p>
            <p className="text-slate-400 text-sm">Please wait while we verify your connection</p>
          </div>
        </div>
      </div>
    );
  }

  // If not connected after checking, the useEffect will handle redirect
  if (web3Context.status !== CONNECT_STATES.CONNECTED) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-pulse text-slate-400">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  return children;
};

// Enhanced Login wrapper that handles post-login routing
const LoginWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const web3Context = useContext(Web3Context);

  useEffect(() => {
    // If user is already connected, redirect them
    if (web3Context.status === CONNECT_STATES.CONNECTED) {
      const intendedRoute = sessionStorage.getItem('intendedRoute') || '/onboarding1';
      sessionStorage.removeItem('intendedRoute');
      navigate(intendedRoute, { replace: true });
    }
  }, [web3Context.status, navigate]);

  // If already connected, show loading while redirecting
  if (web3Context.status === CONNECT_STATES.CONNECTED) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <Login />;
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

// Redirect after sign-in with better handling
const AfterSignInRoute = () => {
  const navigate = useNavigate();
  const web3Context = useContext(Web3Context);

  useEffect(() => {
    if (web3Context.status === CONNECT_STATES.CONNECTED) {
      const intendedRoute = sessionStorage.getItem('intendedRoute') || '/onboarding1';
      sessionStorage.removeItem('intendedRoute');
      navigate(intendedRoute, { replace: true });
    } else {
      // If not connected, go to login
      navigate('/login', { replace: true });
    }
  }, [navigate, web3Context.status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Redirecting...</p>
      </div>
    </div>
  );
};

// Development bypass component (remove in production)
const DevProtectedRoute = ({ children }) => {
  const web3Context = useContext(Web3Context);
  const navigate = useNavigate();
  const [showDevPrompt, setShowDevPrompt] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 
        web3Context.status !== CONNECT_STATES.CONNECTED) {
      setShowDevPrompt(true);
    }
  }, [web3Context.status]);

  // In development, show a prompt but allow access
  if (process.env.NODE_ENV === 'development' && showDevPrompt) {
    return (
      <div className="relative">
        {/* Dev prompt overlay */}
        <div className="fixed top-4 right-4 z-50 bg-yellow-900/90 border border-yellow-600 rounded-lg p-4 max-w-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-200">Development Mode</h3>
              <p className="text-xs text-yellow-300 mt-1">Not authenticated - showing page for development</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowDevPrompt(false)}
                  className="text-xs bg-slate-600 hover:bg-slate-700 text-white px-2 py-1 rounded"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

  // Use normal protection in production or when authenticated
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

function App() {
  return (
    <Web3AuthProvider>
      <Web3ContextProvider>
        <OnboardingProvider>
          <main>
            <Routes>
              <Route path="/" element={<HomePageWithAuth />} />
              
              <Route path="/login" element={<LoginWrapper />} />
              <Route path="/after-sign-in" element={<AfterSignInRoute />} />

              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/our-mission" element={<OurMissionPage />} />

              {/* Protected routes - Use DevProtectedRoute for development, ProtectedRoute for production */}
              <Route 
                path="/onboarding1" 
                element={
                  <DevProtectedRoute>
                    <OnboardingNavbar />
                    <OnboardingStep1 />
                  </DevProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding2" 
                element={
                  <DevProtectedRoute>
                    <OnboardingNavbar />
                    <OnboardingStep2 />
                  </DevProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding3" 
                element={
                  <DevProtectedRoute>
                    <OnboardingNavbar />
                    <OnboardingStep3 />
                  </DevProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding4" 
                element={
                  <DevProtectedRoute>
                    <OnboardingNavbar />
                    <OnboardingStep4 />
                  </DevProtectedRoute>
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
