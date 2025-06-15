import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useOnboarding } from '../components/context/OnboardingContext';
import {
  Sparkles,
  ArrowRight,
  Plus,
  X,
  Edit3,
  CheckCircle,
  Workflow,
  Target,
  Settings,
  Layers,
  ChevronRight,
  Save,
  Trash2,
  Check,
  Play
} from 'lucide-react';

const jobSteps: Record<string, string[]> = {
  "Software Developer": [
    "Gather and document technical requirements",
    "Design software architecture and APIs",
    "Write, test, and deploy code to production"
  ],
  "Video Generator": [
    "Write script and storyboard scenes",
    "Generate visuals and animations using AI tools",
    "Edit footage and publish video content"
  ],
  "Content Creator": [
    "Research audience interests and trends",
    "Produce engaging written or multimedia content",
    "Optimize and distribute content across platforms"
  ],
  "Designer": [
    "Understand client needs and brand guidelines",
    "Create wireframes, mockups, or illustrations",
    "Refine and export final assets for delivery"
  ],
  "UI/UX Designer": [
    "Conduct user research and gather insights",
    "Design user flows, wireframes, and prototypes",
    "Perform usability testing and refine designs"
  ],
  "Business Consulting": [
    "Analyze client business challenges",
    "Collect and interpret relevant data",
    "Develop actionable strategic recommendations"
  ],
  "Market Research": [
    "Define target market and objectives",
    "Design and run surveys or focus groups",
    "Analyze findings and deliver insights"
  ],
  "Strategic Planning": [
    "Assess current business landscape",
    "Develop long-term strategic roadmap",
    "Set KPIs and monitor outcomes"
  ],
  "Financial Analysis": [
    "Collect financial statements and metrics",
    "Perform ratio and trend analysis",
    "Create reports and present findings"
  ],
  "Business Outreach": [
    "Identify leads and partnership opportunities",
    "Craft outreach messaging and contact targets",
    "Follow up and build long-term relationships"
  ],
  "Music & Audio": [
    "Compose or source music and sound assets",
    "Record and mix audio tracks or voiceovers",
    "Master and publish final audio content"
  ],
  "Writing & Translation": [
    "Understand context and tone requirements",
    "Write original or translated material",
    "Proofread and ensure cultural relevance"
  ],
  "Personal Growth": [
    "Identify goals and growth areas",
    "Follow a structured improvement plan",
    "Track progress and reflect on outcomes"
  ],
  "Consulting": [
    "Define scope of engagement with client",
    "Conduct research and gather domain knowledge",
    "Provide expert advice and implementation plan"
  ],
  "Data": [
    "Collect and validate raw data from sources",
    "Clean, preprocess, and transform data",
    "Visualize data and derive actionable insights"
  ],
  "Image Generation": [
    "Formulate creative image prompts",
    "Generate visual content using AI models",
    "Post-process and enhance image outputs"
  ]
};

// Enhanced Field Item Component
const FieldItem = ({ field, isSelected, onClick }: { field: string; isSelected: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-3 rounded-xl border-2 transition-all duration-300 text-left
        flex items-center justify-between group
        ${isSelected
          ? 'border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 shadow-md'
          : 'border-slate-200 bg-white/60 text-slate-700 hover:border-slate-300 hover:bg-white/80 hover:shadow-sm'
        }
        backdrop-blur-sm
      `}
    >
      <span className="font-medium text-sm leading-tight pr-2">{field}</span>
      {isSelected && (
        <CheckCircle className="w-4 h-4 text-cyan-600 flex-shrink-0" />
      )}
    </button>
  );
};

// Enhanced Add Field Component
const AddFieldSection = ({ onNavigateToFieldSelection }: {
  onNavigateToFieldSelection: () => void;
}) => {
  return (
    <button
      onClick={onNavigateToFieldSelection}
      className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl 
                 flex items-center justify-center text-slate-500 hover:border-cyan-400 
                 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-300 group
                 bg-white/40 backdrop-blur-sm"
    >
      <div className="flex items-center space-x-2">
        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        <span className="font-medium">Add New Field</span>
      </div>
    </button>
  );
};

// Updated Step Editor Component with Clickable Job Buttons
const StepEditor = ({ steps, onChange, fieldName, onJobClick }: {
  steps: string[];
  onChange: (steps: string[]) => void;
  fieldName: string;
  onJobClick?: (jobDescription: string, fieldName: string) => void;
}) => {
  const [localSteps, setLocalSteps] = useState(steps);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    setLocalSteps(steps);
  }, [steps]);

  const handleEditClick = (index: number, currentValue: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent job click when editing
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  const handleJobClick = (jobDescription: string) => {
    if (onJobClick && jobDescription.trim()) {
      onJobClick(jobDescription, fieldName);
    }
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updated = [...localSteps];
      updated[editingIndex] = editValue;
      setLocalSteps(updated);
      onChange(updated);
      setEditingIndex(null);
      setEditValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const addStep = () => {
    const updated = [...localSteps, ''];
    setLocalSteps(updated);
    onChange(updated);
    // Automatically start editing the new step
    setEditingIndex(updated.length - 1);
    setEditValue('');
  };

  const removeStep = (index: number) => {
    if (localSteps.length > 1) {
      const updated = localSteps.filter((_, i) => i !== index);
      setLocalSteps(updated);
      onChange(updated);
      // Cancel editing if we're editing the removed step
      if (editingIndex === index) {
        setEditingIndex(null);
        setEditValue('');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Steps Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg shadow-lg">
          <Workflow className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Jobs</h3>
          <p className="text-sm text-slate-600">Different jobs in {fieldName}</p>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {localSteps.map((step, index) => (
          <div key={index} className="group relative">
            <div className="flex items-center space-x-3">
              {/* Step Number */}
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 
                            rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {index + 1}
              </div>

              {/* Step Content - Either Button or Input */}
              <div className="flex-1 relative">
                {editingIndex === index ? (
                  // Edit Mode - Show Input
                  <div className="flex items-center space-x-2">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder={`Job ${index + 1} description`}
                      className="h-12 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 
                               rounded-xl pl-4 bg-white/80 backdrop-blur-sm flex-1"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit();
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                    />
                    <Button
                      onClick={handleSaveEdit}
                      size="sm"
                      className="h-8 px-3 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-slate-600"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  // View Mode - Show Clickable Job Button
                  <button
                    onClick={() => handleJobClick(step)}
                    className="w-full h-12 border-2 border-slate-200 hover:border-cyan-400 
                             rounded-xl pl-4 pr-16 bg-gradient-to-r from-white/90 to-slate-50/90 
                             backdrop-blur-sm text-left transition-all duration-200 
                             hover:from-cyan-50/90 hover:to-blue-50/90 hover:shadow-md
                             focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500
                             text-slate-700 font-medium group-hover:scale-[1.01]
                             active:scale-[0.99] cursor-pointer relative overflow-hidden
                             hover:border-cyan-500 hover:shadow-lg"
                  >
                    {/* Job Description */}
                    <span className="block truncate pr-2">
                      {step || `Click to add job ${index + 1} description`}
                    </span>

                    {/* Play Icon for Job Execution */}
                    {step && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1.5 rounded-full shadow-lg">
                          <Play className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    )}

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                  </button>
                )}

                {/* Edit Button */}
                {editingIndex !== index && (
                  <button
                    onClick={(e) => handleEditClick(index, step, e)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200
                             p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Remove Button */}
              {localSteps.length > 1 && editingIndex !== index && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStep(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                           text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 p-0 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Connection Line */}
            {index < localSteps.length - 1 && (
              <div className="ml-4 mt-2 mb-1">
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Step Button */}
      <Button
        variant="ghost"
        onClick={addStep}
        className="w-full h-12 border-2 border-dashed border-slate-300 rounded-xl
                   text-slate-600 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50/50
                   transition-all duration-300 group"
      >
        <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
        Add New Job
      </Button>
    </div>
  );
};

// Success Message Component (similar to OnboardingStep1)
const SuccessMessage = () => (
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
              <h4 className="font-semibold text-emerald-800 text-base mb-1">Perfect! Workflow Saved</h4>
              <p className="text-emerald-700 text-xs">
                Your workflow has been created successfully. Moving to the next step...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function OnboardingStep3() {
  const navigate = useNavigate();
  const { data: contextData, setData } = useOnboarding();

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [fieldSteps, setFieldSteps] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNavigateToFieldSelection = () => {
    navigate('/onboarding2');
  };

  // Handle job click
  // In OnboardingStep3.tsx

// Update the handleJobClick function
const handleJobClick = (jobDescription: string, fieldName: string) => {
  console.log(`Executing job: "${jobDescription}" in field: "${fieldName}"`);
  
  // Save the selected job and field to context
  setData({
    selectedJob: jobDescription,
    selectedJobField: fieldName
  });
  
  // Navigate to onboarding4 with the selected job
  navigate('/onboarding4');
};


  // Initialize from context data
  useEffect(() => {
    // Get selected fields from context
    const selectedFields = contextData.selectedFields || [];
    setFields(selectedFields);

    // Set the first field as selected if available
    if (selectedFields.length > 0) {
      setSelectedField(selectedFields[0]);
    }

    // Initialize field steps from context or defaults
    const savedFieldSteps = contextData.fieldSteps || {};
    const initialFieldSteps: Record<string, string[]> = {};

    // For each field, use saved steps from context or default steps from jobSteps
    selectedFields.forEach(field => {
      initialFieldSteps[field] = savedFieldSteps[field] || jobSteps[field] || [''];
    });

    setFieldSteps(initialFieldSteps);
  }, [contextData.selectedFields]);

  const handleStepChange = (steps: string[]) => {
    if (selectedField) {
      const updatedFieldSteps = {
        ...fieldSteps,
        [selectedField]: steps,
      };

      setFieldSteps(updatedFieldSteps);

      // Update context in real-time
      setData({ fieldSteps: updatedFieldSteps });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    try {
      // Save all data to context
      setData({
        fieldSteps,
        workflowSubmitted: true
      });

      console.log('Workflow steps saved to context successfully!');

      // Show success state briefly before navigating
      setSubmitted(true);
      setTimeout(() => {
        navigate('/onboarding4');
      }, 1500);
    } catch (error) {
      console.error('Failed to save steps:', error);
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
          { icon: Workflow, color: "text-cyan-600", bg: "bg-cyan-100/90", border: "border-cyan-300/70", top: "top-28", left: "left-12", delay: "0s" },
          { icon: Target, color: "text-purple-600", bg: "bg-purple-100/90", border: "border-purple-300/70", top: "top-40", right: "right-16", delay: "2s" },
          { icon: Settings, color: "text-emerald-600", bg: "bg-emerald-100/90", border: "border-emerald-300/70", bottom: "bottom-40", left: "left-16", delay: "4s" },
          { icon: Layers, color: "text-blue-600", bg: "bg-blue-100/90", border: "border-blue-300/70", bottom: "bottom-28", right: "right-12", delay: "1s" }
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
        <div className="flex-1 flex flex-col py-8 px-4">
          {/* Header */}
          <div className="text-center mb-10 max-w-4xl mx-auto">
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
              Define Your{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Workflow
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Break down your process into clear steps. Click on any job to execute it instantly.
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-3 mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-cyan-500 rounded-full" />
              <div className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto w-full">
            {/* Sidebar */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />

                <Card className="relative bg-white/85 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
                  {/* Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

                  <CardContent className="p-6 space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Your Fields</h3>
                      <p className="text-sm text-slate-600">Select a field to edit its workflow</p>
                    </div>

                    {/* Fields List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {fields.map((field) => (
                        <FieldItem
                          key={field}
                          field={field}
                          isSelected={selectedField === field}
                          onClick={() => setSelectedField(field)}
                        />
                      ))}
                    </div>

                    {/* Add Field Section */}
                    <div className="pt-4 border-t border-slate-200/60">
                      <AddFieldSection
                        onNavigateToFieldSelection={handleNavigateToFieldSelection}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />

                <Card className="relative bg-white/85 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden min-h-[500px]">
                  {/* Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

                  <CardContent className="p-6 md:p-8">
                    {submitted ? (
                      <SuccessMessage />
                    ) : selectedField ? (
                      <>
                        {/* Field Header */}
                        <div className="mb-8">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl shadow-lg">
                              <Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h2 className="text-xl font-bold text-slate-800">{selectedField}</h2>
                              <p className="text-slate-600 text-sm">Click any job to execute it</p>
                            </div>
                          </div>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-60" />
                        </div>

                        {/* Step Editor */}
                        <StepEditor
                          steps={fieldSteps[selectedField] || ['']}
                          onChange={handleStepChange}
                          fieldName={selectedField}
                          onJobClick={handleJobClick}
                        />

                        {/* Submit Button */}
                        <div className="mt-8 pt-6 border-t border-slate-200/60">
                          <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`
                              w-full md:w-auto h-12 text-base font-semibold rounded-xl shadow-lg
                              bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
                              text-white border-0 transition-all duration-300
                              hover:shadow-xl hover:scale-[1.02]
                              group relative overflow-hidden
                            `}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <span className="flex items-center justify-center space-x-2 relative z-10">
                              <Save className="w-5 h-5" />
                              <span>{isSubmitting ? 'Saving...' : 'Continue to Next Step'}</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-96 text-center">
                        <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-2xl mb-6">
                          <Workflow className="w-12 h-12 text-slate-400 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">Select a Field</h3>
                        <p className="text-slate-600">Choose a field from the sidebar to define its workflow steps</p>
                      </div>

                    )}
                  </CardContent>
                </Card>
              </div>
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
