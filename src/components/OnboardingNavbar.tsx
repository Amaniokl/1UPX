import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Web3Context, CONNECT_STATES } from '../providers/Web3ContextProvider';
import {
  Zap,
  Menu,
  X,
  Sparkles,
  User,
  Shield,
  LogOut,
  Home,
  ChevronDown,
  Copy,
  Check
} from 'lucide-react';

const OnboardingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [showUserModal, setShowUserModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const web3Context = useContext(Web3Context);
  
  const isAuthenticated = web3Context.status === CONNECT_STATES.CONNECTED;
  const userAddress = isAuthenticated && web3Context.address ? 
    web3Context.address : '';
  const shortAddress = userAddress ? 
    `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}` : 
    '';

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('mobile');
      else if (width < 768) setScreenSize('tablet');
      else if (width < 1024) setScreenSize('laptop');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('header')) {
        setMobileMenuOpen(false);
      }
      
      if (showUserModal && !event.target.closest('.user-modal') && !event.target.closest('.user-button')) {
        setShowUserModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen, showUserModal]);

  const getLogoSize = () => {
    switch (screenSize) {
      case 'mobile': return 'h-8 w-auto';
      case 'tablet': return 'h-9 w-auto';
      default: return 'h-10 w-auto';
    }
  };

  const getPadding = () => {
    switch (screenSize) {
      case 'mobile': return 'pl-3 pr-3';
      case 'tablet': return 'pl-4 pr-4';
      case 'laptop': return 'pl-5 pr-5';
      default: return 'pl-6 pr-6';
    }
  };

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    setShowUserModal(false);
    try {
      await web3Context.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && userAddress) {
      navigator.clipboard.writeText(userAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleUserModal = () => {
    setShowUserModal(!showUserModal);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 shadow-xl border-b border-slate-700/20"
    >
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x" />
      
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Main navbar content */}
      <div className={`w-full flex items-center justify-between ${getPadding()} py-3 relative`}>
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="group flex items-center space-x-3 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md group-hover:bg-cyan-400/30 transition-all duration-300" />
              <img 
                src="/images/1UPx Final-01.png" 
                alt="Company Logo" 
                className={`${getLogoSize()} relative transition-all duration-300 group-hover:scale-105`} 
              />
            </div>
          </Link>
        </div>

        {/* Navigation and Auth */}
        <div className="flex items-center space-x-4">
          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 px-4 py-2 rounded-xl">
              <span className="text-slate-300 font-medium">
                Welcome, User!
              </span>
            </div>
            
            {/* User profile button */}
            <button
              onClick={toggleUserModal}
              className="user-button relative group flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-slate-700/50 hover:border-cyan-400/60 transition-all duration-300 shadow-lg"
            >
              <User className="w-5 h-5 text-cyan-400" />
              
              {/* User modal */}
              {showUserModal && (
                <div className="user-modal absolute top-full right-0 mt-2 w-72 bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-700/30 shadow-2xl rounded-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-blue-950/50">
                    <h3 className="text-white font-bold text-lg">Your Wallet</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-white/90 font-medium text-sm">{shortAddress}</span>
                      <button 
                        onClick={copyToClipboard}
                        className="text-white/70 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="text-white/80 text-sm">
                      <p className="mb-2">Connected with Web3Auth</p>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-full"></div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        onClick={() => navigate('/profile')}
                        className="w-full text-left py-2 px-3 rounded-md text-white hover:bg-slate-800/60 transition-colors flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-left py-2 px-3 rounded-md text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden relative rounded-xl bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 text-white focus:outline-none hover:bg-slate-700/50 transition-all duration-300 ${
              screenSize === 'mobile' ? 'p-2' : 'p-3'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`relative ${screenSize === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`}>
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                } ${screenSize === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                } ${screenSize === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"></div>
            
          <nav className={`relative space-y-2 border-t border-slate-700/20 ${
            screenSize === 'mobile' ? 'px-4 py-4' : 'px-6 py-6'
          }`}>
            {/* Mobile User Section */}
            <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-sm overflow-hidden mb-4">
              {/* User Info Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/50 to-blue-950/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-slate-700/50 flex items-center justify-center">
                    <User className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      Welcome back!
                    </div>
                    <div className="text-white/90 font-medium text-base">
                      User
                    </div>
                    <div className="text-slate-400 text-xs truncate max-w-[200px]">
                      {shortAddress}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile wallet info */}
              <div className="p-3 border-t border-slate-700/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm font-medium">Wallet Address</span>
                  <button 
                    onClick={copyToClipboard}
                    className="text-cyan-400/70 hover:text-cyan-400 transition-colors p-1 rounded-md hover:bg-slate-800/60"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-slate-400 text-xs bg-slate-900/50 p-2 rounded-md overflow-hidden text-ellipsis">
                  {shortAddress}
                </div>
              </div>
              
              {/* Mobile action buttons */}
              <div className="p-3 border-t border-slate-700/20 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left py-2 px-3 rounded-md text-white hover:bg-slate-800/60 transition-colors flex items-center space-x-2 text-sm"
                >
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>View Profile</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 rounded-md text-red-400 hover:bg-red-500/10 transition-colors flex items-center space-x-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
            
            {/* Home Link */}
            <Link
              to="/"
              className="group relative block text-slate-300 font-medium hover:text-white transition-all duration-300 rounded-xl hover:bg-slate-800/30 p-3"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-2 rounded-lg">
                  <Home className="w-5 h-5 text-cyan-400" />
                </div>
                <span>Return to Home</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle circuit pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 100">
            <path d="M0,50 Q200,20 400,50 T800,50" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
            <path d="M0,30 Q200,80 400,30 T800,30" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
            <path d="M0,70 Q200,40 400,70 T800,70" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
            <defs>
              <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Subtle Animated Background Orbs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-5 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-5 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default OnboardingNavbar;
