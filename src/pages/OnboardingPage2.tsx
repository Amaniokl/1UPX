import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { 
  Image,
  Check, 
  Sparkles, 
  ArrowRight, 
  Briefcase,
  Code,
  TrendingUp,
  Users,
  Calculator,
  Palette,
  Heart,
  GraduationCap,
  ShoppingCart,
  Home,
  Factory,
  HandHeart,
  Building,
  PenTool,
  Scale,
  Stethoscope,
  Target,
  Headphones,
  Search,
  Video,
  LayoutDashboard,
  BookOpen,
  Music,
  User,
  Database,
  BarChart2,
  MessageSquare,
  Zap,
  Star,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useOnboarding } from '../components/context/OnboardingContext';
import { useContext } from 'react';
import { Web3Context, isConnectedState } from '../providers/Web3ContextProvider';

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  // const { getToken } = useAuth();
  const web3Context = useContext(Web3Context);
  const walletAddress = isConnectedState(web3Context) ? web3Context.address : null;
  const { data: contextData, setData } = useOnboarding();
  
  const [selectedFields, setSelectedFields] = useState(contextData.selectedFields || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableFields = [
    {
      name: "Software Developer",
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50/90 to-cyan-50/90",
      shadowColor: "shadow-blue-500/25",
    },
    {
      name: "Video Generator",
      icon: Video,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50/90 to-rose-50/90",
      shadowColor: "shadow-pink-500/25",
    },
    {
      name: "Content Creator",
      icon: PenTool,
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50/90 to-violet-50/90",
      shadowColor: "shadow-purple-500/25",
    },
    {
      name: "Designer",
      icon: Palette,
      gradient: "from-rose-500 to-orange-500",
      bgGradient: "from-rose-50/90 to-orange-50/90",
      shadowColor: "shadow-rose-500/25",
    },
    {
      name: "UI/UX Designer",
      icon: LayoutDashboard,
      gradient: "from-fuchsia-500 to-pink-500",
      bgGradient: "from-fuchsia-50/90 to-pink-50/90",
      shadowColor: "shadow-fuchsia-500/25",
    },
    {
      name: "Business Consulting",
      icon: Briefcase,
      gradient: "from-blue-500 to-emerald-500",
      bgGradient: "from-blue-50/90 to-emerald-50/90",
      shadowColor: "shadow-blue-500/25",
    },
    {
      name: "Market Research",
      icon: Search,
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50/90 to-blue-50/90",
      shadowColor: "shadow-indigo-500/25",
    },
    {
      name: "Strategic Planning",
      icon: Target,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50/90 to-amber-50/90",
      shadowColor: "shadow-orange-500/25",
    },
    {
      name: "Financial Analysis",
      icon: BarChart2,
      gradient: "from-slate-600 to-gray-600",
      bgGradient: "from-slate-50/90 to-gray-50/90",
      shadowColor: "shadow-slate-500/25",
    },
    {
      name: "Business Outreach",
      icon: Users,
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50/90 to-cyan-50/90",
      shadowColor: "shadow-teal-500/25",
    },
    {
      name: "Music & Audio",
      icon: Music,
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50/90 to-pink-50/90",
      shadowColor: "shadow-red-500/25",
    },
    {
      name: "Writing & Translation",
      icon: BookOpen,
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-50/90 to-purple-50/90",
      shadowColor: "shadow-violet-500/25",
    },
    {
      name: "Personal Growth",
      icon: User,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50/90 to-emerald-50/90",
      shadowColor: "shadow-green-500/25",
    },
    {
      name: "Consulting",
      icon: MessageSquare,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50/90 to-blue-50/90",
      shadowColor: "shadow-cyan-500/25",
    },
    {
      name: "Data",
      icon: Database,
      gradient: "from-gray-600 to-slate-600",
      bgGradient: "from-gray-50/90 to-slate-50/90",
      shadowColor: "shadow-gray-500/25",
    },
    {
      name: "Image Generation",
      icon: Image,
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-50/90 to-yellow-50/90",
      shadowColor: "shadow-amber-500/25",
    },
  ];

  const toggleField = (field) => {
    const updatedFields = selectedFields.includes(field)
      ? selectedFields.filter(f => f !== field)
      : [...selectedFields, field];
    
    setSelectedFields(updatedFields);
    setData({ selectedFields: updatedFields });
  };

  const handleKeyPress = (event, field) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggleField(field);
    }
  };

  const handleContinue = async () => {
    if (selectedFields.length === 0) {
      alert("Please select at least one field");
      return;
    }
    
    setIsSubmitting(true);

    try {
      setData({ 
        selectedFields,
        fieldsSubmitted: true
      });
      
      console.log('Fields saved to context successfully:', selectedFields);
      
      setTimeout(() => {
        navigate('/onboarding3');
      }, 500);
    } catch (error) {
      console.error('Error saving fields to context:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridMove 20s linear infinite'
        }} />
        
        {/* Floating Orbs */}
        <div className="absolute top-24 right-16 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-24 left-16 w-56 h-56 bg-gradient-to-br from-purple-400/20 to-violet-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-br from-emerald-400/15 to-teal-500/15 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '6s' }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[
          { icon: Briefcase, color: "text-cyan-600", bg: "bg-cyan-100/90", border: "border-cyan-300/70", top: "top-28", left: "left-12", delay: "0s" },
          { icon: Code, color: "text-purple-600", bg: "bg-purple-100/90", border: "border-purple-300/70", top: "top-40", right: "right-16", delay: "2s" },
          { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100/90", border: "border-emerald-300/70", bottom: "bottom-40", left: "left-16", delay: "4s" },
          { icon: Palette, color: "text-blue-600", bg: "bg-blue-100/90", border: "border-blue-300/70", bottom: "bottom-28", right: "right-12", delay: "1s" }
        ].map(({ icon: Icon, color, bg, border, delay, ...position }, idx) => (
          <div key={idx} className={`absolute animate-float-complex hidden lg:block ${Object.entries(position).map(([key, value]) => `${key.split('-')[0]}-${value.split('-')[1]}`).join(' ')}`} style={{ animationDelay: delay }}>
            <div className="relative group">
              <div className={`absolute inset-0 w-10 h-10 rounded-xl ${bg} blur-sm opacity-60`} />
              <div className={`relative ${bg} backdrop-blur-xl border ${border} p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-all duration-500`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Top Spacing for Navbar */}
        <div className="h-16" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
          {/* Header */}
          <div className="text-center mb-10 max-w-4xl">
            <div className="inline-flex items-center justify-center mb-6 relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-xl w-16 h-16 animate-pulse-slow" />
              
              {/* Main Icon Container */}
              <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500">
                <Sparkles className="w-7 h-7 text-white relative z-10" />
                
                {/* Orbiting Elements */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-slate-900">
              What Fields Do You{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Work In?
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Select all the industries or domains where you apply your expertise. 
              This helps us create a more personalized AI agent for you.
            </p>
            
            {/* Divider */}
            <div className="flex items-center justify-center space-x-3 mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-cyan-500 rounded-full" />
              <div className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>

          {/* Main Content Card */}
          <div className="w-full max-w-6xl">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
              
              <Card className="relative bg-white/85 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
                {/* Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                
                <CardContent className="p-6 md:p-8">
                  {/* Selection Counter */}
                  {selectedFields.length > 0 && (
                    <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-500">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-50/90 to-purple-50/90 border border-cyan-200/70 px-4 py-2 rounded-xl shadow-md backdrop-blur-sm">
                        <div className="relative">
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
                          <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-ping opacity-75" />
                        </div>
                        <span className="text-slate-800 font-medium text-sm">
                          {selectedFields.length} field{selectedFields.length === 1 ? '' : 's'} selected
                        </span>
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  )}

                  {/* Fields Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
                    {availableFields.map((field, index) => {
                      const isSelected = selectedFields.includes(field.name);
                      const Icon = field.icon;
                      
                      return (
                        <div
                          key={field.name}
                          role="button"
                          tabIndex={0}
                          className={`
                            relative group cursor-pointer transition-all duration-300 transform
                            ${isSelected ? 'scale-105 z-10' : 'hover:scale-105 hover:z-10'}
                            animate-in slide-in-from-bottom-4
                          `}
                          style={{ animationDelay: `${index * 30}ms` }}
                          onClick={() => toggleField(field.name)}
                          onKeyDown={(e) => handleKeyPress(e, field.name)}
                        >
                          {/* Glow Effect */}
                          <div className={`
                            absolute inset-0 bg-gradient-to-r ${field.gradient} opacity-0 
                            ${isSelected ? 'opacity-25' : 'group-hover:opacity-15'} 
                            rounded-xl blur-md transition-all duration-300
                          `} />

                          {/* Main Card */}
                          <div className={`
                            relative p-4 rounded-xl border transition-all duration-300
                            ${isSelected 
                              ? `border-transparent bg-gradient-to-br ${field.bgGradient} shadow-lg ${field.shadowColor}` 
                              : 'border-slate-200/60 bg-white/70 hover:border-slate-300/80 hover:bg-white/90 hover:shadow-md'
                            }
                            backdrop-blur-sm min-h-[100px] flex flex-col items-center justify-center
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/30
                          `}>
                            {/* Selection Indicator */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 animate-in zoom-in-50 duration-300">
                                <div className="relative">
                                  <div className={`w-5 h-5 bg-gradient-to-r ${field.gradient} rounded-full flex items-center justify-center shadow-md`}>
                                    <Check className="w-3 h-3 text-white font-bold" />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Icon */}
                            <div className={`
                              p-2 rounded-lg mb-2 transition-all duration-300 relative
                              ${isSelected 
                                ? `bg-gradient-to-r ${field.gradient} shadow-md` 
                                : 'bg-slate-100/80 group-hover:bg-slate-200/80 group-hover:scale-110'
                              }
                            `}>
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-700'} transition-all duration-300`} />
                            </div>

                            {/* Field Name */}
                            <div className={`
                              font-semibold text-center text-xs leading-tight
                              ${isSelected ? 'text-slate-900' : 'text-slate-800'}
                              transition-all duration-300
                            `}>
                              {field.name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Continue Button */}
                  <div className="text-center">
                    <Button
                      onClick={handleContinue}
                      disabled={selectedFields.length === 0 || isSubmitting}
                      className={`
                        h-12 px-8 text-base font-semibold rounded-xl shadow-lg relative overflow-hidden
                        ${selectedFields.length > 0 && !isSubmitting
                          ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white border-0 hover:shadow-xl hover:scale-105 transform'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed border-0'
                        }
                        transition-all duration-300 group
                      `}
                    >
                      {/* Button Glow Effect */}
                      {selectedFields.length > 0 && !isSubmitting && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                      )}
                      
                      <span className="relative flex items-center justify-center space-x-2">
                        <span>{isSubmitting ? 'Saving...' : 'Continue'}</span>
                        {!isSubmitting && (
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        )}
                        {isSubmitting && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Selected Fields Preview */}
          {/* {selectedFields.length > 0 && (
            <div className="w-full max-w-4xl mt-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-xl blur-md transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-emerald-50/90 to-teal-50/90 backdrop-blur-sm border border-emerald-300/60 p-4 rounded-xl shadow-md">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg shadow-md">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-emerald-900 mb-3 flex items-center space-x-2">
                        <span>Your Selected Fields</span>
                        <Globe className="w-4 h-4" />
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedFields.map((field, index) => {
                          const fieldData = availableFields.find(f => f.name === field);
                          return (
                            <span
                              key={field}
                              className={`
                                inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium
                                bg-gradient-to-r ${fieldData?.gradient || 'from-slate-500 to-gray-500'} 
                                text-white shadow-md hover:scale-105 transition-all duration-300
                                animate-in zoom-in-50
                              `}
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              {fieldData && <fieldData.icon className="w-3 h-3" />}
                              <span>{field}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>

      <style>{`
        @keyframes float-complex {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-8px) rotate(1deg) scale(1.02); }
          50% { transform: translateY(-4px) rotate(-0.5deg) scale(1.01); }
          75% { transform: translateY(-10px) rotate(0.5deg) scale(1.02); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        .animate-float-complex {
          animation: float-complex 10s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OnboardingStep2;
