import React, { useState } from 'react';
import { ArrowRight, Cpu, Sparkles, Zap, Bot, Brain, CircuitBoard, Layers, Network } from 'lucide-react';
import SignUpPopup from './SignUpForm'; // Import the SignUpPopup component

const Hero = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
  };

  return (
    <>
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white pt-24 pb-20 md:pt-32 md:pb-28 min-h-screen flex items-center">
        {/* Refined Background Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Subtle Animated Background Orbs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-32 left-16 w-96 h-96 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500/15 to-teal-500/15 blur-2xl animate-pulse" style={{animationDelay: '4s'}} />
        </div>

        {/* AI Circuit Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path d="M100 200 L300 200 L300 400 L500 400" stroke="url(#circuit-gradient)" strokeWidth="2" />
            <path d="M800 150 L600 150 L600 350 L400 350" stroke="url(#circuit-gradient)" strokeWidth="2" />
            <path d="M200 600 L400 600 L400 500 L600 500" stroke="url(#circuit-gradient)" strokeWidth="2" />
            <circle cx="300" cy="200" r="8" fill="url(#node-gradient)" />
            <circle cx="600" cy="350" r="8" fill="url(#node-gradient)" />
            <circle cx="400" cy="500" r="8" fill="url(#node-gradient)" />
            <defs>
              <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
              </linearGradient>
              <radialGradient id="node-gradient">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="container relative z-10">
          {/* AI Logo/Brand */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-md border border-cyan-500/20 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-300">AI Assistant • Beta Access</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 animate-fade-in-down">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                Your Personal
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                AI Twin
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed animate-fade-in max-w-3xl mx-auto font-light">
              Experience the future of productivity with an AI assistant that adapts to your workflow,
              <span className="font-medium bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"> learns your style</span>, 
              and handles tasks with precision.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up mb-16">
              {/* <button
                onClick={handleOpenSignUp}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  Start Building Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button> */}
              <a
                href="#how-we-do-it"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-slate-600 text-slate-300 font-semibold text-lg hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm"
              >
                <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
                See It In Action
              </a>
            </div>
          </div>

          {/* Enhanced Feature Showcase */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12">
                {/* Header Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-lg w-12 h-12"></div>
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-3 rounded-2xl border border-slate-600">
                      <Cpu className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  {/* Feature 1 */}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl border border-cyan-500/30 mb-4">
                      <Sparkles className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Smart Automation
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Automate repetitive tasks while maintaining your unique approach and quality standards.
                    </p>
                  </div>
                  
                  {/* Feature 2 */}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl border border-purple-500/30 mb-4">
                      <Brain className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Adaptive Learning
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Continuously learns from your preferences to provide increasingly personalized assistance.
                    </p>
                  </div>
                  
                  {/* Feature 3 */}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl border border-emerald-500/30 mb-4">
                      <Zap className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Lightning Speed
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Process complex tasks in seconds, accelerating your workflow without compromising quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(1deg); }
            66% { transform: translateY(-5px) rotate(-1deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down {
            animation: fade-in-down 1s ease-out;
          }
          .animate-fade-in {
            animation: fade-in 1.2s ease-out 0.3s both;
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out 0.6s both;
          }
        `}</style>
      </section>

      {/* SignUp Popup */}
      <SignUpPopup isOpen={isSignUpOpen} onClose={handleCloseSignUp} />
    </>
  );
};

export default Hero;