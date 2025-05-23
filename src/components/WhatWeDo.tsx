import React from 'react';
import { Brain, Sparkles, Cpu, Bot, Zap, CircuitBoard, Network, Layers, Target, Activity } from 'lucide-react';
import SectionHeading from './shared/SectionHeading';

const WhatWeDo = () => {
  return (
    <section
      id="what-we-do"
      className="relative section bg-white py-24 sm:py-32 overflow-hidden"
    >
      {/* Clean Background Grid - Very Subtle */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
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

      {/* Minimal Background Orbs - Far from text areas */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 blur-3xl"></div>
      </div>

      {/* Clean Floating AI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-sm w-8 h-8"></div>
            <div className="relative bg-white border border-cyan-200 p-2 rounded-lg shadow-sm">
              <CircuitBoard className="w-4 h-4 text-cyan-600" />
            </div>
          </div>
        </div>
        
        <div className="absolute top-32 right-20 animate-float" style={{animationDelay: '2s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-sm w-8 h-8"></div>
            <div className="relative bg-white border border-purple-200 p-2 rounded-lg shadow-sm">
              <Network className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-20 animate-float" style={{animationDelay: '4s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-sm w-8 h-8"></div>
            <div className="relative bg-white border border-emerald-200 p-2 rounded-lg shadow-sm">
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-16 animate-float" style={{animationDelay: '1s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-sm w-8 h-8"></div>
            <div className="relative bg-white border border-blue-200 p-2 rounded-lg shadow-sm">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Clean Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-md w-14 h-14"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl p-3 shadow-lg">
                <Brain className="w-8 h-8 text-slate-700" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">
            What We're{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Building
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Enhanced Left Text Section with Clean Background */}
          <div className="lg:col-span-3 fade-in space-y-8">
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 shadow-lg">
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl font-light text-slate-800 leading-relaxed">
                  At{' '}
                  <span className="relative font-bold">
                    <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                      1upX
                    </span>
                  </span>
                  , we're crafting a{' '}
                  <span className="font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    personalized AI agent
                  </span>{' '}
                  that mirrors how you think, work, and create.
                </p>
                
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                  It's like having a{' '}
                  <span className="font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                    digital twin
                  </span>
                  —handling repetitive tasks exactly as you would, but at lightning speed.
                </p>
              </div>
            </div>

            {/* Clean Highlight Box */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl blur-sm group-hover:from-cyan-500/8 group-hover:to-purple-500/8 transition-all duration-300"></div>
              <div className="relative p-8 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-3 -left-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-sm w-12 h-12"></div>
                    <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-xl shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-xl md:text-2xl font-medium text-slate-800 pl-8 leading-relaxed">
                  This frees you to focus on work that's{' '}
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    deeply human
                  </span>
                  —creative, strategic, and valuable.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Right Card Section */}
          <div className="lg:col-span-2 fade-in">
            <div className="relative group">
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 blur-xl group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="relative rounded-3xl border border-slate-200 bg-white shadow-2xl p-10 hover:shadow-cyan-500/5 transition-all duration-500 group-hover:-translate-y-1">
                {/* Clean Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-t-3xl"></div>
                
                {/* AI Agent Icon */}
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-md w-16 h-16"></div>
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 shadow-lg">
                      <Sparkles className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black mb-6 text-center text-slate-900">
                  Your AI,{' '}
                  <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    Your Style
                  </span>
                </h3>
                
                <div className="space-y-6">
                  <p className="text-slate-700 text-lg leading-relaxed text-center">
                    Unlike generic AI tools,{' '}
                    <span className="font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                      1upX
                    </span>{' '}
                    adapts to your unique style and knowledge.
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
                        <Target className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        Delivering results that feel naturally{' '}
                        <span className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                          YOU
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 rounded-2xl blur-md group-hover:opacity-10 transition-all duration-300`}></div>
              <div className={`relative bg-gradient-to-br ${bgColor} border border-slate-200 rounded-2xl p-8 text-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300`}>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 rounded-xl blur-sm w-14 h-14`}></div>
                    <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-xl text-slate-900 mb-3">{title}</h4>
                <p className="text-slate-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Agent Showcase */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-blue-900/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-white border border-slate-200 rounded-3xl p-12 shadow-xl">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center space-x-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-16 h-px bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Ready to meet your{' '}
                  <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    AI companion?
                  </span>
                </h3>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Experience the future of personalized AI assistance that understands your workflow and amplifies your capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
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
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;