import { useEffect, useState } from 'react';
import OnboardingStepper from '../components/OnboardingStepper';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useOnboarding } from '../components/context/OnboardingContext'; // Import the context hook
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

function OnboardingStep3() {
  const navigate = useNavigate();
  const { data: contextData, setData } = useOnboarding(); // Get context data and methods

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [isAddingField, setIsAddingField] = useState(false);
  const [fieldSteps, setFieldSteps] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleNavigateToFieldSelection = () => {
    navigate('/onboarding2');
  };

  // Handle job click - you can customize this behavior
  const handleJobClick = (jobDescription: string, fieldName: string) => {
    console.log(`Executing job: "${jobDescription}" in field: "${fieldName}"`);
    // You can add navigation to a job execution page or open a modal here
    // For example:
    // navigate(`/execute-job`, { state: { job: jobDescription, field: fieldName } });
    
    // Or show a toast/notification
    alert(`Starting job: ${jobDescription}`);
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

  const handleAddField = (newField: string) => {
    const updatedFields = [...fields, newField];
    setFields(updatedFields);
    setSelectedField(newField);

    const updatedFieldSteps = {
      ...fieldSteps,
      [newField]: [''],
    };

    setFieldSteps(updatedFieldSteps);

    // Update context with new field and empty steps
    setData({
      selectedFields: updatedFields,
      fieldSteps: updatedFieldSteps
    });
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
      setTimeout(() => {
        navigate('/onboarding4');
      }, 800);
    } catch (error) {
      console.error('Failed to save steps:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background elements remain unchanged */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />

        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-violet-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[
          { icon: Workflow, color: "text-cyan-600", bg: "bg-cyan-100/80", border: "border-cyan-200/60", top: "top-24", left: "left-16", delay: "0s" },
          { icon: Target, color: "text-purple-600", bg: "bg-purple-100/80", border: "border-purple-200/60", top: "top-40", right: "right-20", delay: "2s" },
          { icon: Settings, color: "text-emerald-600", bg: "bg-emerald-100/80", border: "border-emerald-200/60", bottom: "bottom-40", left: "left-20", delay: "4s" },
          { icon: Layers, color: "text-blue-600", bg: "bg-blue-100/80", border: "border-blue-200/60", bottom: "bottom-24", right: "right-16", delay: "1s" }
        ].map(({ icon: Icon, color, bg, border, delay, ...position }, idx) => (
          <div key={idx} className={`absolute animate-float hidden lg:block ${Object.entries(position).map(([key, value]) => `${key.split('-')[0]}-${value.split('-')[1]}`).join(' ')}`} style={{ animationDelay: delay }}>
            <div className="relative">
              <div className={`absolute inset-0 w-12 h-12 rounded-xl ${bg} blur-sm`} />
              <div className={`relative ${bg} backdrop-blur-sm border ${border} p-3 rounded-xl shadow-lg`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Stepper */}
        <div className="pt-12 px-4">

        </div>

        {/* Header */}
        <div className="text-center mb-8 px-4 pt-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg w-16 h-16" />
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-2xl shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-slate-900">
            Define Your{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Workflow
            </span>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Break down your process into clear steps. Click on any job to execute it instantly.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mt-6 opacity-80" />
        </div>

        {/* Main Layout */}
        <div className="flex-1 flex px-4 pb-8 gap-6 max-w-7xl mx-auto w-full">
          {/* Enhanced Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-sm" />
              <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
                <CardContent className="p-6 space-y-4">
                  <div className="text-center mb-6">
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
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-sm" />

              <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden min-h-[600px]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

                <CardContent className="p-8 md:p-12">
                  {selectedField ? (
                    <>
                      {/* Field Header */}
                      <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl shadow-lg">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-slate-800">{selectedField}</h2>
                            <p className="text-slate-600">Click any job to execute it</p>
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
                          className="w-full md:w-auto h-14 px-8 text-lg font-semibold rounded-xl shadow-lg
                                   bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 
                                   text-white border-0 transition-all duration-300
                                   hover:shadow-xl hover:scale-[1.02] group"
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <Save className="w-5 h-5" />
                            <span>{isSubmitting ? 'Saving...' : 'Save Workflow'}</span>
                            {!isSubmitting && (
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            )}
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(-4px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export { OnboardingStep3 };
