import React from 'react';
import { Clock, CheckCircle, BarChart3, Zap, Sparkles, TrendingUp, Shield, Target, Users, Brain } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "70% Faster Turnaround",
      description: "Your AI assistant takes on routine groundwork, accelerating your delivery timelines without sacrificing quality.",
      gradient: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/30",
      stat: "70%",
      statLabel: "Faster"
    },
    {
      icon: CheckCircle,
      title: "Higher Accuracy & Quality",
      description: "Reduce human errors and increase consistency with your personal AI trained to deliver at your standards.",
      gradient: "from-emerald-500 to-cyan-500",
      borderColor: "border-emerald-500/30",
      stat: "99%",
      statLabel: "Accuracy"
    },
    {
      icon: BarChart3,
      title: "Do More, Stress Less",
      description: "Easily manage more projects without compromising on quality or feeling overwhelmed.",
      gradient: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500/30",
      stat: "3x",
      statLabel: "More Projects"
    }
  ];

  return (
    <section id="benefits" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
      {/* Clean Grid Background - matching WhyWeDo */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px'
          }} 
        />
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

      {/* Subtle Glow Effects - matching WhyWeDo */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/8 to-violet-600/8 blur-3xl" />
      </div>

      {/* Floating Elements - matching WhyWeDo style */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 animate-float">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 p-3 rounded-xl">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        
        <div className="absolute bottom-40 right-1/4 animate-float" style={{animationDelay: '2s'}}>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 p-3 rounded-xl">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
        </div>
        
        <div className="absolute top-1/2 left-16 animate-float" style={{animationDelay: '4s'}}>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 p-3 rounded-xl">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header - matching WhyWeDo style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            How{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              1upX
            </span>{' '}
            Transforms Your Work
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto opacity-80"></div>
        </div>

        {/* Benefits Cards - Equal Height like WhyWeDo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map(({ icon: Icon, title, description, gradient, borderColor, stat, statLabel }, index) => (
            <div key={index} className="group h-98">
              <div className={`bg-slate-800/40 backdrop-blur-xl border ${borderColor} rounded-2xl p-10 text-center group-hover:bg-slate-800/60 group-hover:-translate-y-2 transition-all duration-300 h-full flex flex-col`}>
                {/* Top Section: Icon and Stat */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`bg-gradient-to-r ${gradient} p-4 rounded-xl shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                      {stat}
                    </div>
                    <div className="text-sm text-slate-400 font-medium">{statLabel}</div>
                  </div>
                </div>

                {/* Middle Section: Title */}
                <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>

                {/* Bottom Section: Description */}
                <div className="flex-1 flex items-center">
                  <p className="text-slate-300 leading-relaxed text-lg">{description}</p>
                </div>

                {/* Bottom Badge */}
                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${gradient} bg-opacity-10 border ${borderColor} px-4 py-2 rounded-full`}>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`}></div>
                    <span className="text-sm font-medium text-slate-300">
                      {index === 0 ? 'Speed Boost' : index === 1 ? 'Quality Assured' : 'Scale Efficiently'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section - matching WhyWeDo structure */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl blur-sm"></div>
          
          <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-t-3xl"></div>
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-4 mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-full shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="w-20 h-px bg-gradient-to-r from-blue-400 to-purple-400"></div>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
                The Complete{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Advantage
                </span>
              </h3>
            </div>

            {/* Main Content */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-10 text-center mb-12">
              <p className="text-xl md:text-2xl text-slate-100 leading-relaxed mb-8">
                When you combine faster turnaround, higher accuracy, and the ability to handle more projects, 
                you don't just work better—you{' '}
                <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  transform your entire career
                </span>.
              </p>
            </div>

            {/* Bottom Feature Grid - Equal Height */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    { icon: Zap, title: 'More Revenue', desc: 'Handle 3x more projects efficiently', gradient: 'from-amber-500 to-orange-500' },
    { icon: Shield, title: 'Less Stress', desc: 'AI handles the boring repetitive work', gradient: 'from-emerald-500 to-cyan-500' },
    { icon: TrendingUp, title: 'Better Reputation', desc: 'Consistent quality delivery every time', gradient: 'from-purple-500 to-pink-500' }
  ].map(({ icon: Icon, title, desc, gradient }, i) => (
    <div
      key={i}
      className="min-h-[260px] bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 text-center flex flex-col justify-center"
    >
      <div className="mb-6">
        <div className={`bg-gradient-to-r ${gradient} p-4 rounded-2xl shadow-xl inline-block`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h4 className="font-bold text-white text-xl mb-3">{title}</h4>
      <p className="text-slate-300 text-base leading-relaxed">{desc}</p>
    </div>
  ))}
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

export default Benefits;