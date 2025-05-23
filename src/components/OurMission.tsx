import React from 'react';
import { 
  Brain, 
  Sparkles, 
  Cpu, 
  Bot, 
  Zap, 
  CircuitBoard, 
  Network, 
  Target, 
  Activity,
  Lightbulb,
  Shield,
  TrendingUp,
  ArrowRight,
  Users
} from 'lucide-react';

const OurMission = () => {
  return (
    <section
      id="our-mission"
      className="relative section bg-gradient-to-br from-slate-50 to-white py-24 sm:py-32 overflow-hidden"
    >
      {/* Dynamic Background Transition */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-900"></div> */}
      
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

      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-2xl shadow-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-slate-900">
            Our{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* What We're Building - Consistent Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Left Box */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-lg h-full flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">
              What We're{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Building
              </span>
            </h3>
            <p className="text-xl text-slate-700 leading-relaxed mb-4">
              At{' '}
              <span className="font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                1upX
              </span>
              , we're crafting a{' '}
              <span className="font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                personalized AI agent
              </span>{' '}
              that mirrors how you think, work, and create.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              It's like having a{' '}
              <span className="font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                digital twin
              </span>
              —handling tasks exactly as you would, but at lightning speed.
            </p>
          </div>

          {/* Right Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-center">
            
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            
            <h3 className="text-2xl font-black mb-4 text-center text-slate-900">
              Your AI,{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Your Style
              </span>
            </h3>
            
            <p className="text-slate-700 text-center leading-relaxed mb-6">
              Unlike generic AI tools,{' '}
              <span className="font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                1upX
              </span>{' '}
              adapts to your unique style and knowledge.
            </p>
            
            <div className="flex justify-center">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-3 rounded-2xl border border-slate-200">
                <Target className="w-5 h-5 text-cyan-600" />
                <span className="text-sm font-medium text-slate-700">
                  Delivering results that feels naturally{' '}
                  <span className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    YOU
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why We're Building It - Dark Section */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl"></div>
          <div className="absolute inset-0 opacity-30 rounded-3xl">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/15 to-violet-600/15 blur-3xl" />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white rounded-3xl">
            {/* Why Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl shadow-2xl">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">
                Why We're Building{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  The Future
                </span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"></div>
            </div>

            {/* AI Revolution Banner */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-slate-700/50 backdrop-blur-sm border border-blue-500/30 px-8 py-4 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <span className="text-blue-100 font-medium text-lg">The AI Revolution is Here</span>
              </div>
            </div>

            {/* Main Philosophy */}
            <div className="text-center mb-12">
              <p className="text-xl md:text-2xl text-slate-100 leading-relaxed font-light max-w-4xl mx-auto">
                We see AI rapidly transforming the workforce. Many worry AI might replace jobs, but{' '}
                <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-2xl md:text-3xl">
                  1upX
                </span>{' '}
                sees AI differently.
              </p>
            </div>

            {/* Core Belief Box - Consistent Height */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-12 min-h-[200px] flex items-center">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 text-center md:text-left w-full">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-5 rounded-xl shadow-lg flex-shrink-0">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Our Core{' '}
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      Belief
                    </span>
                  </h4>
                  <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
                    We believe AI shouldn't replace humans—it should{' '}
                    <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      empower
                    </span>{' '}
                    them to reach their full potential.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem & Solution - Consistent Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
              {/* Problem */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 h-full flex flex-col justify-center">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">The Problem</h4>
                </div>
                <p className="text-slate-300 leading-relaxed text-center">
                  Gig workers juggle scattered tools, doing repetitive tasks manually. 
                  It's fragmented and drains creativity.
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center items-center">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-full shadow-lg">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Solution */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 h-full flex flex-col justify-center">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-xl mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Our Solution</h4>
                </div>
                <p className="text-slate-300 leading-relaxed text-center">
                  AI agents handle busy work seamlessly, 
                  so you focus on creative genius.
                </p>
              </div>
            </div>

            {/* Final Message - Consistent Height */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-10 text-center min-h-[300px] flex flex-col justify-center">
              <div className="mb-8">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-5 rounded-xl shadow-lg inline-block">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-6">
                That's Why We Created{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  1upX
                </span>
              </h4>
              
              <p className="text-lg md:text-xl text-slate-100 leading-relaxed mb-6">
                Your personal AI workmate seamlessly handles redundant tasks—{' '}
                <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  exactly
                </span>{' '}
                how you'd prefer them done.
              </p>
              
              <p className="text-lg text-slate-100 font-medium">
                Our AI agents handle the busy work, so you can focus on what truly matters—
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold text-xl">
                  your creative genius
                </span>.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features - Consistent Grid
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Brain, 
              title: 'Learn Your Style', 
              desc: 'Adapts to your unique approach and preferences',
              color: 'from-cyan-500 to-blue-500',
              bgColor: 'from-cyan-50 to-blue-50'
            },
            { 
              icon: Cpu, 
              title: 'Process at Scale', 
              desc: 'Handle complex tasks with unprecedented efficiency',
              color: 'from-purple-500 to-pink-500',
              bgColor: 'from-purple-50 to-pink-50'
            },
            { 
              icon: Sparkles, 
              title: 'Deliver Excellence', 
              desc: 'Maintain your quality standards at machine speed',
              color: 'from-emerald-500 to-teal-500',
              bgColor: 'from-emerald-50 to-teal-50'
            }
          ].map(({ icon: Icon, title, desc, color, bgColor }, index) => (
            <div key={index} className="group relative h-full">
              <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 rounded-2xl blur-md group-hover:opacity-10 transition-all duration-300`}></div>
              <div className={`relative bg-gradient-to-br ${bgColor} border border-slate-200 rounded-2xl p-8 text-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center min-h-[280px]`}>
                <div className="flex items-center justify-center mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-xl text-slate-900 mb-3">{title}</h4>
                <p className="text-slate-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(0.5deg); }
          66% { transform: translateY(-3px) rotate(-0.5deg); }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default OurMission;