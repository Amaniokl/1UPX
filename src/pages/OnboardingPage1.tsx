import { useState } from 'react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
// import OnboardingStepper from '../components/OnboardingStepper';
import { useOnboarding } from '../components/context/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  User, 
  Globe, 
  Linkedin, 
  Twitter, 
  Briefcase,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Users,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Zap,
  Star,
  Heart,
  Hexagon,
  Triangle,
  Circle,
  Square
} from 'lucide-react';

// Enhanced Input Component
const FormInput = ({ 
  icon: Icon, 
  label, 
  required = false, 
  error = '', 
  theme = 'default',
  ...props 
}: {
  icon: any;
  label: string;
  required?: boolean;
  error?: string;
  theme?: 'default' | 'cyan' | 'purple';
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const themeColors = {
    default: 'focus:border-slate-500 focus:ring-slate-500/20',
    cyan: 'focus:border-cyan-500 focus:ring-cyan-500/20',
    purple: 'focus:border-purple-500 focus:ring-purple-500/20'
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={props.id} className="text-slate-700 font-medium flex items-center gap-2 text-sm">
        {label}
        {required && <span className="text-red-500 text-xs">*</span>}
      </Label>
      <div className="relative group">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-200" />
        <Input 
          {...props}
          className={`
            pl-10 h-10 border-slate-200 rounded-lg transition-all duration-200 text-sm
            hover:border-slate-300 hover:shadow-sm
            ${themeColors[theme]}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}
          `}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-600 text-xs flex items-center gap-1">
          <div className="w-1 h-1 bg-red-500 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};

// Enhanced Account Type Card
const AccountTypeCard = ({ 
  type, 
  icon: Icon, 
  title, 
  description, 
  isSelected, 
  onClick,
  gradient,
  bgGradient 
}: {
  type: 'company' | 'individual';
  icon: any;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  gradient: string;
  bgGradient: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative group p-4 rounded-xl border-2 transition-all duration-300 w-full
        ${isSelected 
          ? `border-transparent bg-gradient-to-br ${bgGradient} shadow-lg scale-[1.02] ring-2 ring-offset-2 ${type === 'company' ? 'ring-cyan-500/20' : 'ring-purple-500/20'}` 
          : 'border-slate-200 bg-white/50 hover:border-slate-300 hover:bg-white/80 hover:shadow-md hover:scale-[1.01]'
        }
        backdrop-blur-sm
      `}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <div className={`
            p-3 rounded-xl transition-all duration-300 shadow-sm
            ${isSelected 
              ? `bg-gradient-to-r ${gradient} shadow-lg` 
              : 'bg-slate-100 group-hover:bg-slate-200'
            }
          `}>
            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
          </div>
          
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className={`w-3 h-3 ${type === 'company' ? 'text-cyan-500' : 'text-purple-500'}`} />
            </div>
          )}
        </div>
        
        <div className="text-center space-y-1">
          <h3 className={`font-semibold text-base ${isSelected ? (type === 'company' ? 'text-cyan-700' : 'text-purple-700') : 'text-slate-700'}`}>
            {title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${type === 'company' ? 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5' : 'bg-gradient-to-br from-purple-500/5 to-pink-500/5'}
      `} />
    </button>
  );
};

// Success Message Component
const SuccessMessage = ({ data }: { data: any }) => (
  <div className="animate-in slide-in-from-bottom-4 duration-500">
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-sm" />
      <div className="relative bg-gradient-to-br from-emerald-50/90 to-teal-50/90 backdrop-blur-sm border border-emerald-200/60 p-4 rounded-xl shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg shadow-lg">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-semibold text-emerald-800 text-base mb-1">Perfect! Information Saved</h4>
              <p className="text-emerald-700 text-xs">
                Your profile has been created successfully. Let's move to the next step.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm border border-emerald-200/40 rounded-lg p-3">
              <h5 className="font-medium text-emerald-800 mb-2 text-xs">Summary:</h5>
              <div className="space-y-1 text-xs text-emerald-700">
                {data.isCompany ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3 h-3" />
                      <span>Company: {data.companyName || 'Not specified'}</span>
                    </div>
                    {data.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        <span>Website: {data.website}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>Name: {data.name || 'Not specified'}</span>
                    </div>
                    {data.portfolio && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3 h-3" />
                        <span>Portfolio: {data.portfolio}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function OnboardingStep1() {
  // Get context data and methods
  const { data: contextData, setData } = useOnboarding();
  const navigate = useNavigate();
  
  // Use context data or initialize with defaults
  const [isCompany, setIsCompany] = useState<null | boolean>(contextData.isCompany ?? null);
  const [formData, setFormData] = useState({
    companyName: contextData.companyName || '',
    linkedIn: contextData.linkedIn || '',
    website: contextData.website || '',
    twitter: contextData.twitter || '',
    name: contextData.name || '',
    portfolio: contextData.portfolio || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Update both local state and context when company type changes
  const handleCompanyTypeChange = (value: boolean) => {
    setIsCompany(value);
    setData({ isCompany: value });
  };

  // Update both local state and context when form fields change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update local state
    setFormData({ ...formData, [name]: value });
    
    // Update context
    setData({ [name]: value });
    
    // Clear errors
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (isCompany === true) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
    } else if (isCompany === false) {
      if (!formData.name.trim()) {
        newErrors.name = 'Your name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Save all form data to context at once
      setData({
        isCompany,
        ...formData
      });
      
      setSubmitted(true);
      
      // Optional: Navigate to next step after a short delay
      setTimeout(() => {
        navigate('/onboarding2');
      }, 1500);
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
          { icon: Building2, color: "text-cyan-600", bg: "bg-cyan-100/90", border: "border-cyan-300/70", top: "top-28", left: "left-12", delay: "0s" },
          { icon: Users, color: "text-purple-600", bg: "bg-purple-100/90", border: "border-purple-300/70", top: "top-40", right: "right-16", delay: "2s" },
          { icon: Globe, color: "text-emerald-600", bg: "bg-emerald-100/90", border: "border-emerald-300/70", bottom: "bottom-40", left: "left-16", delay: "4s" },
          { icon: UserCircle, color: "text-blue-600", bg: "bg-blue-100/90", border: "border-blue-300/70", bottom: "bottom-28", right: "right-12", delay: "1s" }
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
              Tell Us About{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Yourself
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Help us personalize your AI experience by sharing some basic information
            </p>
            
            {/* Divider */}
            <div className="flex items-center justify-center space-x-3 mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-cyan-500 rounded-full" />
              <div className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>

          {/* Main Form Card */}
          <div className="w-full max-w-4xl">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
              
              <Card className="relative bg-white/85 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
                {/* Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                
                <CardContent className="p-6 md:p-8 space-y-8">
                  {/* Account Type Selection */}
                  <div className="space-y-6">
                    <div className="text-center space-y-3">
                      <Label className="text-xl font-bold text-slate-800 block">
                        What best describes you?
                      </Label>
                      <p className="text-slate-600 text-base">
                        Choose the option that fits your profile
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      <AccountTypeCard
                        type="company"
                        icon={Building2}
                        title="Company"
                        description="Business, startup, or organization looking to scale operations"
                        isSelected={isCompany === true}
                        onClick={() => handleCompanyTypeChange(true)}
                        gradient="from-cyan-500 to-blue-500"
                        bgGradient="from-cyan-50/90 to-blue-50/90"
                      />
                      
                      <AccountTypeCard
                        type="individual"
                        icon={User}
                        title="Individual"
                        description="Freelancer, consultant, or personal user seeking AI assistance"
                        isSelected={isCompany === false}
                        onClick={() => handleCompanyTypeChange(false)}
                        gradient="from-purple-500 to-pink-500"
                        bgGradient="from-purple-50/90 to-pink-50/90"
                      />
                    </div>
                  </div>

                  {/* Dynamic Form Fields */}
                  {isCompany === true && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center justify-center gap-2">
                          <Building2 className="w-5 h-5 text-cyan-600" />
                          Company Information
                        </h3>
                        <p className="text-slate-600 text-sm">Tell us about your organization</p>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        <div className="md:col-span-2">
                          <FormInput
                            icon={Building2}
                            label="Company Name"
                            required
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enter your company name"
                            theme="cyan"
                            error={errors.companyName}
                          />
                        </div>
                        
                        <FormInput
                          icon={Globe}
                          label="Website"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://yourcompany.com"
                          theme="cyan"
                        />
                        
                        <FormInput
                          icon={Linkedin}
                          label="LinkedIn"
                          id="linkedIn"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleChange}
                          placeholder="LinkedIn company page"
                          theme="cyan"
                        />
                        
                        <div className="md:col-span-2">
                          <FormInput
                            icon={Twitter}
                            label="Twitter"
                            id="twitter"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            placeholder="@yourcompany or Twitter URL"
                            theme="cyan"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {isCompany === false && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center justify-center gap-2">
                          <User className="w-5 h-5 text-purple-600" />
                          Personal Information
                        </h3>
                        <p className="text-slate-600 text-sm">Tell us about yourself</p>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
                      </div>
                      
                      <div className="space-y-4 max-w-xl mx-auto">
                        <FormInput
                          icon={User}
                          label="Your Name"
                          required
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          theme="purple"
                          error={errors.name}
                        />
                        
                        <FormInput
                          icon={Briefcase}
                          label="Portfolio URL"
                          id="portfolio"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleChange}
                          placeholder="https://yourportfolio.com"
                          theme="purple"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  {isCompany !== null && !submitted && (
                    <div className="pt-6 animate-in slide-in-from-bottom-4 duration-700">
                      <div className="max-w-md mx-auto">
                        <Button 
                          onClick={handleSubmit}
                          className={`
                            w-full h-12 text-base font-semibold rounded-xl shadow-lg
                            bg-gradient-to-r ${isCompany ? 'from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' : 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}
                            text-white border-0 transition-all duration-300
                            hover:shadow-xl hover:scale-[1.02]
                            group relative overflow-hidden
                          `}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          <span className="flex items-center justify-center space-x-2 relative z-10">
                            <span>Continue to Next Step</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {submitted && (
                    <SuccessMessage data={{ isCompany, ...formData }} />
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
}
