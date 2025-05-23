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
  Users,
  Award,
  Key,
  Fingerprint
} from 'lucide-react';

const OurMission = () => {
  return (
    <section
      id="our-mission"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen"
    >
      {/* Clean Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Subtle Glow Effects */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-purple-500/8 to-violet-600/8 blur-3xl" />
      </div>

      {/* Floating Elements - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-32 right-1/4 animate-float">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 p-3 rounded-xl">
            <Fingerprint className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        
        <div className="absolute bottom-40 left-1/4 animate-float" style={{animationDelay: '2s'}}>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 p-3 rounded-xl">
            <Key className="w-5 h-5 text-purple-400" />
          </div>
        </div>
        
        <div className="absolute top-1/2 right-16 animate-float" style={{animationDelay: '4s'}}>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/30 p-3 rounded-xl">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Enhanced Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        {[
          { icon: CircuitBoard, color: "text-cyan-400", bg: "bg-slate-800/50", border: "border-cyan-500/30", top: "top-24", left: "left-16", delay: "0s" },
          { icon: Network, color: "text-purple-400", bg: "bg-slate-800/50", border: "border-purple-500/30", top: "top-40", right: "right-20", delay: "2s" },
          { icon: Activity, color: "text-emerald-400", bg: "bg-slate-800/50", border: "border-emerald-500/30", bottom: "bottom-40", left: "left-20", delay: "4s" },
          { icon: Bot, color: "text-blue-400", bg: "bg-slate-800/50", border: "border-blue-500/30", bottom: "bottom-24", right: "right-16", delay: "1s" },
          { icon: Brain, color: "text-violet-400", bg: "bg-slate-800/50", border: "border-violet-500/30", top: "top-1/3", left: "left-1/3", delay: "3s" },
          { icon: Cpu, color: "text-indigo-400", bg: "bg-slate-800/50", border: "border-indigo-500/30", bottom: "bottom-1/3", right: "right-1/3", delay: "5s" }
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
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl shadow-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-white">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
        </div>

        {/* What We're Building */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Left Box */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-xl h-full flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-black mb-6 text-white">
              What We're{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Building
              </span>
            </h3>
            <p className="text-xl text-slate-200 leading-relaxed mb-4 font-medium">
              At{' '}
              <span className="font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                1upX
              </span>
              , we're crafting a{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                personalized AI agent
              </span>{' '}
              that mirrors how you think, work, and create.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              It's like having a{' '}
              <span className="font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                digital twin
              </span>
              —handling tasks exactly as you would, but at lightning speed.
            </p>
          </div>

          {/* Right Box */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-xl h-full flex flex-col justify-center">
            
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl p-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-black mb-4 text-center text-white">
              Your AI,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Style
              </span>
            </h3>
            
            <p className="text-slate-200 text-center leading-relaxed mb-6 font-medium">
              Unlike generic AI tools,{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                1upX
              </span>{' '}
              adapts to your unique style and knowledge.
            </p>
            
            <div className="flex justify-center">
              <div className="inline-flex items-center space-x-3 bg-slate-700/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-slate-600/50 shadow-sm">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-slate-200">
                  Delivering results that feels naturally{' '}
                  <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    YOU
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why We're Building It - Enhanced Dark Section */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl"></div>
          <div className="absolute inset-0 opacity-30 rounded-3xl">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/15 to-violet-500/15 blur-3xl" />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white rounded-3xl border border-slate-700/50">
            {/* Why Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl shadow-2xl">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Why We're Building{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  The Future
                </span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"></div>
            </div>

            {/* AI Revolution Banner */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-slate-700/60 backdrop-blur-sm border border-blue-400/30 px-8 py-4 rounded-full shadow-lg">
                <TrendingUp className="w-6 h-6 text-blue-300" />
                <span className="text-blue-100 font-semibold text-lg">The AI Revolution is Here</span>
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

            {/* Core Belief Box */}
            <div className="bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 border border-emerald-400/25 rounded-2xl p-8 mb-12 min-h-[200px] flex items-center shadow-lg">
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
                  <p className="text-lg md:text-xl text-slate-100 leading-relaxed font-medium">
                    We believe AI shouldn't replace humans—it should{' '}
                    <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      empower
                    </span>{' '}
                    them to reach their full potential.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
              {/* Problem */}
              <div className="bg-gradient-to-br from-orange-500/15 to-red-500/15 border border-orange-400/25 rounded-2xl p-8 h-full flex flex-col justify-center shadow-lg">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl mb-4 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">The Problem</h4>
                </div>
                <p className="text-slate-200 leading-relaxed text-center font-medium">
                  Gig workers juggle scattered tools, doing repetitive tasks manually. 
                  It's fragmented and drains creativity.
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center items-center">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-full shadow-xl">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Solution */}
              <div className="bg-gradient-to-br from-cyan-500/15 to-purple-500/15 border border-cyan-400/25 rounded-2xl p-8 h-full flex flex-col justify-center shadow-lg">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-xl mb-4 shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Our Solution</h4>
                </div>
                <p className="text-slate-200 leading-relaxed text-center font-medium">
                  AI agents handle busy work seamlessly, 
                  so you focus on creative genius.
                </p>
              </div>
            </div>

            {/* Final Message */}
            <div className="bg-gradient-to-br from-cyan-500/15 to-purple-500/15 border border-cyan-400/25 rounded-2xl p-10 text-center min-h-[300px] flex flex-col justify-center shadow-lg">
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
              
              <p className="text-lg md:text-xl text-slate-100 leading-relaxed mb-6 font-medium">
                Your personal AI workmate seamlessly handles redundant tasks—{' '}
                <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  exactly
                </span>{' '}
                how you'd prefer them done.
              </p>
              
              <p className="text-lg text-slate-100 font-semibold">
                Our AI agents handle the busy work, so you can focus on what truly matters—
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold text-xl">
                  your creative genius
                </span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default OurMission;