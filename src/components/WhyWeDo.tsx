import React from 'react';
import {
  Lightbulb,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Target,
  Brain,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Cpu,
  Bot,
  CircuitBoard,
  Layers,
  Network
} from 'lucide-react';

const WhyWeDo = () => {
  return (
    <section id="why-we-do" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen">
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
        <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-purple-500/8 to-violet-600/8 blur-3xl" />
      </div>

      {/* Floating Elements - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-32 right-1/4 animate-float">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 p-3 rounded-xl">
            <Brain className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        
        <div className="absolute bottom-40 left-1/4 animate-float" style={{animationDelay: '2s'}}>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 p-3 rounded-xl">
            <Network className="w-5 h-5 text-purple-400" />
          </div>
        </div>
        
        <div className="absolute top-1/2 right-16 animate-float" style={{animationDelay: '4s'}}>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 p-3 rounded-xl">
            <CircuitBoard className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 sm:p-4 rounded-2xl shadow-2xl">
              <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Why We're Building{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Future
            </span>
          </h2>
          
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto opacity-80"></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Main Philosophy Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl sm:rounded-3xl blur-sm"></div>
            
            <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-t-2xl sm:rounded-t-3xl"></div>
              
              {/* AI Revolution Badge */}
              <div className="flex justify-center mb-8 sm:mb-10">
                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-slate-700/50 backdrop-blur-sm border border-blue-500/30 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  <span className="text-blue-100 font-medium text-sm sm:text-base lg:text-lg">The AI Revolution is Here</span>
                </div>
              </div>

              {/* Main Statement */}
              <div className="text-center mb-12 sm:mb-16">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-100 leading-relaxed font-light max-w-5xl mx-auto px-2">
                  We see AI rapidly transforming the workforce. Many worry AI might replace jobs, but{' '}
                  <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    1upX
                  </span>{' '}
                  sees AI differently.
                </p>
              </div>

              {/* Core Belief Section - Responsive Height */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 lg:space-x-8 w-full text-center sm:text-left">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-4 sm:p-5 rounded-xl shadow-lg">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                      Our Core{' '}
                      <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Belief
                      </span>
                    </h3>
                    <p className="text-lg sm:text-xl text-slate-200 leading-relaxed">
                      We believe AI shouldn't replace humans—it should{' '}
                      <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        empower
                      </span>{' '}
                      them to reach their full potential.
                    </p>
                  </div>
                </div>
              </div>

              {/* Problem & Solution - Responsive Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-16">
                {/* Problem Card */}
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 sm:p-8 min-h-64 flex flex-col">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 text-center sm:text-left">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 sm:p-4 rounded-xl flex-shrink-0 mx-auto sm:mx-0">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">The Problem</h4>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-slate-300 leading-relaxed text-base sm:text-lg text-center sm:text-left">
                      Gig workers juggle scattered tools, doing repetitive tasks manually. 
                      It's fragmented and drains creativity.
                    </p>
                  </div>
                </div>

                {/* Arrow - Hidden on mobile, shown as divider on tablet/desktop */}
                <div className="hidden lg:flex min-h-64 items-center justify-center">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 sm:p-5 rounded-full shadow-lg">
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>

                {/* Mobile Arrow - Shown only on mobile */}
                <div className="lg:hidden flex justify-center py-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-3 rounded-full shadow-lg rotate-90">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Solution Card */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 min-h-64 flex flex-col">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 text-center sm:text-left">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-3 sm:p-4 rounded-xl flex-shrink-0 mx-auto sm:mx-0">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">Our Solution</h4>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-slate-300 leading-relaxed text-base sm:text-lg text-center sm:text-left">
                      AI agents handle busy work seamlessly, 
                      so you focus on creative genius.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1upX Solution Header */}
              <div className="text-center mb-10 sm:mb-12">
                <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
                  <div className="w-12 sm:w-16 lg:w-20 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 sm:p-4 rounded-full shadow-lg">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="w-12 sm:w-16 lg:w-20 h-px bg-gradient-to-r from-blue-400 to-purple-400"></div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 px-2">
                  That's Why We Created{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    1upX
                  </span>
                </h3>
              </div>

              {/* Solution Description - Responsive Height */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
                <div className="mb-6 sm:mb-8">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 sm:p-5 rounded-xl shadow-lg inline-block">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <p className="text-lg sm:text-xl lg:text-2xl text-slate-100 leading-relaxed px-2">
                    From the moment you take on a gig, your personal AI workmate seamlessly handles 
                    redundant tasks—{' '}
                    <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      exactly
                    </span>{' '}
                    how you'd prefer them done.
                  </p>
                  
                  <p className="text-lg sm:text-xl text-slate-100 font-medium px-2">
                    Simply put: our AI agents handle the busy work, 
                    so you can focus on what truly matters—
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold text-xl sm:text-2xl">
                      your creative genius
                    </span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                icon: Zap, 
                title: 'Lightning Fast', 
                desc: 'Process complex tasks at machine speed without compromising quality',
                gradient: 'from-amber-500 to-orange-500',
                borderColor: 'border-amber-500/30'
              },
              { 
                icon: Shield, 
                title: 'Human-Centered', 
                desc: 'Designed to empower and amplify human creativity, not replace it',
                gradient: 'from-emerald-500 to-cyan-500',
                borderColor: 'border-emerald-500/30'
              },
              { 
                icon: Target, 
                title: 'Precision Focus', 
                desc: 'Let you concentrate on high-value, strategic work that matters',
                gradient: 'from-purple-500 to-pink-500',
                borderColor: 'border-purple-500/30'
              }
            ].map(({ icon: Icon, title, desc, gradient, borderColor }, index) => (
              <div key={index} className="group sm:col-span-1 lg:col-span-1">
                <div className={`bg-slate-800/40 backdrop-blur-xl border ${borderColor} rounded-2xl p-6 sm:p-8 lg:p-10 text-center group-hover:bg-slate-800/60 group-hover:-translate-y-2 transition-all duration-300 h-full min-h-72 sm:min-h-80 flex flex-col justify-between`}>
                  <div className="flex flex-col items-center">
                    <div className="mb-6 sm:mb-8">
                      <div className={`bg-gradient-to-r ${gradient} p-4 sm:p-5 rounded-xl shadow-lg`}>
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                    <h4 className="font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6">{title}</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-base sm:text-lg flex-1 flex items-center justify-center">{desc}</p>
                </div>
              </div>
            ))}
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

export default WhyWeDo;