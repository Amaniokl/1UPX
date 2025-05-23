import React, { useState } from 'react';
import { Check, Zap, Sparkles, TrendingUp, Star, Rocket, Award } from 'lucide-react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    linkedin: '',
    excitement: ''
  });

  const [errors, setErrors] = useState({} as Record<string, string>);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true); // start loading

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
      setLoading(false); // end loading
    }
  };


  return (
    <section id="sign-up" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[size:100px_100px] opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)' }}></div>
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
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-2xl shadow-lg shadow-cyan-500/25 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 right-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-4 rounded-2xl shadow-lg shadow-pink-500/25 backdrop-blur-sm border border-white/20">
            <Rocket className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-1/2 left-12 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg shadow-yellow-500/25 backdrop-blur-sm border border-white/20">
            <Award className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-40 right-12 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
          <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-4 rounded-2xl shadow-lg shadow-emerald-500/25 backdrop-blur-sm border border-white/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>
          <div className="bg-gradient-to-r from-violet-400 to-purple-500 p-3 rounded-2xl shadow-lg shadow-violet-500/25 backdrop-blur-sm border border-white/20">
            <Star className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-4 mb-6 shadow-2xl shadow-cyan-500/40 animate-pulse">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent mb-4 leading-tight">
            Join the Future of Work
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Get early access to <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">1upX</span> — where AI handles the routine so you can focus on what matters most.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white/95 backdrop-blur-xl text-gray-800 rounded-3xl shadow-2xl p-12 text-center border border-white/20">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full p-6 mb-8 shadow-2xl shadow-emerald-500/40">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Welcome Aboard! 🎉
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Thank you for joining our exclusive early access program. We'll be in touch with exciting updates soon!
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              Sign Up Another Account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-xl text-gray-800 rounded-3xl shadow-2xl p-10 space-y-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-xl border-2 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300 focus:border-purple-500'
                    } focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-400`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm font-medium flex items-center gap-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-xl border-2 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300 focus:border-purple-500'
                    } focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-400`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm font-medium flex items-center gap-1">{errors.email}</p>}
              </div>

              {/* Expertise */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area of Expertise *</label>
                <select
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-xl border-2 ${errors.expertise ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300 focus:border-purple-500'
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
                {errors.expertise && <p className="text-red-500 text-sm font-medium flex items-center gap-1">{errors.expertise}</p>}
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-xl border-2 ${errors.experience ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300 focus:border-purple-500'
                    } focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800`}
                >
                  <option value="" className="text-gray-400">Select your experience level</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
                {errors.experience && <p className="text-red-500 text-sm font-medium flex items-center gap-1">{errors.experience}</p>}
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-400"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* Excitement */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">What excites you about 1upX? <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea
                name="excitement"
                rows={4}
                value={formData.excitement}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white/80 transition-all duration-300 text-gray-800 placeholder-gray-400 resize-none"
                placeholder="Share what excites you most about joining 1upX..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'
                }`}
            >
              {loading ? 'Submitting...' : 'Join the Waitlist'}
            </button>

          </form>
        )}
      </div>
    </section>
  );
};

export default SignUpForm;