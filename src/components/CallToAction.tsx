import React from 'react';
import { ArrowRight, Rocket, Sparkles, Zap, Star, Users } from 'lucide-react';
import SectionHeading from './shared/SectionHeading';

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
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
      {/* Floating rocket elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 animate-float">
          <Rocket className="w-8 h-8 text-cyan-400 opacity-40" />
        </div>
        <div className="absolute top-48 right-1/4 animate-float" style={{animationDelay: '1s'}}>
          <Star className="w-6 h-6 text-purple-400 opacity-40" />
        </div>
        <div className="absolute bottom-32 left-1/3 animate-float" style={{animationDelay: '2s'}}>
          <Sparkles className="w-7 h-7 text-emerald-400 opacity-40" />
        </div>
        <div className="absolute bottom-48 right-1/3 animate-float" style={{animationDelay: '0.5s'}}>
          <Zap className="w-5 h-5 text-pink-400 opacity-40" />
        </div>
      </div>

      {/* Particle effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="Join the Future of Work"
          icon={<Rocket className="w-6 h-6 text-cyan-400" />}
        />

        <div className="mt-16 text-center">
          <div className="relative group max-w-5xl mx-auto">
            {/* Main glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl group-hover:blur-2xl transition-all duration-500"></div>
            
            <div className="relative rounded-3xl border-2 border-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 bg-white/10 backdrop-blur-xl shadow-2xl p-12 md:p-16 transition-all duration-500 group-hover:shadow-cyan-500/25 group-hover:-translate-y-2">
              {/* Top accent bars */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-t-3xl"></div>
              
              {/* Floating badge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-2xl shadow-2xl">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Early access badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-8 mt-4">
                <Users className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-300">Limited Early Access</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>

              {/* Main content */}
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                  Ready to 10x Your Productivity?
                </h3>
                
                <div className="max-w-4xl mx-auto space-y-6">
                  <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light">
                    We're building <span className="font-bold text-cyan-400">1upX</span> — your personal AI assistant for freelance work. 
                    Join our early access list to help shape the future of freelancing and discover how AI can make your workflow 
                    <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> smarter and faster</span>.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
                    {[
                      { icon: Zap, title: '70% Faster', desc: 'Turnaround times' },
                      { icon: Star, title: '99% Accuracy', desc: 'Quality guaranteed' },
                      { icon: Sparkles, title: '3x Projects', desc: 'Handle more work' }
                    ].map(({ icon: Icon, title, desc }, i) => (
                      <div key={i} className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-lg font-bold text-white">{title}</div>
                        <div className="text-sm text-white/70">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center pt-4">
                  <a
                    href="#sign-up"
                    className="group relative inline-flex items-center bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-lg"></div>
                    
                    <span className="relative flex items-center space-x-3">
                      <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                      <span>Join Early Access Now</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </a>
                </div>

                {/* Social proof */}
                <div className="flex items-center justify-center space-x-6 pt-8 text-white/60">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 border-2 border-white/20"></div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">500+ professionals</span>
                  </div>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Joining weekly</span>
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Sparkles, title: 'Free Early Access', desc: 'No cost to join the beta' },
            { icon: Users, title: 'Shape the Product', desc: 'Your feedback matters' },
            { icon: Zap, title: 'First to Experience', desc: 'Get ahead of the curve' }
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="group text-center">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <Icon className="w-8 h-8 text-white mx-auto" />
                </div>
              </div>
              <h4 className="font-bold text-white mb-2">{title}</h4>
              <p className="text-white/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;