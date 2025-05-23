import React from 'react';
import { Workflow, FileText, Users, Eye, Database, Brain, Cpu, Zap } from 'lucide-react';
import SectionHeading from './shared/SectionHeading';

const HowWeDo = () => {
  const steps = [
    {
      id: 1,
      title: 'Capture Your Expertise',
      description:
        'We analyze your previous projects, working methods, and preferences to understand your unique style and approach.',
      icon: <FileText className="w-8 h-8 text-white" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      accent: 'blue',
    },
    {
      id: 2,
      title: 'Train Your Personal AI',
      description:
        'We build your digital twin—powered by global best practices, fine-tuned to your methodology and thinking patterns.',
      icon: <Brain className="w-8 h-8 text-white" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      accent: 'purple',
    },
    {
      id: 3,
      title: 'Multi-Agent Collaboration',
      description:
        'Specialized AI agents collaborate in perfect sync, handling complex tasks across multiple domains simultaneously.',
      icon: <Users className="w-8 h-8 text-white" />,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      accent: 'emerald',
    },
    {
      id: 4,
      title: 'Human Oversight & Control',
      description:
        'You remain in complete control—reviewing and refining outputs to guarantee quality, authenticity, and your personal touch.',
      icon: <Eye className="w-8 h-8 text-white" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      accent: 'orange',
    },
  ];

  return (
    <section id="how-we-do-it" className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-32 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 blur-3xl"></div>
      </div>

      {/* Floating AI elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 animate-float">
          <Cpu className="w-6 h-6 text-blue-400 opacity-30" />
        </div>
        <div className="absolute top-64 right-1/3 animate-float" style={{animationDelay: '1s'}}>
          <Database className="w-5 h-5 text-purple-400 opacity-30" />
        </div>
        <div className="absolute bottom-48 left-1/2 animate-float" style={{animationDelay: '2s'}}>
          <Zap className="w-7 h-7 text-emerald-400 opacity-30" />
        </div>
      </div>

      <div className="container px-4 relative z-10">
        <SectionHeading
          title="How Our AI Magic Works"
          icon={<Workflow className="w-6 h-6 text-purple-600" />}
        />

        {/* Process visualization */}
        <div className="mt-20 max-w-7xl mx-auto">
          {/* Connection lines */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 600">
              <defs>
                <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M200,150 Q400,100 600,150 Q400,200 200,350 Q400,300 600,350"
                stroke="url(#connectionGrad)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`group relative animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glowing background */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.color} opacity-10 blur-xl group-hover:opacity-20 transition-all duration-500`}></div>
                
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${step.bgColor} border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 backdrop-blur-sm`}>
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-t-3xl`}></div>
                  
                  {/* Step number and icon */}
                  <div className="flex items-center mb-6">
                    <div className={`relative w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl shadow-lg mr-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm"></div>
                      <div className="relative">
                        {step.icon}
                      </div>
                    </div>
                    
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} text-white text-xl font-black rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-700 text-lg leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="flex items-center space-x-2 pt-4">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((dot) => (
                          <div
                            key={dot}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              dot <= step.id 
                                ? `bg-gradient-to-r ${step.color}` 
                                : 'bg-slate-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className="text-sm text-slate-500 font-medium">
                        Step {step.id} of 4
                      </span>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${step.color} opacity-20 rounded-full blur-lg`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r ${step.color} opacity-30 rounded-full blur-md`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA section */}
        <div className="mt-20 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl rounded-2xl"></div>
            <div className="relative bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Workflow className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ready to Experience the Future?
                </h3>
              </div>
              <p className="text-slate-700 text-lg mb-6 max-w-2xl mx-auto">
                Join our early access program and be among the first to experience 
                the power of personalized AI that works exactly like you do.
              </p>
              <a
                href="#sign-up"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Get Started Now</span>
                <Zap className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HowWeDo;