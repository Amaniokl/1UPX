import React, { useState, useEffect, useContext } from 'react';
import { Zap, Menu, X, Sparkles, ExternalLink, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Web3Context, CONNECT_STATES } from '../providers/Web3ContextProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const location = useLocation();
  const navigate = useNavigate();
  const web3Context = useContext(Web3Context);
  
  const isAuthenticated = web3Context.status === CONNECT_STATES.CONNECTED;
  const userAddress = isAuthenticated && web3Context.address ? 
    `${web3Context.address.substring(0, 6)}...${web3Context.address.substring(web3Context.address.length - 4)}` : 
    '';

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

  const handleLogin = () => {
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    try {
      await web3Context.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
                {!isAuthenticated ? (
                  <button
                    onClick={handleLogin}
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
                ) : (
                  <div className="flex items-center space-x-3">
                    {/* User address display */}
                    <span className="text-white font-semibold text-sm hidden lg:block bg-white/15 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/30 shadow-sm">
                      {userAddress}
                    </span>
                    
                    {/* Logout button */}
                    <button
                      onClick={handleLogout}
                      className={`group relative rounded-full bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 ${
                        screenSize === 'laptop' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
                      }`}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-orange-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
                      <span className="relative flex items-center space-x-1">
                        <span>Logout</span>
                        <LogOut className={`group-hover:translate-x-0.5 transition-transform ${
                          screenSize === 'laptop' ? 'w-3 h-3' : 'w-4 h-4'
                        }`} />
                      </span>
                    </button>
                  </div>
                )}
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
                {!isAuthenticated ? (
                  <button
                    onClick={handleLogin}
                    className={`group relative block w-full text-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 ${
                      screenSize === 'mobile' ? 'px-4 py-3 text-sm' : 'px-6 py-4'
                    }`}
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
                    <span className="relative flex items-center justify-center space-x-2">
                      <Sparkles className={screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} />
                      <span>Sign In</span>
                      <Sparkles className={screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} />
                    </span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="bg-white/15 rounded-xl border border-white/30 backdrop-blur-sm shadow-sm overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold text-sm">
                              Connected Wallet
                            </div>
                            <div className="text-white/90 font-medium text-base">
                              {userAddress}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="group relative block w-full text-center rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold shadow-lg hover:shadow-red-500/50 transition-all duration-300 py-3"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 to-orange-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
                      <span className="relative flex items-center justify-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </span>
                    </button>
                  </div>
                )}
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
    </>
  );
};

export default Navbar;
