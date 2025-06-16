import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useOnboarding } from '../components/context/OnboardingContext';
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
  Plus,
  Workflow
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

// Selected Job Info Component
const SelectedJobInfo = ({ job, field }: { job: string; field: string }) => {
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl shadow-sm">
      <div className="flex items-start space-x-3">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg shadow-md">
          <Workflow className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-slate-800">Selected Job</h4>
            <div className="bg-cyan-100 text-cyan-700 text-xs px-2 py-0.5 rounded-full">
              From {field}
            </div>
          </div>
          <p className="text-sm text-slate-700 mt-1 font-medium">
            "{job}"
          </p>
          <div className="flex items-center mt-2 text-xs text-cyan-600">
            <span>Ready to execute</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Full Width Prompt Interface Component
const PromptInterface = ({ initialPrompt, selectedJob, selectedJobField }: { 
  initialPrompt: string;
  selectedJob?: string;
  selectedJobField?: string;
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Hardcoded request body
      const requestBody = {
        prompt: prompt,
        userAuthPayload: {
          userAddress: "0x38524cd7439C9Ba81D252D0394Df16e810ef2369",
          signature: "0x79bea4fbc1444f1d88237e82b76dc6ba83a3dd841402516be98cea2b671fee7a5384154a36a5b2815b80344426d7f734945e9b85907d2a53635fc2adefae57fe1b",
          message: "1750010306782"
        },
        accountNFT: {
          collectionID: "0",
          nftID: "509"
        }
      };
      
      // Send request to API
      const response = await fetch("https://knowledgebase-c0n499.stackos.io/natural-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(response)
      setResult(data.response || "Request completed successfully");
    } catch (error) {
      console.error("Error processing request:", error);
      setResult(`Error: ${error instanceof Error ? error.message : "Failed to process request"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Prompt Input */}
      <div className="lg:col-span-1 space-y-4">
        <div className="space-y-3">
          {selectedJob && selectedJobField && (
            <SelectedJobInfo job={selectedJob} field={selectedJobField} />
          )}
          
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
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{result}</p>
              
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
  const navigate = useNavigate();
  const { data: contextData, setData } = useOnboarding();
  const [selectedAgentType, setSelectedAgentType] = useState('type2');
  const [projectFiles, setProjectFiles] = useState<string[]>([]);
  const [agentFiles, setAgentFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate initial prompt based on selected job from previous step
  const initialPrompt = contextData.selectedJob 
    ? `Execute job: ${contextData.selectedJob}` 
    : "Create a 10 page fundraising deck";

  const handleComplete = () => {
    setIsSubmitting(true);
    
    // Save data to context
    setData({
      agentType: selectedAgentType,
      projectFiles: projectFiles,
      agentFiles: agentFiles,
      setupCompleted: true
    });
    
    // Navigate to dashboard or completion page
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
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
          { icon: Bot, color: "text-cyan-600", bg: "bg-cyan-100/90", border: "border-cyan-300/70", top: "top-28", left: "left-12", delay: "0s" },
          { icon: Rocket, color: "text-purple-600", bg: "bg-purple-100/90", border: "border-purple-300/70", top: "top-40", right: "right-16", delay: "2s" },
          { icon: Brain, color: "text-emerald-600", bg: "bg-emerald-100/90", border: "border-emerald-300/70", bottom: "bottom-40", left: "left-16", delay: "4s" },
          { icon: Zap, color: "text-blue-600", bg: "bg-blue-100/90", border: "border-blue-300/70", bottom: "bottom-28", right: "right-12", delay: "1s" }
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
              Test Your{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Agent
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Configure your AI agent and upload knowledge bases to enhance its capabilities. Test it with sample tasks.
            </p>
            
            {/* Divider */}
            <div className="flex items-center justify-center space-x-3 mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-cyan-500 rounded-full" />
              <div className="w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                
                <Card className="relative bg-white/85 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
                  {/* Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                  
                  <CardContent className="p-6 md:p-8 space-y-8">
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
                      
                      <PromptInterface 
                        initialPrompt={initialPrompt}
                        selectedJob={contextData.selectedJob}
                        selectedJobField={contextData.selectedJobField}
                      />
                    </div>

                    {/* Final Action */}
                    <div className="pt-8 border-t border-slate-200/60 text-center">
                    <Button
                        onClick={handleComplete}
                        disabled={isSubmitting}
                        className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg
                                 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 
                                 text-white border-0 transition-all duration-300
                                 hover:shadow-xl hover:scale-[1.02] group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="flex items-center justify-center space-x-2 relative z-10">
                          <Rocket className="w-5 h-5" />
                          <span>{isSubmitting ? 'Completing...' : 'Complete Setup'}</span>
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

