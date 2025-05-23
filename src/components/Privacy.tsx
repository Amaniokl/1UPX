import React from 'react';
import {
  Shield,
  Lock,
  Crown,
  Key,
  Eye,
  FileText,
  Fingerprint,
  Database,
  UserCheck,
  Sparkles,
  Zap,
  CheckCircle,
  Award,
  Layers,
  Network
} from 'lucide-react';

const PrivacyOwnership = () => {
  const privacyFeatures = [
    {
      icon: Shield,
      title: "Zero Data Sharing",
      description: "We never train public LLMs on your data. Your personal AI model is trained in complete isolation.",
      gradient: "from-emerald-500 to-cyan-500",
      borderColor: "border-emerald-500/30",
      badge: "100% Private"
    },
    {
      icon: Crown,
      title: "Your Knowledge = Your Asset",
      description: "Your workflows and decision patterns are encrypted and converted into a unique NFT for verifiable ownership.",
      gradient: "from-amber-500 to-orange-500",
      borderColor: "border-amber-500/30",
      badge: "NFT Protected"
    },
    {
      icon: Lock,
      title: "Fully Secure Pipelines",
      description: "All data stays compartmentalized and accessible only by your personal AI. No cross-contamination ever.",
      gradient: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500/30",
      badge: "Encrypted"
    }
  ];

  return (
    
    <section id="privacy-ownership" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen">
      {/* Clean Grid Background */}
      {/* <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white opacity-100" /> */}
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
        <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-purple-500/8 to-violet-600/8 blur-3xl" />
      </div>

      {/* Floating Elements - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-32 right-1/4 animate-float">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 p-3 rounded-xl">
            <Fingerprint className="w-5 h-5 text-emerald-400" />
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 sm:p-4 rounded-2xl shadow-2xl">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Your Creativity, Your Art{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              is Yours
            </span>
          </h2>
          
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto opacity-80 mb-6 sm:mb-8"></div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto px-2">
            <span className="font-bold text-white">100% Privacy.</span>{' '}
            <span className="font-bold text-white">Your Privacy.</span>{' '}
            <span className="font-bold text-white">Your IP.</span>{' '}
            <span className="font-bold text-white">Your Control.</span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Main Philosophy Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-2xl sm:rounded-3xl blur-sm"></div>
            
            <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-t-2xl sm:rounded-t-3xl"></div>
              
              {/* Privacy Promise Badge */}
              <div className="flex justify-center mb-8 sm:mb-10">
                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-slate-700/50 backdrop-blur-sm border border-emerald-500/30 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  <span className="text-emerald-100 font-medium text-sm sm:text-base lg:text-lg">Non-Negotiable Privacy</span>
                </div>
              </div>

              {/* Main Statement */}
              <div className="text-center mb-12 sm:mb-16">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-100 leading-relaxed font-light max-w-5xl mx-auto px-2">
                  At{' '}
                  <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    1upX
                  </span>, your intellectual property and data privacy are{' '}
                  <span className="font-bold text-white">non-negotiable</span>.
                </p>
              </div>

              {/* Core Promise Section */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
                <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 lg:space-x-8 w-full text-center sm:text-left">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-4 sm:p-5 rounded-xl shadow-lg">
                      <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                      Your{' '}
                      <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Genius
                      </span>{' '}
                      Remains Yours
                    </h3>
                    <p className="text-lg sm:text-xl text-slate-200 leading-relaxed">
                      We don't monetize your data or clone without your permission.{' '}
                      <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Ever.
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {privacyFeatures.map(({ icon: Icon, title, description, gradient, borderColor, badge }, index) => (
                  <div key={index} className="group sm:col-span-1 lg:col-span-1">
                    <div className={`bg-slate-800/40 backdrop-blur-xl border ${borderColor} rounded-2xl p-6 sm:p-8 lg:p-10 text-center group-hover:bg-slate-800/60 group-hover:-translate-y-2 transition-all duration-300 h-full min-h-80 flex flex-col justify-between`}>
                      <div className="flex flex-col items-center">
                        <div className="mb-6 sm:mb-8">
                          <div className={`bg-gradient-to-r ${gradient} p-4 sm:p-5 rounded-xl shadow-lg`}>
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                        </div>
                        <h4 className="font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6">{title}</h4>
                        <p className="text-slate-300 leading-relaxed text-base sm:text-lg flex-1 flex items-center justify-center">{description}</p>
                      </div>
                      
                      {/* Badge */}
                      <div className="mt-6 pt-4 border-t border-slate-700/50">
                        <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${gradient} bg-opacity-10 border ${borderColor} px-4 py-2 rounded-full`}>
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`}></div>
                          <span className="text-sm font-medium text-slate-300">{badge}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Privacy Guarantees */}
              <div className="space-y-8 sm:space-y-10">
                <div className="text-center mb-8 sm:mb-12">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
                    <div className="w-12 sm:w-16 lg:w-20 h-px bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 sm:p-4 rounded-full shadow-lg">
                      <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="w-12 sm:w-16 lg:w-20 h-px bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 px-2">
                    Our{' '}
                    <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Privacy Guarantees
                    </span>
                  </h3>
                </div>

                {/* Guarantee Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* No Training Guarantee */}
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 text-center sm:text-left">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 sm:p-4 rounded-xl flex-shrink-0 mx-auto sm:mx-0">
                        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">We Do Not Train Public LLMs</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 text-left">
                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                            <p className="text-slate-300 text-base sm:text-lg">Your personal AI model is trained in isolation</p>
                          </div>
                          <div className="flex items-start space-x-3 text-left">
                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                            <p className="text-slate-300 text-base sm:text-lg">None of your work or thought patterns are used for general AI</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ownership Guarantee */}
                  <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 text-center sm:text-left">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-3 sm:p-4 rounded-xl flex-shrink-0 mx-auto sm:mx-0">
                        <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">You Own Your Clone</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 text-left">
                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                            <p className="text-slate-300 text-base sm:text-lg">The AI version of you is completely yours</p>
                          </div>
                          <div className="flex items-start space-x-3 text-left">
                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                            <p className="text-slate-300 text-base sm:text-lg">We never monetize or access without permission</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Assurance */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
                  <div className="mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-4 sm:p-5 rounded-xl shadow-lg inline-block">
                      <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>
                  
                  <p className="text-lg sm:text-xl lg:text-2xl text-slate-100 leading-relaxed px-2 mb-6">
                    Your workflows, decision-making patterns, and unique chain of thought are{' '}
                    <span className="font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      encrypted and converted into a unique NFT
                    </span>.
                  </p>
                  
                  <p className="text-lg sm:text-xl text-slate-100 font-medium px-2">
                    This ensures that your knowledge is{' '}
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-bold">
                      verifiable, ownable, and protected
                    </span>{' '}
                    as a digital asset.
                  </p>
                </div>
              </div>
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

export default PrivacyOwnership;