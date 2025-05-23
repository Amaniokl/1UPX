import React from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  BarChart4,
  LineChart,
  BarChart2,
  Code,
  Video,
  PenTool,
  Palette,
  Monitor,
  Sparkles,
  Brain,
  Network,
  CircuitBoard,
  Bot,
  Activity,
  Zap,
  Cpu
} from 'lucide-react';

const WhoShouldJoin = () => {
  const specializations = [
    {
      icon: Code,
      text: "Software Developer",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-50/80 to-cyan-50/80",
      borderGradient: "from-blue-200/60 to-cyan-200/60"
    },
    {
      icon: Video,
      text: "Video Editor",
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50/80 to-pink-50/80",
      borderGradient: "from-purple-200/60 to-pink-200/60"
    },
    {
      icon: PenTool,
      text: "Content Creator",
      gradient: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-50/80 to-teal-50/80",
      borderGradient: "from-emerald-200/60 to-teal-200/60"
    },
    {
      icon: Palette,
      text: "Designer",
      gradient: "from-orange-600 to-rose-600",
      bgGradient: "from-orange-50/80 to-rose-50/80",
      borderGradient: "from-orange-200/60 to-rose-200/60"
    },
    {
      icon: Monitor,
      text: "UI/UX Designer",
      gradient: "from-violet-600 to-purple-600",
      bgGradient: "from-violet-50/80 to-purple-50/80",
      borderGradient: "from-violet-200/60 to-purple-200/60"
    },
    {
      icon: Briefcase,
      text: "Business Consulting",
      gradient: "from-amber-600 to-orange-600",
      bgGradient: "from-amber-50/80 to-orange-50/80",
      borderGradient: "from-amber-200/60 to-orange-200/60"
    },
    {
      icon: TrendingUp,
      text: "Market Research",
      gradient: "from-cyan-600 to-blue-600",
      bgGradient: "from-cyan-50/80 to-blue-50/80",
      borderGradient: "from-cyan-200/60 to-blue-200/60"
    },
    {
      icon: LineChart,
      text: "Strategic Planning",
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50/80 to-emerald-50/80",
      borderGradient: "from-green-200/60 to-emerald-200/60"
    },
    {
      icon: BarChart4,
      text: "Financial Analysis",
      gradient: "from-red-600 to-pink-600",
      bgGradient: "from-red-50/80 to-pink-50/80",
      borderGradient: "from-red-200/60 to-pink-200/60"
    },
    {
      icon: BarChart2,
      text: "Operations Strategy",
      gradient: "from-indigo-600 to-purple-600",
      bgGradient: "from-indigo-50/80 to-purple-50/80",
      borderGradient: "from-indigo-200/60 to-purple-200/60"
    }
  ];

  return (
    <section id="who-should-join" className="relative section bg-gradient-to-br from-slate-50 to-white py-24 sm:py-32 overflow-hidden">
      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Enhanced Orbs */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-violet-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-300/15 to-teal-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      {/* AI Circuit Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] z-0">
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

      {/* Enhanced Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-10">
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
              <div className={`absolute inset-0 w-10 h-10 rounded-xl ${bg} blur-sm`} />
              <div className={`relative ${bg} backdrop-blur-sm border ${border} p-2.5 rounded-xl shadow-lg`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Container */}
      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-lg w-16 h-16" />
              <div className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 p-4 rounded-2xl shadow-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-slate-900">
            Who Should{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join?
            </span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto opacity-80" />
        </div>

        {/* Enhanced Main Card */}
        <div className="relative group mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl blur-sm" />
          
          <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-12 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-t-3xl" />
            
            {/* Enhanced Introduction */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 px-8 py-4 rounded-full mb-8 shadow-lg">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-sm w-6 h-6" />
                  <Sparkles className="relative w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-slate-800 font-semibold text-lg">
                  Perfect for Creative & Technical Professionals
                </span>
              </div>
              
              <p className="text-2xl md:text-3xl text-slate-800 leading-relaxed font-light max-w-4xl mx-auto">
                We're building for professionals who elevate performance and want to{" "}
                <span className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  amplify their creative potential
                </span>{" "}
                with AI-powered assistance.
              </p>
            </div>

            {/* Enhanced Specializations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {specializations.map(({ icon: Icon, text, gradient, bgGradient, borderGradient }, index) => (
                <div key={index} className="group h-32">
                  <div className="relative h-full">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-all duration-500`} />
                    
                    {/* Main Card */}
                    <div className={`
                      relative h-full flex flex-col justify-center items-center
                      rounded-2xl p-6
                      bg-gradient-to-br ${bgGradient} backdrop-blur-sm
                      border border-gradient-to-r ${borderGradient}
                      shadow-lg group-hover:shadow-xl
                      group-hover:scale-[1.02] transition-all duration-300
                    `}>
                      {/* Enhanced Icon Container */}
                      <div className="relative mb-4">
                        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 rounded-xl blur-sm w-12 h-12`} />
                        <div className={`relative bg-gradient-to-r ${gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Enhanced Text */}
                      <p className="text-slate-800 font-semibold text-sm leading-tight text-center group-hover:text-slate-900 transition-colors">
                        {text}
                      </p>
                      
                      {/* Subtle Accent Line */}
                      <div className={`w-8 h-0.5 bg-gradient-to-r ${gradient} rounded-full mt-2 opacity-60 group-hover:opacity-100 transition-opacity`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom Enhancement */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100/80 to-white/80 backdrop-blur-sm border border-slate-200/60 px-6 py-3 rounded-full shadow-md">
                <Zap className="w-5 h-5 text-amber-600" />
                <span className="text-slate-700 font-medium">
                  Join thousands of professionals already transforming their workflow
                </span>
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
{/* 
        {/* Enhanced Call to Action */}
        {/* <div className="text-center">
          <div className="relative inline-block max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-lg" />
            <div className="relative bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-10 shadow-xl">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-full shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-px bg-gradient-to-r from-emerald-500 to-cyan-500" />
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div> */}
              {/* </div> */}
{/*               
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Ready to experience{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  AI-powered productivity?
                </span>
              </h3>
              
              <p className="text-lg text-slate-700 leading-relaxed">
                Join the future of work where AI amplifies your capabilities and accelerates your success.
              </p> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
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
      `}</style>
    </section>
  );
};

export default WhoShouldJoin;