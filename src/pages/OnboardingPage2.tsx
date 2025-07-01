import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useOnboarding } from '../components/context/OnboardingContext';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { Web3Context, isConnectedState } from '../providers/Web3ContextProvider';

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const web3Context = useContext(Web3Context);
  const walletAddress = isConnectedState(web3Context) ? web3Context.address : null;
  const { data: contextData, setData } = useOnboarding();
  
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState(contextData.selectedFields || []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined color schemes for fields
  const colorSchemes = [
    {
      gradient: 'from-pink-500 to-rose-500',
      bg_gradient: 'from-pink-50 to-rose-50',
      shadow_color: 'shadow-pink-200/50',
      border_color: 'border-pink-300',
      icon_bg: 'bg-pink-100',
      glow: 'from-pink-400/30 to-rose-400/30'
    },
    {
      gradient: 'from-purple-500 to-violet-500',
      bg_gradient: 'from-purple-50 to-violet-50',
      shadow_color: 'shadow-purple-200/50',
      border_color: 'border-purple-300',
      icon_bg: 'bg-purple-100',
      glow: 'from-purple-400/30 to-violet-400/30'
    },
    {
      gradient: 'from-blue-500 to-cyan-500',
      bg_gradient: 'from-blue-50 to-cyan-50',
      shadow_color: 'shadow-blue-200/50',
      border_color: 'border-blue-300',
      icon_bg: 'bg-blue-100',
      glow: 'from-blue-400/30 to-cyan-400/30'
    },
    {
      gradient: 'from-emerald-500 to-teal-500',
      bg_gradient: 'from-emerald-50 to-teal-50',
      shadow_color: 'shadow-emerald-200/50',
      border_color: 'border-emerald-300',
      icon_bg: 'bg-emerald-100',
      glow: 'from-emerald-400/30 to-teal-400/30'
    },
    {
      gradient: 'from-orange-500 to-amber-500',
      bg_gradient: 'from-orange-50 to-amber-50',
      shadow_color: 'shadow-orange-200/50',
      border_color: 'border-orange-300',
      icon_bg: 'bg-orange-100',
      glow: 'from-orange-400/30 to-amber-400/30'
    },
    {
      gradient: 'from-red-500 to-pink-500',
      bg_gradient: 'from-red-50 to-pink-50',
      shadow_color: 'shadow-red-200/50',
      border_color: 'border-red-300',
      icon_bg: 'bg-red-100',
      glow: 'from-red-400/30 to-pink-400/30'
    },
    {
      gradient: 'from-indigo-500 to-purple-500',
      bg_gradient: 'from-indigo-50 to-purple-50',
      shadow_color: 'shadow-indigo-200/50',
      border_color: 'border-indigo-300',
      icon_bg: 'bg-indigo-100',
      glow: 'from-indigo-400/30 to-purple-400/30'
    },
    {
      gradient: 'from-green-500 to-emerald-500',
      bg_gradient: 'from-green-50 to-emerald-50',
      shadow_color: 'shadow-green-200/50',
      border_color: 'border-green-300',
      icon_bg: 'bg-green-100',
      glow: 'from-green-400/30 to-emerald-400/30'
    },
    {
      gradient: 'from-yellow-500 to-orange-500',
      bg_gradient: 'from-yellow-50 to-orange-50',
      shadow_color: 'shadow-yellow-200/50',
      border_color: 'border-yellow-300',
      icon_bg: 'bg-yellow-100',
      glow: 'from-yellow-400/30 to-orange-400/30'
    },
    {
      gradient: 'from-slate-600 to-gray-600',
      bg_gradient: 'from-slate-50 to-gray-50',
      shadow_color: 'shadow-slate-200/50',
      border_color: 'border-slate-300',
      icon_bg: 'bg-slate-100',
      glow: 'from-slate-400/30 to-gray-400/30'
    }
  ];

  // Function to get color scheme for a field
  const getColorScheme = (index) => {
    return colorSchemes[index % colorSchemes.length];
  };

  // Default SVG path for fields without icons
  const defaultSvgPath = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

  // Fetch fields from API and user's selected fields if available
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching fields from API...');
        const fieldsResponse = await axios.get('https://backend-1upx.onrender.com/api/fields');
        
        if (fieldsResponse.data && fieldsResponse.data.data) {
          setAvailableFields(fieldsResponse.data.data);
          console.log('Available fields fetched:', fieldsResponse.data.data.length);
        } else {
          throw new Error('Invalid fields response format');
        }
        
        // If user is logged in, fetch their selected fields
        if (walletAddress) {
          console.log('Fetching user fields for address:', walletAddress);
          try {
            const userFieldsResponse = await axios.get(`https://backend-1upx.onrender.com/api/user-fields/${walletAddress}`);
            
            if (userFieldsResponse.data && userFieldsResponse.data.data) {
              const userFieldNames = userFieldsResponse.data.data.map(field => field.name);
              console.log('User has previously selected fields:', userFieldNames);
              
              setSelectedFields(userFieldNames);
              setData({ selectedFields: userFieldNames });
            }
          } catch (userFieldsError) {
            console.log('No existing user fields found or error fetching them:', userFieldsError);
            // This is not a critical error, so we don't set the error state
          }
        }
      } catch (error) {
        console.error('Error fetching fields:', error);
        setError(error.message || 'Failed to fetch fields');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [walletAddress]);

  // Toggle field selection
  const toggleField = (fieldName) => {
    const updatedFields = selectedFields.includes(fieldName)
      ? selectedFields.filter(f => f !== fieldName)
      : [...selectedFields, fieldName];
    
    setSelectedFields(updatedFields);
    setData({ selectedFields: updatedFields });
  };

  // Handle keyboard accessibility
  const handleKeyPress = (event, field) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggleField(field);
    }
  };

  // Handle continue button click
  const handleContinue = async () => {
    if (selectedFields.length === 0) {
      alert("Please select at least one field");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Save to context
      setData({ 
        selectedFields,
        fieldsSubmitted: true
      });
      
      // Save to database if user is logged in
      if (walletAddress) {
        console.log('Saving fields to database for user:', walletAddress);
        await axios.post('https://backend-1upx.onrender.com/api/user-fields', {
          user_id: walletAddress,
          fieldNames: selectedFields
        });
        console.log('Fields saved to database successfully');
      }
      
      console.log('Fields saved to context successfully:', selectedFields);
      
      setTimeout(() => {
        navigate('/onboarding3');
      }, 500);
    } catch (error) {
      console.error('Error saving fields:', error);
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
                  {/* Loading State */}
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-slate-600">Loading available fields...</p>
                    </div>
                  )}
                  
                  {/* Error State */}
                  {error && !isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Failed to Load Fields</h3>
                      <p className="text-slate-600 mb-4">{error}</p>
                      <Button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}

                  {/* Selection Counter */}
                  {selectedFields.length > 0 && !isLoading && !error && (
                    <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-500">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-50/90 to-purple-50/90 border border-cyan-200/70 px-4 py-2 rounded-xl shadow-md backdrop-blur-sm">
                        <div className="relative">
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
                          <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-ping opacity-75" />
                        </div>
                        <span className="text-slate-800 font-medium text-sm">
                          {selectedFields.length} field{selectedFields.length === 1 ? '' : 's'} selected
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Fields Grid */}
                  {!isLoading && !error && availableFields.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                      {availableFields.map((field, index) => {
                        const isSelected = selectedFields.includes(field.name);
                        const colorScheme = getColorScheme(index);
                        
                        return (
                          <div
                            key={field.id || index}
                            role="button"
                            tabIndex={0}
                            className={`
                              relative group cursor-pointer transition-all duration-500 transform
                              ${isSelected ? 'scale-105 z-10' : 'hover:scale-105 hover:z-10'}
                              animate-in slide-in-from-bottom-4
                            `}
                            style={{ animationDelay: `${index * 30}ms` }}
                            onClick={() => toggleField(field.name)}
                            onKeyDown={(e) => handleKeyPress(e, field.name)}
                          >
                            {/* Enhanced Glow Effect */}
                            <div className={`
                              absolute inset-0 bg-gradient-to-r ${colorScheme.glow} 
                              ${isSelected ? 'opacity-40 blur-lg' : 'opacity-0 group-hover:opacity-20 blur-md'} 
                              rounded-xl transition-all duration-500
                            `} />

                            {/* Main Card */}
                            <div className={`
                              relative p-5 rounded-xl border-2 transition-all duration-500
                              ${isSelected 
                                ? `border-transparent bg-gradient-to-br ${colorScheme.bg_gradient} shadow-xl ${colorScheme.shadow_color} ring-2 ring-white/50` 
                                : 'border-slate-200/60 bg-white/80 hover:border-slate-300/80 hover:bg-white/95 hover:shadow-lg'
                              }
                              backdrop-blur-sm min-h-[120px] flex flex-col items-center justify-center
                              focus:outline-none focus:ring-2 focus:ring-cyan-500/30
                            `}>
                              {/* Selection Indicator */}
                              {isSelected && (
                                <div className="absolute top-3 right-3 animate-in zoom-in-50 duration-300">
                                  <div className="relative">
                                    <div className={`w-6 h-6 bg-gradient-to-r ${colorScheme.gradient} rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/50`}>
                                      <Check className="w-3.5 h-3.5 text-white font-bold" />
                                    </div>
                                    {/* Pulsing ring effect */}
                                    <div className={`absolute inset-0 w-6 h-6 bg-gradient-to-r ${colorScheme.gradient} rounded-full animate-ping opacity-30`} />
                                  </div>
                                </div>
                              )}

                              {/* Icon */}
                              <div className={`
                                p-3 rounded-xl mb-3 transition-all duration-500 relative
                                ${isSelected 
                                  ? `bg-gradient-to-r ${colorScheme.gradient} shadow-lg ring-2 ring-white/30` 
                                  : `${colorScheme.icon_bg} group-hover:bg-slate-200/80 group-hover:scale-110`
                                }
                              `}>
                                {/* Icon glow effect when selected */}
                                {isSelected && (
                                  <div className={`absolute inset-0 bg-gradient-to-r ${colorScheme.gradient} rounded-xl blur-md opacity-50`} />
                                )}
                                
                                {/* Dynamic SVG rendering */}
                                <svg 
                                  width="24" 
                                  height="24" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`relative z-10 ${isSelected ? 'text-white' : 'text-slate-700'} transition-colors duration-300`}
                                >
                                  <path 
                                    d={field.svg_path || defaultSvgPath} 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>

                              {/* Field Name */}
                              <div className={`
                                font-semibold text-center text-sm leading-tight
                                ${isSelected ? 'text-slate-900' : 'text-slate-800'}
                                transition-all duration-300
                              `}>
                                {field.name}
                              </div>

                              {/* Subtle background pattern when selected */}
                              {isSelected && (
                                <div className="absolute inset-0 opacity-5">
                                  <div className="w-full h-full" style={{
                                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                                                     radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                                                     radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`
                                  }} />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* No Fields Message */}
                  {!isLoading && !error && availableFields.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-slate-600">No fields available. Please check back later.</p>
                    </div>
                  )}

                  {/* Continue Button */}
                  {!isLoading && !error && (
                    <div className="text-center">
                      <Button
                        onClick={handleContinue}
                        disabled={selectedFields.length === 0 || isSubmitting}
                        className={`
                          h-14 px-10 text-lg font-semibold rounded-xl shadow-lg relative overflow-hidden
                          ${selectedFields.length > 0 && !isSubmitting
                            ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white border-0 hover:shadow-2xl hover:scale-105 transform'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed border-0'
                          }
                          transition-all duration-300 group
                        `}
                      >
                        {/* Button Glow Effect */}
                        {selectedFields.length > 0 && !isSubmitting && (
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                        )}
                        
                        <span className="relative flex items-center justify-center space-x-3">
                          <span>{isSubmitting ? 'Saving...' : 'Continue'}</span>
                          {!isSubmitting && (
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          )}
                          {isSubmitting && (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          )}
                        </span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
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
