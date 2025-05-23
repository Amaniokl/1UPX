import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-purple-500/20 py-3'
          : 'bg-slate-900/80 backdrop-blur-md py-5'
      }`}
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"></div>
      
      <div className="w-full flex items-center justify-between px-4 md:px-6 relative">
        {/* Logo - Extreme Left */}
        <a href="#" className="group flex items-center space-x-3 relative ml-0">
        
          <div className="relative">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-50 blur-lg rounded-full group-hover:opacity-75 transition-opacity"></div> */}
            {/* <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"> */}
              <img src="images/1UPx Final-01.svg" alt="Company Logo" className="h-10 w-auto" />
            {/* </div> */}
          </div>
          {/* <div className="space-y-1">
            <span className="text-2xl font-black text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              1upX
            </span>
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-cyan-400 font-medium">AI WORKMATE</span>
            </div>
          </div>  */}
        </a>

        {/* Mobile Menu Button - Extreme Right */}
        <button
          className="md:hidden relative p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none hover:bg-white/20 transition-all duration-300 mr-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="relative w-6 h-6">
            <Menu
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
              }`}
            />
            <X
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
              }`}
            />
          </div>
        </button>

        {/* Desktop Nav - Extreme Right */}
        <nav className="hidden md:flex items-center space-x-6 mr-0">
          {[
            { label: 'Home', href: '#' },
            { label: 'Privacy', href: '#privacy-ownership' },
            { label: 'What We Do', href: '#what-we-do' },
            { label: 'Why We Do', href: '#why-we-do' },
            { label: 'How It Works', href: '#how-we-do-it' },
            { label: 'Benefits', href: '#benefits' },
            { label: 'Who Should Join', href: '#who-should-join' },
          ].map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-white/90 font-medium transition-all duration-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
          
          <a
            href="#sign-up"
            className="group relative ml-4 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
            <span className="relative flex items-center space-x-2">
              <span>Get Early Access</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </span>
          </a>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="relative">
          {/* Mobile menu background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 backdrop-blur-xl"></div>
          
          <nav className="relative px-6 py-6 space-y-4 border-t border-purple-500/20">
            {[
              { label: 'Home', href: '#' },
              { label: 'Privacy', href: '#privacy-ownership' },
              { label: 'What We Do', href: '#what-we-do' },
              { label: 'Why We Do', href: '#why-we-do' },
              { label: 'How It Works', href: '#how-we-do-it' },
              { label: 'Benefits', href: '#benefits' },
              { label: 'Who Should Join', href: '#who-should-join' },
            ].map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group relative block text-white/90 font-medium hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-white/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:scale-150 transition-transform"></div>
                  <span>{link.label}</span>
                </div>
              </a>
            ))}
            
            <div className="pt-4">
              <a
                href="#sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative block w-full text-center px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Get Early Access</span>
                  <Sparkles className="w-5 h-5" />
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Floating particles effect */}
      {isScrolled && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30"
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
    </header>
  );
};

export default Navbar;