import React, { useState, useEffect } from 'react';
import { Check, Zap, Sparkles, TrendingUp, Star, Rocket, Award, X } from 'lucide-react';

const SignUpPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    linkedin: '',
    excitement: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        expertise: '',
        experience: '',
        linkedin: '',
        excitement: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.expertise.trim()) newErrors.expertise = 'Area of expertise is required';
    if (!formData.experience.trim()) newErrors.experience = 'Years of experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch('https://backend-1upx.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert('❌ Submission failed. Please try again.');
      }
    } catch (err) {
      alert('❌ Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) rgba(255, 255, 255, 0.03);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.3) 0%, rgba(79, 70, 229, 0.3) 100%);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.6) 0%, rgba(79, 70, 229, 0.6) 100%);
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
        }
        
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
      
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Container */}
        <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-auto custom-scrollbar">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {/* Gradient Orbs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          </div>

          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-white/10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute top-8 left-1/4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-xl shadow-lg shadow-cyan-500/25">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute bottom-12 right-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-2 rounded-xl shadow-lg shadow-pink-500/25">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute top-1/2 left-6 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg shadow-yellow-500/25">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute top-20 right-6 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-2 rounded-xl shadow-lg shadow-emerald-500/25">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="relative z-10 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-3 mb-4 shadow-2xl shadow-cyan-500/40 animate-pulse">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent mb-3 leading-tight">
                  Join the Future of Work
                </h2>
                <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  Get early access to <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">1upX</span> — where AI handles the routine so you can focus on what matters most.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-white/95 backdrop-blur-xl text-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-white/20">
                  <div className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full p-4 mb-6 shadow-2xl shadow-emerald-500/40">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Welcome Aboard! 🎉
                  </h3>
                  <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for joining our exclusive early access program. We'll be in touch with exciting updates soon!
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                    >
                      Sign Up Another Account
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/95 backdrop-blur-xl text-gray-800 rounded-2xl shadow-2xl p-6 space-y-6 border border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300 focus:border-purple-500'
                          } focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-400`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm font-medium">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300 focus:border-purple-500'
                          } focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-400`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm font-medium">{errors.email}</p>}
                    </div>

                    {/* Expertise */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Area of Expertise *</label>
                      <select
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.expertise ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300 focus:border-purple-500'
                          } focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800`}
                      >
                        <option value="" className="text-gray-400">Select your expertise</option>
                        <option value="Software Developer">Software Developer</option>
                        <option value="Video Editor">Video Editor</option>
                        <option value="Content Creator">Content Creator</option>
                        <option value="Designer">Designer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Business Consulting">Business Consulting</option>
                        <option value="Market Research">Market Research</option>
                        <option value="Strategic Planning">Strategic Planning</option>
                        <option value="Financial Analysis">Financial Analysis</option>
                        <option value="Operations Strategy">Operations Strategy</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.expertise && <p className="text-red-500 text-sm font-medium">{errors.expertise}</p>}
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Years of Experience *</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.experience ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300 focus:border-purple-500'
                          } focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800`}
                      >
                        <option value="" className="text-gray-400">Select your experience level</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                      {errors.experience && <p className="text-red-500 text-sm font-medium">{errors.experience}</p>}
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn Profile <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-400"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  {/* Excitement */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">What excites you about 1upX? <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea
                      name="excitement"
                      rows={3}
                      value={formData.excitement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-400 resize-none"
                      placeholder="Share what excites you most about joining 1upX..."
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    {/* <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button> */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`flex-1 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'
                        }`}
                    >
                      {loading ? 'Submitting...' : 'Join the Waitlist'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPopup;