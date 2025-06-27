import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { mintNFTWithEthers, fetchUserNFTs, signUserForDecryption} from "../utils/nftUtils";
import { CONNECT_STATES } from '../providers/Web3ContextProvider';
import { Web3Context } from "../providers/Web3ContextProvider";
import { ethers } from "ethers";

const AgentWorkflowManager = () => {
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
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  // Socket connection
  const [socket, setSocket] = useState(null);
  const web3Context = useContext(Web3Context);
  const { provider } = useWeb3Auth();

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
        setPagination(data.data.pagination);
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
        timestamp: Date.now()
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
      socket.timeoutId = timeoutId;

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
    return (
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
              ${index < currentStep ? 'bg-green-500 text-white' : 
                index === currentStep ? 'bg-blue-500 text-white' : 
                'bg-gray-300 text-gray-600'}
            `}>
              {index < currentStep ? '✓' : index + 1}
            </div>
            <div className="ml-2 text-sm">
              <div className="font-medium">{step.subnetName}</div>
              <div className="text-gray-500 text-xs">
                {index < currentStep ? 'Completed' : 
                 index === currentStep ? 'Processing' : 'Pending'}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`
                flex-1 h-1 mx-4
                ${index < currentStep ? 'bg-green-500' : 'bg-gray-300'}
              `}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="agent-workflow-manager p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Agent Workflow Manager</h1>
            <p className="text-gray-600">Execute complex AI workflows with blockchain authentication</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' : 
                connectionStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm text-gray-600 font-medium">
                Socket: {connectionStatus}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                web3Context.status === CONNECT_STATES.CONNECTED ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600 font-medium">
                Wallet: {web3Context.status === CONNECT_STATES.CONNECTED ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wallet Connection Warning */}
      {web3Context.status !== CONNECT_STATES.CONNECTED && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <div className="flex items-center">
            <div className="text-yellow-600 mr-3">⚠️</div>
            <p className="text-yellow-800 font-medium">
              Please connect your wallet to execute workflows
            </p>
          </div>
        </div>
      )}

      {/* Agents List Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Available AI Agents</h2>
          <button 
            onClick={() => fetchAgents(1, pagination.limit)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedAgent === agent.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => fetchAgentDetails(agent.id)}
            >
              <h3 className="font-semibold text-lg mb-3 text-gray-800">{agent.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{agent.description}</p>
              {selectedAgent === agent.id && (
                <div className="mt-3 text-blue-600 text-sm font-medium">✓ Selected</div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-sm text-gray-600">
            Showing {agents.length} of {pagination.total} agents
          </span>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button 
              onClick={handleNextPage}
              disabled={!pagination.hasNext}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Agent Details Section */}
      {agentDetails && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Selected Agent: <span className="text-blue-600">{agentDetails.name}</span>
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{agentDetails.description}</p>
          
          {/* Workflow Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Workflow Steps ({agentDetails.subnet_list.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentDetails.subnet_list.map((step, index) => (
                <div key={step.itemID} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-800">{step.subnetName}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Execution Section */}
      {agentDetails && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Execute Workflow</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">User Prompt</label>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Enter your prompt for the agent..."
                className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">
                NFT ID {userNFTs.length > 0 && `(Available: ${userNFTs.join(', ')})`}
              </label>
              <select
                value={selectedNft}
                onChange={(e) => setSelectedNft(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="0">Default (0)</option>
                {userNFTs.map(nft => (
                  <option key={nft} value={nft}>NFT #{nft}</option>
                ))}
              </select>
            </div>

            <button
              onClick={executeWorkflow}
              disabled={executing || !userPrompt.trim() || connectionStatus !== 'connected' || web3Context.status !== CONNECT_STATES.CONNECTED}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-all duration-200"
            >
              {executing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Executing Workflow...
                </div>
              ) : 'Execute Workflow'}
            </button>
          </div>
        </div>
      )}

      {/* Workflow Progress Section */}
      {executing && agentDetails && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Workflow Progress</h2>
          <ProgressBar />
          <StepIndicator steps={agentDetails.subnet_list} currentStep={currentStep} />
        </div>
      )}

      {/* Final Result Section */}
      {finalResult && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Generated Article</h2>
            <div className="flex space-x-3">
              <button
                onClick={() => navigator.clipboard.writeText(finalResult.result.message)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Copy Article
              </button>
              <button
                onClick={clearResults}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear Results
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="prose max-w-none">
              {formatArticleContent(finalResult.result.message)}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Results Section */}
      {workflowResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Detailed Workflow Log</h2>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear Log
            </button>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {workflowResults.map((result, index) => (
              <div key={index} className={`border-l-4 pl-6 py-4 rounded-r-lg ${
                result.type === 'error' ? 'border-red-500 bg-red-50' : 
                result.type === 'completed' ? 'border-green-500 bg-green-50' : 
                result.type === 'done' ? 'border-blue-500 bg-blue-50' :
                result.type === 'processing' ? 'border-yellow-500 bg-yellow-50' :
                result.type === 'starting' ? 'border-purple-500 bg-purple-50' :
                'border-gray-500 bg-gray-50'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <div className={`text-sm font-medium ${
                    result.type === 'error' ? 'text-red-700' : 
                    result.type === 'completed' ? 'text-green-700' : 
                    result.type === 'done' ? 'text-blue-700' :
                    result.type === 'processing' ? 'text-yellow-700' :
                    result.type === 'starting' ? 'text-purple-700' :
                    'text-gray-700'
                  }`}>
                    {result.type.toUpperCase()} - Step {index + 1}
                    {result.data?.subnet && ` (${result.data.subnet})`}
                    {result.data?.progress && ` - ${result.data.progress}%`}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                
                {result.type === 'done' && result.data?.response?.data?.results && (
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-800 mb-2">Search Results:</h4>
                    <div className="space-y-2">
                      {result.data.response.data.results.slice(0, 3).map((searchResult, idx) => (
                        <div key={idx} className="bg-white p-3 rounded border">
                          <a href={searchResult.url} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline font-medium text-sm">
                            {searchResult.title}
                          </a>
                          <p className="text-gray-600 text-xs mt-1">
                            {searchResult.content.substring(0, 150)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <details className="cursor-pointer">
                  <summary className="text-sm text-gray-600 hover:text-gray-800">
                    View raw data
                  </summary>
                  <pre className="text-xs bg-white p-3 rounded mt-2 overflow-x-auto whitespace-pre-wrap border">
                    {typeof (result.error || result.data) === 'string' 
                      ? (result.error || result.data)
                      : JSON.stringify(result.error || result.data, null, 2)
                    }
                  </pre>
                </details>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentWorkflowManager;
