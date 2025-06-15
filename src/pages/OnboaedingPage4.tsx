import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import OnboardingStepper from '../components/OnboardingStepper';
import { 
  Sparkles, 
  ArrowRight, 
  Upload,
  Play,
  Bot,
  FileText,
  Zap,
  Brain,
  Target,
  Rocket,
  Settings,
  ChevronDown,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  FolderOpen,
  Database,
  X,
  Plus
} from "lucide-react";

// Agent Type Selector Component
const AgentTypeSelector = ({ selectedType, onSelect }: { 
  selectedType: string; 
  onSelect: (type: string) => void; 
}) => {
  const agentTypes = [
    { 
      id: 'type1', 
      name: 'Creative Assistant', 
      description: 'Best for content creation and design tasks',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50/80 to-pink-50/80'
    },
    { 
      id: 'type2', 
      name: 'Business Analyst', 
      description: 'Optimized for business and analytical tasks',
      icon: Target,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50/80 to-blue-50/80'
    },
    { 
      id: 'type3', 
      name: 'Technical Expert', 
      description: 'Specialized in technical and development work',
      icon: Settings,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50/80 to-teal-50/80'
    }
  ];

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-slate-700">Select Agent Type</Label>
      <div className="grid gap-3">
        {agentTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${isSelected 
                  ? `border-transparent bg-gradient-to-br ${type.bgGradient} shadow-lg scale-[1.02]` 
                  : 'border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white/80 hover:scale-[1.01]'
                }
                backdrop-blur-sm group
              `}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className={`w-5 h-5 bg-gradient-to-r ${type.gradient} rounded-full flex items-center justify-center`}>
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className={`
                  p-2 rounded-lg transition-all duration-300
                  ${isSelected 
                    ? `bg-gradient-to-r ${type.gradient} shadow-lg` 
                    : 'bg-slate-100 group-hover:bg-slate-200'
                  }
                `}>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-semibold ${isSelected ? 'text-slate-800' : 'text-slate-700'}`}>
                    {type.name}
                  </h4>
                  <p className={`text-sm ${isSelected ? 'text-slate-600' : 'text-slate-500'}`}>
                    {type.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Compact Knowledge Base Upload Component
const CompactKnowledgeUpload = ({ 
  title, 
  icon: Icon, 
  gradient, 
  uploadedFiles,
  setUploadedFiles
}: {
  title: string;
  icon: React.ComponentType<any>;
  gradient: string;
  uploadedFiles: string[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).map(file => file.name);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).map(file => file.name);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <div className={`bg-gradient-to-r ${gradient} p-1.5 rounded-lg shadow-sm`}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <h4 className="font-medium text-slate-700 text-sm">{title}</h4>
      </div>
      
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-cyan-400 bg-cyan-50/30' 
            : 'border-slate-200 bg-slate-50/30 hover:border-slate-300 hover:bg-slate-50/50'
          }
        `}
      >
        <div className="space-y-2">
          <div className={`
            w-8 h-8 mx-auto rounded-lg flex items-center justify-center transition-all duration-300
            ${isDragOver 
              ? 'bg-gradient-to-r from-cyan-400 to-blue-400 scale-105' 
              : `bg-gradient-to-r ${gradient}`
            }
          `}>
            <Plus className="w-4 h-4 text-white" />
          </div>
          
          <div>
            <p className="text-xs text-slate-500 mb-2">
              Drop files or click
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id={`file-upload-${title.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <Button 
              variant="outline" 
              size="sm"
              className="h-7 px-3 text-xs border-slate-200 hover:border-cyan-400 hover:text-cyan-600"
              onClick={() => document.getElementById(`file-upload-${title.replace(/\s+/g, '-').toLowerCase()}`)?.click()}
            >
              Browse
            </Button>
          </div>
        </div>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Files ({uploadedFiles.length})</span>
          </div>
          <div className="max-h-20 overflow-y-auto space-y-1">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-1.5 bg-white/60 rounded border border-slate-100">
                <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                  <FileText className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="text-xs text-slate-600 truncate">{file}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-1 p-0.5 hover:bg-red-50 rounded transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-3 h-3 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Full Width Prompt Interface Component
const PromptInterface = () => {
  const [prompt, setPrompt] = useState("Create a 10 page fundraising deck");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setResult("Generated a comprehensive 10-page fundraising deck with executive summary, market analysis, business model, financial projections, and team overview. The deck includes compelling visuals and data-driven insights tailored to your business context.");
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Prompt Input */}
      <div className="lg:col-span-1 space-y-4">
        <div className="space-y-3">
          <Label htmlFor="prompt" className="text-sm font-semibold text-slate-700">
            Your Prompt
          </Label>
          <div className="relative">
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              className="min-h-[140px] border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 
                       rounded-xl resize-none pr-12 bg-white/80 backdrop-blur-sm"
            />
            <div className="absolute bottom-3 right-3">
              <Zap className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isProcessing}
          className={`
            w-full h-12 rounded-xl font-semibold transition-all duration-300
            ${prompt.trim() && !isProcessing
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }
            group
          `}
        >
          <span className="flex items-center justify-center space-x-2">
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Generate</span>
              </>
            )}
          </span>
        </Button>
      </div>

      {/* Right Column - Result Display */}
      <div className="lg:col-span-2 space-y-3">
        <Label className="text-sm font-semibold text-slate-700">Result</Label>
        <div className={`
          min-h-[240px] p-6 rounded-xl border-2 transition-all duration-300
          ${result 
            ? 'border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-teal-50/80' 
            : 'border-slate-200 bg-slate-50/50'
          }
          backdrop-blur-sm
        `}>
          {isProcessing ? (
            <div className="flex items-center justify-center h-48">
              <div className="text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto" />
                <p className="text-slate-600">Generating your content...</p>
                <div className="w-32 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-emerald-800">Generated Successfully</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{result}</p>
              
              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-emerald-200/60">
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <FileText className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48">
              <div className="text-center space-y-4">
                <Bot className="w-12 h-12 text-slate-400 mx-auto" />
                <div>
                  <p className="text-slate-500 mb-2">Your generated content will appear here</p>
                  <p className="text-xs text-slate-400">Enter a prompt and click Generate to get started</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function OnboardingStep4() {
  const [selectedAgentType, setSelectedAgentType] = useState('type2');
  const [projectFiles, setProjectFiles] = useState<string[]>([]);
  const [agentFiles, setAgentFiles] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-300/15 to-teal-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[
          { icon: Bot, color: "text-cyan-600", bg: "bg-cyan-100/80", border: "border-cyan-200/60", top: "top-24", left: "left-16", delay: "0s" },
          { icon: Rocket, color: "text-purple-600", bg: "bg-purple-100/80", border: "border-purple-200/60", top: "top-40", right: "right-20", delay: "2s" },
          { icon: Brain, color: "text-emerald-600", bg: "bg-emerald-100/80", border: "border-emerald-200/60", bottom: "bottom-40", left: "left-20", delay: "4s" },
          { icon: Zap, color: "text-blue-600", bg: "bg-blue-100/80", border: "border-blue-200/60", bottom: "bottom-24", right: "right-16", delay: "1s" }
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
            Test Your{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Agent
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Configure your AI agent and upload knowledge bases to enhance its capabilities. Test it with sample tasks.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mt-6 opacity-80" />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-sm" />
              
              <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                
                <CardContent className="p-8 md:p-12 space-y-8">
                  {/* Top Row - Agent Configuration and Knowledge Bases */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Agent Configuration */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg shadow-lg">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">Agent Configuration</h3>
                      </div>
                      <AgentTypeSelector 
                        selectedType={selectedAgentType}
                        onSelect={setSelectedAgentType}
                      />
                    </div>

                    {/* Right Column - Knowledge Bases */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg shadow-lg">
                          <Upload className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">Knowledge Bases</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-5">
                        <CompactKnowledgeUpload
                          title="Project KB"
                          icon={FolderOpen}
                          gradient="from-blue-500 to-cyan-500"
                          uploadedFiles={projectFiles}
                          setUploadedFiles={setProjectFiles}
                        />
                        
                        <CompactKnowledgeUpload
                          title="Agent KB"
                          icon={Database}
                          gradient="from-purple-500 to-pink-500"
                          uploadedFiles={agentFiles}
                          setUploadedFiles={setAgentFiles}
                        />
                      </div>
                      
                      {/* Summary */}
                      {(projectFiles.length > 0 || agentFiles.length > 0) && (
                        <div className="mt-3 p-3 bg-gradient-to-r from-emerald-50/60 to-teal-50/60 rounded-lg border border-emerald-200/40">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-emerald-700 font-medium">
                              Total: {projectFiles.length + agentFiles.length} files
                            </span>
                            <div className="flex space-x-3 text-emerald-600">
                              <span>Project: {projectFiles.length}</span>
                              <span>Agent: {agentFiles.length}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Full Width AI Interaction Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">AI Interaction</h3>
                    </div>
                    
                    <PromptInterface />
                  </div>

                  {/* Final Action */}
                  <div className="pt-8 border-t border-slate-200/60 text-center">
                    <Button
                      className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg
                               bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 
                               text-white border-0 transition-all duration-300
                               hover:shadow-xl hover:scale-[1.02] group"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <Rocket className="w-5 h-5" />
                        <span>Complete Setup</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
