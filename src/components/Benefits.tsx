import React from 'react';
import { Clock, CheckCircle, BarChart3, Zap, Sparkles, TrendingUp, Shield, Target, Users, Brain, CircuitBoard, Network, Activity, Bot, Cpu } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "70% Faster Turnaround",
      description: "Your AI assistant takes on routine groundwork, accelerating your delivery timelines without sacrificing quality.",
      gradient: "from-cyan-600 to-blue-600",
      bgGradient: "from-cyan-50/80 to-blue-50/80",
      borderGradient: "from-cyan-200/60 to-blue-200/60",
      stat: "70%",
      statLabel: "Faster",
      badge: "Speed Boost"
    },
    {
      icon: CheckCircle,
      title: "Higher Accuracy & Quality",
      description: "Reduce human errors and increase consistency with your personal AI trained to deliver at your standards.",
      gradient: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-50/80 to-teal-50/80",
      borderGradient: "from-emerald-200/60 to-teal-200/60",
      stat: "99%",
      statLabel: "Accuracy",
      badge: "Quality Assured"
    },
    {
      icon: BarChart3,
      title: "Do More, Stress Less",
      description: "Easily manage more projects without compromising on quality or feeling overwhelmed.",
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50/80 to-pink-50/80",
      borderGradient: "from-purple-200/60 to-pink-200/60",
      stat: "3x",
      statLabel: "More Projects",
      badge: "Scale Efficiently"
    }
  ];

  const bottomFeatures = [];

  return (
    <section id="benefits" className="relative section bg-gradient-to-br from-slate-50 to-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
      {/* Enhanced Grid Pattern - Adjusted for mobile */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.04] sm:opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px sm:60px 60px'
        }} />
        
        {/* Enhanced Orbs - Responsive sizing */}
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 h-40 sm:w-60 md:w-80 sm:h-60 md:h-80 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 h-40 sm:w-60 md:w-80 sm:h-60 md:h-80 bg-gradient-to-br from-purple-300/20 to-violet-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 md:w-64 sm:h-48 md:h-64 bg-gradient-to-br from-emerald-300/15 to-teal-400/15 rounded-full blur-xl sm:blur-2xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      {/* AI Circuit Pattern Overlay - Hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] sm:opacity-[0.06] z-0 hidden sm:block">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M100 200 L300 200 L300 400 L500 400" stroke="url(#circuit-gradient-light)" strokeWidth="1.5" />
          <path d="M800 150 L600 150 L600 350 L400 350" stroke="url(#circuit-gradient-light)" strokeWidth="1.5" />
          <path d="M200 600 L400 600 L400 500 L600 500" stroke="url(#circuit-gradient-light)" strokeWidth="1.5" />
          <circle cx="300" cy="200" r="6" fill="url(#node-gradient-light)" />
          <circle cx="600" cy="350" r="6" fill="url(#node-gradient-light)" />
          <circle cx="400" cy="500" r="6" fill="url(#node-gradient-light)" />
          <defs>
            <linearGradient id="circuit-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="node-gradient-light">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Enhanced Floating Icons - Reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        {[
          { icon: CircuitBoard, color: "text-cyan-600", bg: "bg-cyan-100/80", border: "border-cyan-200/60", top: "top-24", left: "left-16", delay: "0s" },
          { icon: Network, color: "text-purple-600", bg: "bg-purple-100/80", border: "border-purple-200/60", top: "top-40", right: "right-20", delay: "2s" },
          { icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100/80", border: "border-emerald-200/60", bottom: "bottom-40", left: "left-20", delay: "4s" },
          { icon: Bot, color: "text-blue-600", bg: "bg-blue-100/80", border: "border-blue-200/60", bottom: "bottom-24", right: "right-16", delay: "1s" },
          { icon: Brain, color: "text-violet-600", bg: "bg-violet-100/80", border: "border-violet-200/60", top: "top-1/3", left: "left-1/3", delay: "3s" },
          { icon: Cpu, color: "text-indigo-600", bg: "bg-indigo-100/80", border: "border-indigo-200/60", bottom: "bottom-1/3", right: "right-1/3", delay: "5s" }
        ].map(({ icon: Icon, color, bg, border, delay, ...position }, idx) => (
          <div key={idx} className={`absolute animate-float ${Object.entries(position).map(([key, value]) => `${key}-${value.split('-')[1]}`).join(' ')}`} style={{ animationDelay: delay }}>
            <div className="relative">
              <div className={`absolute inset-0 w-8 h-8 lg:w-10 lg:h-10 rounded-xl ${bg} blur-sm`} />
              <div className={`relative ${bg} backdrop-blur-sm border ${border} p-2 lg:p-2.5 rounded-xl shadow-lg`}>
                <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 max-w-7xl">
        {/* Enhanced Header - Mobile optimized */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl blur-lg w-12 h-12 sm:w-16 sm:h-16" />
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-slate-900 px-4">
            How{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              1upX
            </span>{' '}
            <br className="sm:hidden" />
            Transforms Your Work
          </h2>
          
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto opacity-80" />
        </div>

        {/* Enhanced Benefits Cards - Mobile optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {benefits.map(({ icon: Icon, title, description, gradient, bgGradient, borderGradient, stat, statLabel, badge }, index) => (
            <div key={index} className="group h-full">
              <div className={`relative h-full`}>
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl sm:rounded-3xl blur-xl transition-all duration-500`} />
                
                {/* Main Card */}
                <div className={`
                  relative h-full flex flex-col
                  rounded-2xl sm:rounded-3xl p-6 sm:p-8
                  bg-gradient-to-br ${bgGradient} backdrop-blur-sm
                  border border-gradient-to-r ${borderGradient}
                  shadow-lg group-hover:shadow-xl
                  group-hover:scale-[1.02] transition-all duration-300
                  overflow-hidden
                `}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-t-2xl sm:rounded-t-3xl" />
                  
                  {/* Top Section: Icon and Stat - Mobile layout */}
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 sm:mb-8 text-center sm:text-left">
                    <div className="relative mb-4 sm:mb-0">
                      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 rounded-xl blur-sm w-10 h-10 sm:w-12 sm:h-12`} />
                      <div className={`relative bg-gradient-to-r ${gradient} p-2.5 sm:p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {stat}
                      </div>
                      <div className="text-sm text-slate-600 font-medium mt-1">{statLabel}</div>
                    </div>
                  </div>

                  {/* Middle Section: Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight text-center sm:text-left">{title}</h3>

                  {/* Description */}
                  <div className="flex-1 flex items-center mb-6 sm:mb-8">
                    <p className="text-slate-700 leading-relaxed text-base sm:text-lg text-center sm:text-left">{description}</p>
                  </div>

                  {/* Bottom Badge */}
                  <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-200/50">
                    <div className={`inline-flex items-center space-x-3 bg-gradient-to-r ${bgGradient} border ${borderGradient} px-4 sm:px-5 py-2.5 sm:py-3 rounded-full group-hover:shadow-lg transition-shadow duration-300 mx-auto sm:mx-0`}>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} animate-pulse`}></div>
                      <span className="text-sm font-semibold text-slate-800">
                        {badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Summary Section - Mobile optimized */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl sm:rounded-3xl blur-sm" />
          
          <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-t-2xl sm:rounded-t-3xl" />
            
            {/* Enhanced Header */}
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full mb-6 sm:mb-8 shadow-lg">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-sm w-5 h-5 sm:w-6 sm:h-6" />
                  <Sparkles className="relative w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">
                  The Complete AI Advantage
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight px-4">
                Transform Your{' '}
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Entire Career
                </span>
              </h3>
            </div>

            {/* Enhanced Main Content */}
            <div className="relative bg-gradient-to-br from-cyan-50/80 to-purple-50/80 border border-cyan-200/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center mb-10 sm:mb-12 lg:mb-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-pulse"></div>
              <div className="relative z-10">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-800 leading-relaxed mb-6 sm:mb-8 px-2">
                  When you combine faster turnaround, higher accuracy, and the ability to handle more projects, 
                  you don't just work better—you{' '}
                  <span className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    transform your entire career
                  </span>.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6 lg:space-x-8 mt-6 sm:mt-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-600">70%</div>
                    <div className="text-sm text-slate-600">Faster</div>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-slate-300"></div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-600">99%</div>
                    <div className="text-sm text-slate-600">Accuracy</div>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-slate-300"></div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600">3x</div>
                    <div className="text-sm text-slate-600">Projects</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Bottom Feature Grid - Hidden for now but ready for use */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {bottomFeatures.map(({ icon: Icon, title, desc, gradient, bgGradient, borderGradient }, i) => (
                <div
                  key={i}
                  className={`group relative min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] bg-gradient-to-br ${bgGradient} backdrop-blur-sm border ${borderGradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center flex flex-col justify-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                >
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl sm:rounded-2xl`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-6">
                      <div className="relative inline-block">
                        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 rounded-xl blur-sm w-12 h-12 sm:w-16 sm:h-16`}></div>
                        <div className={`relative bg-gradient-to-r ${gradient} p-3 sm:p-4 rounded-xl shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg sm:text-xl mb-3 sm:mb-4 leading-tight">{title}</h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{desc}</p>
                    
                    {/* Subtle Accent Line */}
                    <div className={`w-6 sm:w-8 h-0.5 bg-gradient-to-r ${gradient} rounded-full mt-3 sm:mt-4 mx-auto opacity-60 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-6px) rotate(0.5deg); }
          66% { transform: translateY(-2px) rotate(-0.5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        /* Reduce motion for mobile users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-pulse {
            animation: none;
          }
          .group-hover\\:scale-\\[1\\.02\\]:hover,
          .group-hover\\:scale-110:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Benefits;