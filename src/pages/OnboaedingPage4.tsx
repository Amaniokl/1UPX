import React, { useState, useEffect, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { mintNFTWithEthers, fetchUserNFTs, signUserForDecryption } from "../utils/nftUtils";
import { CONNECT_STATES } from '../providers/Web3ContextProvider';
import { Web3Context } from "../providers/Web3ContextProvider";
import { ethers } from "ethers";
import { 
  X, 
  Check, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  RefreshCw, 
  Copy, 
  Trash2, 
  Loader, 
  Play, 
  Info, 
  CheckCircle, 
  XCircle,
  Database,
  Zap,
  Bot,
  FileText,
  Workflow,
  Terminal,
  Upload,
  FolderOpen
} from 'lucide-react';

const AgentWorkflowManager = () => {
  // State for popup controls
  const [showAgentPopup, setShowAgentPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [showWorkflowPopup, setShowWorkflowPopup] = useState(false);
  
  // Main state
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentDetails, setAgentDetails] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [selectedNft, setSelectedNft] = useState('0');
  const [signature, setSignature] = useState({ data: null });
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [workflowResults, setWorkflowResults] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [userNFTs, setUserNFTs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [finalResult, setFinalResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  
  // Knowledge base state
  const [projectKnowledgeBase, setProjectKnowledgeBase] = useState('');
  const [agentFiles, setAgentFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Socket connection
  const [socket, setSocket] = useState(null);
  const web3Context = useContext(Web3Context);
  const { provider } = useWeb3Auth();
  const resultPopupRef = useRef(null);

  // Handle click outside of result popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (resultPopupRef.current && !resultPopupRef.current.contains(event.target)) {
        setShowResultPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resultPopupRef]);

  useEffect(() => {
    // Initialize socket connection
    const socketConnection = io("https://skynetuseragent-c0n1.stackos.io", {
      transports: ["websocket", "polling"],
      timeout: 60000,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      forceNew: true
    });

    setSocket(socketConnection);

    // Connection event listeners
    socketConnection.on('connect', () => {
      console.log('Socket connected:', socketConnection.id);
      setConnectionStatus('connected');
    });

    socketConnection.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setConnectionStatus('disconnected');
    });

    socketConnection.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnectionStatus('error');
    });

    // Updated event listeners based on actual server events
    socketConnection.on('status', (data) => {
      console.log('Status received:', data);
      
      if (data.status === 'starting') {
        setTotalSteps(data.workflow?.length || 0);
        setCurrentStep(0);
        setWorkflowResults([{ 
          type: 'starting', 
          data,
          timestamp: new Date().toISOString() 
        }]);
        setShowWorkflowPopup(true);
      } else if (data.status === 'processing') {
        setCurrentStep(data.itemID || 0);
        setWorkflowResults(prev => [...prev, { 
          type: 'processing', 
          data,
          timestamp: new Date().toISOString() 
        }]);
      } else if (data.status === 'done') {
        setWorkflowResults(prev => [...prev, { 
          type: 'done', 
          data,
          timestamp: new Date().toISOString() 
        }]);
      } else if (data.status === 'completed') {
        setExecuting(false);
        setFinalResult(data.result);
        setWorkflowResults(prev => [...prev, { 
          type: 'completed', 
          data,
          timestamp: new Date().toISOString() 
        }]);
        setShowResultPopup(true);
      } else if (data.status === 'error') {
        setExecuting(false);
        setWorkflowResults(prev => [...prev, { 
          type: 'error', 
          error: data.error || data.message,
          timestamp: new Date().toISOString() 
        }]);
      }
    });

    socketConnection.on('error', (error) => {
      console.error('Error received:', error);
      setExecuting(false);
      setWorkflowResults(prev => [...prev, { 
        type: 'error', 
        error: error.message || error,
        timestamp: new Date().toISOString() 
      }]);
    });

    // Debug: Listen for all events
    socketConnection.onAny((eventName, ...args) => {
      console.log('Socket event received:', eventName, args);
    });

    // Cleanup on unmount
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // Load user NFTs when wallet is connected
  useEffect(() => {
    const loadUserNFTs = async () => {
      if (web3Context.status === CONNECT_STATES.CONNECTED && provider && web3Context.address) {
        try {
          const nfts = await fetchUserNFTs(provider, web3Context.address);
          setUserNFTs(nfts);
          if (nfts.length > 0 && !selectedNft) {
            setSelectedNft(nfts[0]);
          }
        } catch (error) {
          console.error('Error fetching user NFTs:', error);
        }
      }
    };

    loadUserNFTs();
  }, [web3Context.status, web3Context.address, provider]);

  // Fetch agents list
  const fetchAgents = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await fetch(
        `https://skynetagent-c0n525.stackos.io/api/agents?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      
      if (data.success) {
        setAgents(data.data.agents);
        setPagination({
          page: page,
          limit: limit,
          total: data.data.pagination.total || 0,
          totalPages: data.data.pagination.totalPages || 1,
          hasNext: data.data.pagination.hasNext || false,
          hasPrev: data.data.pagination.hasPrev || false
        });
      } else {
        console.error('Failed to fetch agents:', data.message);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch agent details and workflow
  const fetchAgentDetails = async (agentId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://skynetagent-c0n525.stackos.io/api/agents/${agentId}`
      );
      const data = await response.json();
      
      if (data.success) {
        setAgentDetails(data.data);
        setSelectedAgent(agentId);
        setShowAgentPopup(false); // Close the popup after selection
      } else {
        console.error('Failed to fetch agent details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching agent details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Execute workflow
  const executeWorkflow = async () => {
    if (!socket || connectionStatus !== 'connected') {
      alert('Socket not connected. Please wait for connection or refresh the page.');
      return;
    }

    if (!agentDetails || !userPrompt.trim()) {
      alert('Please select an agent and enter a prompt');
      return;
    }

    if (web3Context.status !== CONNECT_STATES.CONNECTED) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setExecuting(true);
      setWorkflowResults([]);
      setFinalResult(null);
      setCurrentStep(0);
      setTotalSteps(0);
      
      const userAddress = web3Context.address;
      const UserNfts = await fetchUserNFTs(provider, userAddress);
      const UserAuth = await signUserForDecryption(provider, userAddress);

      if (!UserAuth || !UserAuth.data || !UserAuth.data.signature) {
        throw new Error('Failed to get user authentication signature');
      }

      const userAuthPayload = UserAuth.data;
      const nftToUse = selectedNft || (UserNfts.length > 0 ? UserNfts[0] : "0");
      
      const payload = {
        prompt: userPrompt.trim(),
        userAuthPayload: userAuthPayload,
        accountNFT: {
          collectionID: "0",
          nftID: nftToUse.toString(),
        },
        workflow: agentDetails.subnet_list,
        userAddress: userAddress,
        timestamp: Date.now(),
        // Include knowledge base if provided
        knowledgeBase: projectKnowledgeBase.trim() || undefined
      };

      console.log('Executing workflow with payload:', payload);
      
      setWorkflowResults([{
        type: 'info',
        data: 'Sending request to server...',
        timestamp: new Date().toISOString()
      }]);

      const timeoutId = setTimeout(() => {
        if (executing) {
          setExecuting(false);
          setWorkflowResults(prev => [...prev, { 
            type: 'error', 
            error: 'Workflow execution timeout (5 minutes)', 
            timestamp: new Date().toISOString() 
          }]);
        }
      }, 300000);

      socket.emit("process-request", payload);

      return () => {
        clearTimeout(timeoutId);
      };

    } catch (error) {
      console.error('Error executing workflow:', error);
      setExecuting(false);
      setWorkflowResults(prev => [...prev, { 
        type: 'error', 
        error: error.message, 
        timestamp: new Date().toISOString() 
      }]);
    }
  };

  // Upload to knowledge base
  const uploadToKnowledgeBase = async () => {
    if (!projectKnowledgeBase.trim()) {
      alert('Please enter knowledge base content to upload');
      return;
    }

    if (web3Context.status !== CONNECT_STATES.CONNECTED) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      
      const isAuthenticated = web3Context.status === CONNECT_STATES.CONNECTED;
      const userAddress = isAuthenticated && web3Context.address ? 
        web3Context.address : '';
      
      const UserNfts = await fetchUserNFTs(provider, userAddress);
      const UserAuth = await signUserForDecryption(provider, userAddress);
      const userAuthPayload = UserAuth.data;
      console.log("Log for ", UserNfts);
      
      const requestBody = {
        prompt: projectKnowledgeBase, // Using the knowledge base content as the prompt
        userAuthPayload: userAuthPayload,
        accountNFT: {
          collectionID: "0",
          nftID: UserNfts[0]
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

      const result = await response.json();
      
      if (response.ok) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 5000); // Hide after 5 seconds
      } else {
        throw new Error(result.message || 'Failed to upload knowledge base content');
      }
    } catch (error) {
      console.error('Error uploading to knowledge base:', error);
      alert(`Error uploading to knowledge base: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load agents on component mount
  useEffect(() => {
    fetchAgents();
  }, []);

  // Pagination handlers
  const handlePrevPage = () => {
    if (pagination.hasPrev) {
      fetchAgents(pagination.page - 1, pagination.limit);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNext) {
      fetchAgents(pagination.page + 1, pagination.limit);
    }
  };

  // Clear results
  const clearResults = () => {
    setWorkflowResults([]);
    setFinalResult(null);
    setCurrentStep(0);
    setTotalSteps(0);
    setShowResultPopup(false);
    setShowWorkflowPopup(false);
  };

  // Format article content
  const formatArticleContent = (content) => {
    if (!content) return '';
    
    // Split by double asterisks for headers
    const sections = content.split(/\*\*(.*?)\*\*/g);
    
    return sections.map((section, index) => {
      if (index % 2 === 1) {
        // This is a header
        return (
          <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3 border-b-2 border-blue-500 pb-2">
            {section}
          </h3>
        );
      } else {
        // This is regular content
        const paragraphs = section.split('\n\n').filter(p => p.trim());
        return paragraphs.map((paragraph, pIndex) => (
          <p key={`${index}-${pIndex}`} className="text-gray-700 mb-4 leading-relaxed">
            {paragraph.trim()}
          </p>
        ));
      }
    });
  };

  // Filter agents by search term
  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Knowledge base file handling
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).map(file => file.name);
    setAgentFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []).map(file => file.name);
    setAgentFiles(prev => [...prev, ...files]);
  };

  const removeFile = (indexToRemove) => {
    setAgentFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // Progress bar component
  const ProgressBar = () => {
    if (totalSteps === 0) return null;
    
    const progress = (currentStep / totalSteps) * 100;
    
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Workflow Progress
          </span>
          <span className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Step indicator component
  const StepIndicator = ({ steps, currentStep }) => {
    if (!steps || steps.length === 0) return null;
    
    return (
      <div className="flex flex-col space-y-4 mb-6">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              index < currentStep 
                ? 'bg-green-50 border border-green-200' 
                : index === currentStep 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0
              ${index < currentStep ? 'bg-green-500 text-white' : 
                index === currentStep ? 'bg-blue-500 text-white' : 
                'bg-gray-300 text-gray-600'}
            `}>
              {index < currentStep ? <Check size={18} /> : index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{step.subnetName}</div>
              <div className="text-xs text-gray-500 truncate">{step.description?.substring(0, 60) || 'No description'}...</div>
              <div className="text-xs mt-1">
                {index < currentStep ? (
                  <span className="text-green-600 flex items-center">
                    <CheckCircle size={12} className="mr-1" /> Completed
                  </span>
                ) : index === currentStep ? (
                  <span className="text-blue-600 flex items-center">
                    <Loader size={12} className="mr-1 animate-spin" /> Processing
                  </span>
                ) : (
                  <span className="text-gray-500 flex items-center">
                    <Clock size={12} className="mr-1" /> Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Agent Selection Popup
  const AgentSelectionPopup = () => {
    if (!showAgentPopup) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg shadow-md">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Select an AI Agent</h2>
            </div>
            <button 
              onClick={() => setShowAgentPopup(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search agents..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => fetchAgents(1, pagination.limit)}
                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span className="font-medium">Refresh</span>
              </button>
            </div>
          </div>
          
          {/* Agents Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <p className="text-gray-600">Loading agents...</p>
                </div>
              </div>
            ) : filteredAgents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No agents found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAgents.map((agent) => (
                  <div 
                    key={agent.id} 
                    onClick={() => fetchAgentDetails(agent.id)}
                    className={`
                      border-2 rounded-xl p-6 cursor-pointer transition-all duration-300
                      hover:shadow-lg hover:scale-[1.02] relative group
                      ${selectedAgent === agent.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300'
                      }
                    `}
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-blue-500 text-white p-1.5 rounded-full shadow-sm">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 pr-8">{agent.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">{agent.description}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {agent.type || 'Standard'}
                        </div>
                        <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {agent.subnet_list?.length || 0} steps
                        </div>
                      </div>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showing {filteredAgents.length} of {pagination.total} agents
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={!pagination.hasPrev}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="px-4 py-2 text-gray-600 font-medium">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button 
                  onClick={handleNextPage}
                  disabled={!pagination.hasNext}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Workflow Progress Popup
  const WorkflowProgressPopup = () => {
    if (!showWorkflowPopup) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg shadow-md">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Workflow Progress</h2>
            </div>
            <button 
              onClick={() => setShowWorkflowPopup(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Progress Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <ProgressBar />
            
            {agentDetails && (
              <StepIndicator steps={agentDetails.subnet_list} currentStep={currentStep} />
            )}
            
            {/* Workflow Log */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                Execution Log
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                {workflowResults.map((result, index) => (
                  <div key={index} className={`
                    border-l-4 pl-4 py-3 rounded-r-lg text-sm
                    ${result.type === 'error' ? 'border-red-500 bg-red-50' : 
                      result.type === 'completed' ? 'border-green-500 bg-green-50' : 
                      result.type === 'done' ? 'border-blue-500 bg-blue-50' :
                      result.type === 'processing' ? 'border-yellow-500 bg-yellow-50' :
                      result.type === 'starting' ? 'border-purple-500 bg-purple-50' :
                      'border-gray-500 bg-gray-50'
                    }
                  `}>
                    <div className="flex justify-between items-center mb-1">
                      <div className={`text-xs font-medium ${
                        result.type === 'error' ? 'text-red-700' : 
                        result.type === 'completed' ? 'text-green-700' : 
                        result.type === 'done' ? 'text-blue-700' :
                        result.type === 'processing' ? 'text-yellow-700' :
                        result.type === 'starting' ? 'text-purple-700' :
                        'text-gray-700'
                      }`}>
                        {result.type.toUpperCase()}
                        {result.data?.subnet && ` - ${result.data.subnet}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </div>
                      </div>
                    
                    <div className="text-xs text-gray-600">
                      {result.type === 'error' ? result.error : 
                       result.type === 'info' ? result.data :
                       result.data?.status || 'Processing...'}
                    </div>
                  </div>
                ))}
                
                {workflowResults.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No workflow data yet
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${executing ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {executing ? 'Executing workflow...' : 'Execution complete'}
                </span>
              </div>
              <button
                onClick={() => setShowWorkflowPopup(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Result Popup
  const ResultPopup = () => {
    if (!showResultPopup || !finalResult) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
               <div 
          ref={resultPopupRef}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Generated Result</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigator.clipboard.writeText(finalResult.result.message)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-blue-600"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowResultPopup(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Result Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="prose max-w-none bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
              {formatArticleContent(finalResult.result.message)}
            </div>
            
            {/* Metadata */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Result Metadata
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-xs">
                  <div className="text-blue-600 font-medium mb-1">Completion Time</div>
                  <div className="text-gray-700">
                    {new Date(finalResult.timestamp || Date.now()).toLocaleString()}
                  </div>
                </div>
                <div className="text-xs">
                  <div className="text-blue-600 font-medium mb-1">Agent</div>
                  <div className="text-gray-700">{agentDetails?.name || 'Unknown'}</div>
                </div>
                <div className="text-xs">
                  <div className="text-blue-600 font-medium mb-1">Prompt</div>
                  <div className="text-gray-700 line-clamp-2">{userPrompt}</div>
                </div>
                <div className="text-xs">
                  <div className="text-blue-600 font-medium mb-1">NFT ID</div>
                  <div className="text-gray-700">{selectedNft}</div>
                </div>
              </div>
            </div>
            
            {/* View Log Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  setShowResultPopup(false);
                  setShowWorkflowPopup(true);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2 text-sm"
              >
                <Terminal className="w-4 h-4" />
                <span>View Execution Log</span>
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  Generation complete
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={clearResults}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear</span>
                </button>
                <button
                  onClick={() => setShowResultPopup(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Knowledge Base Upload Component
  const KnowledgeBaseUpload = () => {
    return (
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg shadow-sm">
            <Upload className="w-3.5 h-3.5 text-white" />
          </div>
          <h4 className="font-medium text-slate-700 text-sm">Agent Knowledge Base</h4>
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
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }
            `}>
              <Upload className="w-4 h-4 text-white" />
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
                id="file-upload-agent-kb"
              />
              <button
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:border-cyan-400 hover:text-cyan-600 bg-white"
                onClick={() => document.getElementById('file-upload-agent-kb')?.click()}
              >
                Browse
              </button>
            </div>
          </div>
        </div>

        {/* File List */}
        {agentFiles.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Files ({agentFiles.length})</span>
            </div>
            <div className="max-h-20 overflow-y-auto space-y-1">
              {agentFiles.map((file, index) => (
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

  return (
    <div className="agent-workflow-manager p-6 max-w-7xl mx-auto mt-16"> {/* Added mt-16 for navbar spacing */}
      {/* Compact UI Component */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Agent Workflow</h1>
                <p className="text-blue-100">Execute complex AI tasks with blockchain authentication</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-400' : 
                  connectionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400'
                }`}></div>
                <span className="text-xs font-medium">
                  {connectionStatus === 'connected' ? 'Connected' : 
                   connectionStatus === 'error' ? 'Error' : 'Connecting...'}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  web3Context.status === CONNECT_STATES.CONNECTED ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <span className="text-xs font-medium">
                  {web3Context.status === CONNECT_STATES.CONNECTED ? 'Wallet Connected' : 'Wallet Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Selection */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">Selected Agent</label>
              <div 
                onClick={() => setShowAgentPopup(true)}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors group"
              >
                {agentDetails ? (
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{agentDetails.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{agentDetails.description}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">Select an AI agent</div>
                )}
                <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Search className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700">NFT ID</label>
              <select
                value={selectedNft}
                onChange={(e) => setSelectedNft(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={web3Context.status !== CONNECT_STATES.CONNECTED}
              >
                <option value="0">Default (0)</option>
                {userNFTs.map(nft => (
                  <option key={nft} value={nft}>NFT #{nft}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Knowledge Base Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Knowledge Base */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Project Knowledge Base</h3>
                </div>
                
                {/* Upload to Knowledge Base Button */}
                <button
                  onClick={uploadToKnowledgeBase}
                  disabled={loading || !projectKnowledgeBase.trim() || web3Context.status !== CONNECT_STATES.CONNECTED}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg 
                    hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed 
                    font-medium text-sm transition-all duration-200 flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload to KB</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="project-kb-input" className="text-sm font-semibold text-slate-700">
                  Knowledge Base Content
                </label>
                <div className="relative">
                  <textarea
                    id="project-kb-input"
                    value={projectKnowledgeBase}
                    onChange={(e) => setProjectKnowledgeBase(e.target.value)}
                    placeholder="Enter your project knowledge base content here. This will be used as context for the AI agent..."
                    className="min-h-[150px] w-full border border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20
                      rounded-xl resize-none pr-12 bg-white/80 backdrop-blur-sm p-3"
                  />
                  <div className="absolute bottom-3 right-3">
                    <Database className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
                
                {/* Character count */}
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>This content will be sent as context</span>
                  <span>{projectKnowledgeBase.length} characters</span>
                </div>
              </div>
              
              {/* Success notification */}
              {uploadSuccess && (
                <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-400 rounded-lg animate-fadeIn">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-sm text-green-800">
                      Knowledge base content uploaded successfully!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Agent Knowledge Base */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Agent Knowledge Base</h3>
              </div>

              <KnowledgeBaseUpload />
            </div>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="p-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">User Prompt</label>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Enter your prompt for the agent..."
            className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!agentDetails}
          />
          
          {/* Wallet Warning */}
          {web3Context.status !== CONNECT_STATES.CONNECTED && (
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">
                  Please connect your wallet to execute workflows
                </p>
              </div>
            </div>
          )}
          
          {/* Execute Button */}
          <div className="mt-6">
            <button
              onClick={executeWorkflow}
              disabled={executing || web3Context.status !== CONNECT_STATES.CONNECTED}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-all duration-200 flex items-center justify-center space-x-3"
            >
              {executing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Executing Workflow...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Execute Workflow</span>
                </>
              )}
            </button>
          </div>
          
          {/* Status Indicators */}
          {executing && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Processing step {currentStep} of {totalSteps}
              </div>
              <button
                onClick={() => setShowWorkflowPopup(true)}
                className="text-blue-600 text-sm hover:text-blue-800 transition-colors flex items-center space-x-1"
              >
                <Terminal className="w-4 h-4" />
                <span>View progress</span>
              </button>
            </div>
          )}
          
          {finalResult && !executing && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Result generated successfully</span>
              </div>
              <button
                onClick={() => setShowResultPopup(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                View Result
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Popups */}
      <AgentSelectionPopup />
      <WorkflowProgressPopup />
      <ResultPopup />
    </div>
  );
};

// Clock icon component since it wasn't imported
const Clock = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default AgentWorkflowManager;

