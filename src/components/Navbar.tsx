import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, Sparkles, ExternalLink, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignIn,
  SignUp,
  UserButton,
  useUser,
} from '@clerk/clerk-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    };

    const handleScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  // Hide body scrollbar when modal is open
  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAuthModal]);

  const getLogoSize = () => {
    switch (screenSize) {
      case 'mobile': return 'h-8 w-auto';
      case 'tablet': return 'h-9 w-auto';
      default: return 'h-12 w-auto';
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

  const getNavSpacing = () => {
    switch (screenSize) {
      case 'laptop': return 'space-x-4';
      default: return 'space-x-6';
    }
  };

  const getButtonSize = () => {
    switch (screenSize) {
      case 'laptop': return 'px-4 py-2 text-sm';
      default: return 'px-6 py-3';
    }
  };

  const handleNavigation = (href, isExternal = false, scrollToTop = false) => {
    setMobileMenuOpen(false);
  
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate(`/${href}`);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (href.startsWith('/')) {
      navigate(href);
      if (scrollToTop) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      }
    } else if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero', type: 'section' },
    { label: 'Who Should Join', href: '#who-should-join', type: 'section' },
    { label: 'How It Works', href: '#how-we-do-it', type: 'section' },
    { label: 'Benefits', href: '#benefits', type: 'section' },
    { label: 'Privacy & Ownership', href: '/privacy', type: 'route', scrollTop: true },
    { label: 'Our Mission', href: '/our-mission', type: 'route', scrollTop: true },
  ];

  const handleSignUpClick = () => {
    setMobileMenuOpen(false);
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleSignInClick = () => {
    setMobileMenuOpen(false);
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  // Consistent UserButton appearance for both desktop and mobile
  const getConsistentUserButtonAppearance = (isMobile = false) => ({
    elements: {
      // Avatar styling - consistent across all views
      avatarBox: `${isMobile ? 'w-10 h-10' : screenSize === 'laptop' ? 'w-10 h-10' : 'w-12 h-12'} ring-2 ring-white/50 hover:ring-purple-400 transition-all duration-300 border-2 border-white/30 bg-white/20 backdrop-blur-sm shadow-lg`,
      
      // Dropdown menu styling - consistent
      userButtonPopoverCard: 'bg-slate-800/98 backdrop-blur-xl border-2 border-purple-500/40 shadow-2xl rounded-xl',
      userButtonPopoverRootBox: 'z-[60]',
      
      // Menu items - high contrast and visibility
      userButtonPopoverActionButton: 'text-white hover:bg-purple-600/60 hover:text-white border-b border-white/20 transition-all duration-200 py-3 px-4',
      userButtonPopoverActionButtonText: 'text-white font-medium text-sm',
      userButtonPopoverActionButtonIcon: 'text-white/80 hover:text-white',
      
      // Footer styling
      userButtonPopoverFooter: 'border-t-2 border-white/30 bg-slate-700/60 rounded-b-xl',
      
      // User info in dropdown - always visible
      userPreviewTextContainer: 'text-white py-3 px-4 border-b border-white/20 bg-slate-700/40',
      userPreviewMainIdentifier: 'text-white font-semibold text-base',
      userPreviewSecondaryIdentifier: 'text-white/90 text-sm',
      
      // Additional elements for better visibility
      userButtonPopoverActions: 'py-2',
      userButtonPopoverMain: 'pb-2',
      
      // Ensure all text elements are visible
      userButtonPopoverActionButtonIconBox: 'text-white/80',
      userButtonPopoverActionButtonIconContainer: 'text-white/80',
    },
    variables: {
      colorPrimary: '#8b5cf6',
      colorText: '#ffffff',
      colorTextSecondary: '#f1f5f9',
      colorBackground: '#1e293b',
      colorInputBackground: '#334155',
      colorInputText: '#ffffff',
      colorNeutral: '#ffffff',
    }
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-purple-500/20'
            : 'bg-slate-900/80 backdrop-blur-md'
        } ${
          screenSize === 'mobile' 
            ? isScrolled ? 'py-2' : 'py-3'
            : isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className={`w-full flex items-center justify-between ${getPadding()} relative`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center space-x-3 relative">
              <div className="relative">
                <img 
                  src="images/1UPx Final-01.png" 
                  alt="Company Logo" 
                  className={`${getLogoSize()} transition-all duration-300 group-hover:scale-105`} 
                />
              </div>
            </Link>
          </div>

          {/* Navigation and Auth */}
          <div className="flex items-center space-x-4">
            {/* Desktop Nav */}
            <nav className={`hidden md:flex items-center ${getNavSpacing()}`}>
              {navLinks.map((link, index) => (
                link.type === 'route' ? (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href, false, link.scrollTop)}
                    className={`group relative text-white/90 font-medium transition-all duration-300 hover:text-white rounded-lg hover:bg-white/10 flex items-center ${
                      screenSize === 'laptop' ? 'px-3 py-2 text-sm' : 'px-4 py-2'
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      <span>{link.label}</span>
                    </span>
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
                  </button>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href)}
                    className={`group relative text-white/90 font-medium transition-all duration-300 hover:text-white rounded-lg hover:bg-white/10 flex items-center ${
                      screenSize === 'laptop' ? 'px-3 py-2 text-sm' : 'px-4 py-2'
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      <span>{link.label}</span>
                    </span>
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
                  </button>
                )
              ))}
              
              {/* Desktop Authentication Section */}
              <div className="flex items-center space-x-3 ml-4">
                <SignedOut>
                  <button
                    onClick={handleSignUpClick}
                    className={`group relative rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 ${getButtonSize()}`}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
                    <span className="relative flex items-center space-x-2">
                      <span className={screenSize === 'laptop' ? 'text-xs' : ''}>Sign In</span>
                      <Sparkles className={`group-hover:rotate-12 transition-transform ${
                        screenSize === 'laptop' ? 'w-3 h-3' : 'w-4 h-4'
                      }`} />
                    </span>
                  </button>
                </SignedOut>

                <SignedIn>
                  <div className="flex items-center space-x-3">
                    {/* Welcome text - always visible with consistent styling */}
                    <span className="text-white font-semibold text-sm hidden lg:block bg-white/15 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/30 shadow-sm">
                      Welcome, {user?.firstName || 'User'}!
                    </span>
                    
                    {/* UserButton with consistent styling */}
                    <UserButton 
                      appearance={getConsistentUserButtonAppearance(false)}
                      afterSignOutUrl="/"
                    />
                  </div>
                </SignedIn>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden relative rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none hover:bg-white/20 transition-all duration-300 ${
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
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 backdrop-blur-xl"></div>
            
            <nav className={`relative space-y-2 border-t border-purple-500/20 ${
              screenSize === 'mobile' ? 'px-4 py-4' : 'px-6 py-6'
            }`}>
              {navLinks.map((link, index) => (
                link.type === 'route' ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group relative block text-white/90 font-medium hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 ${
                      screenSize === 'mobile' ? 'p-2.5' : 'p-3'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:scale-150 transition-transform"></div>
                        <span className={screenSize === 'mobile' ? 'text-sm' : ''}>{link.label}</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href)}
                    className={`group relative block w-full text-left text-white/90 font-medium hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 ${
                      screenSize === 'mobile' ? 'p-2.5' : 'p-3'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:scale-150 transition-transform"></div>
                        <span className={screenSize === 'mobile' ? 'text-sm' : ''}>{link.label}</span>
                      </div>
                    </div>
                  </button>
                )
              ))}
              
              {/* Mobile Authentication - Consistent with Desktop */}
              <div className={`border-t border-white/10 ${screenSize === 'mobile' ? 'pt-3' : 'pt-4'}`}>
                <SignedOut>
                  <button
                    onClick={handleSignUpClick}
                    className={`group relative block w-full text-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 ${
                      screenSize === 'mobile' ? 'px-4 py-3 text-sm' : 'px-6 py-4'
                    }`}
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
                    <span className="relative flex items-center justify-center space-x-2">
                      <Sparkles className={screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} />
                      <span>SignIn</span>
                      <Sparkles className={screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} />
                    </span>
                  </button>
                </SignedOut>

                <SignedIn>
                  {/* Mobile User Section - Consistent Styling */}
                  <div className="bg-white/15 rounded-xl border border-white/30 backdrop-blur-sm shadow-sm overflow-hidden">
                    {/* User Info Header */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20">
                      <div className="flex items-center space-x-3">
                        <UserButton 
                          appearance={getConsistentUserButtonAppearance(true)}
                          afterSignOutUrl="/"
                        />
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">
                            Welcome back!
                          </div>
                          <div className="text-white/90 font-medium text-base">
                            {user?.firstName || 'User'}
                          </div>
                          <div className="text-white/70 text-xs truncate max-w-[200px]">
                            {user?.primaryEmailAddress?.emailAddress}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        </div>

        {/* Floating particles effect */}
        {isScrolled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(screenSize === 'mobile' ? 6 : 10)].map((_, i) => (
              <div
                key={i}
                className={`absolute bg-cyan-400 rounded-full animate-pulse opacity-30 ${
                  screenSize === 'mobile' ? 'w-0.5 h-0.5' : 'w-1 h-1'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </header>

      {/* Auth Modal - No Scrollbar */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeAuthModal}
          />
          
          {/* Modal Container - Removed overflow-auto and max-h constraints */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Content Container - Optimized padding and spacing */}
            <div className="px-6 py-8">
              {authMode === 'signup' ? (
                <div>
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Create Account</h2>
                    <p className="text-gray-600 text-sm">Join us and get started today!</p>
                  </div>
                  <SignUp
                    appearance={{
                      elements: {
                        formButtonPrimary: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold',
                        card: 'bg-transparent shadow-none',
                        headerTitle: 'hidden',
                        headerSubtitle: 'hidden',
                        socialButtonsBlockButton: 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
                        formFieldInput: 'bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500',
                        formFieldLabel: 'text-gray-700 font-medium',
                        footerActionLink: 'text-purple-600 hover:text-purple-700 font-medium',
                        dividerLine: 'bg-gray-300',
                        dividerText: 'text-gray-500',
                        formFieldErrorText: 'text-red-600',
                        identityPreviewText: 'text-gray-700',
                        formHeaderTitle: 'text-gray-900',
                        formHeaderSubtitle: 'text-gray-600',
                        // Remove any scrollbar styling
                        rootBox: 'overflow-visible',
                        cardBox: 'overflow-visible',
                        main: 'overflow-visible',
                      }
                    }}
                    redirectUrl={window.location.origin}
                  />
                  <div className="text-center mt-3">
                    <button
                      onClick={() => setAuthMode('signin')}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                    <p className="text-gray-600 text-sm">Sign in to your account</p>
                  </div>
                  <SignIn
                    appearance={{
                      elements: {
                        formButtonPrimary: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold',
                        card: 'bg-transparent shadow-none',
                        headerTitle: 'hidden',
                        headerSubtitle: 'hidden',
                        socialButtonsBlockButton: 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
                        formFieldInput: 'bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500',
                        formFieldLabel: 'text-gray-700 font-medium',
                        footerActionLink: 'text-purple-600 hover:text-purple-700 font-medium',
                        dividerLine: 'bg-gray-300',
                        dividerText: 'text-gray-500',
                        formFieldErrorText: 'text-red-600',
                        identityPreviewText: 'text-gray-700',
                        formHeaderTitle: 'text-gray-900',
                        formHeaderSubtitle: 'text-gray-600',
                        // Remove any scrollbar styling
                        rootBox: 'overflow-visible',
                        cardBox: 'overflow-visible',
                        main: 'overflow-visible',
                      }
                    }}
                    redirectUrl={window.location.origin}
                  />
                  <div className="text-center mt-3">
                    <button
                      onClick={() => setAuthMode('signup')}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Don't have an account? Sign up
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
