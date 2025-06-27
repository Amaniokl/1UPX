// Update the AgentSelectionPopup component
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Bot, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  AlertCircle,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { WorkflowVisualization } from './AgentFlow';

interface Agent {
  id: string;
  name: string;
  description: string;
  subnet_list?: any[];
  user_address?: string;
  created_at?: string;
  updated_at?: string;
  is_deployed?: boolean;
}

interface AgentSelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgent: Agent | null;
  onSelect: (agent: Agent) => void;
}

export function AgentSelectionPopup({ isOpen, onClose, selectedAgent, onSelect }: AgentSelectionPopupProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewingAgent, setViewingAgent] = useState<Agent | null>(null);
  const [loadingWorkflow, setLoadingWorkflow] = useState(false);
  const itemsPerPage = 6;

  const fetchAgents = async (page = 1, search = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...(search && { search })
      });

      const response = await fetch(`https://skynetagent-c0n525.stackos.io/api/agents?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }

      const data = await response.json();
      
      if (data.success) {
        setAgents(data.data || []);
        setTotalPages(Math.ceil((data.total || data.data?.length || 0) / itemsPerPage));
      } else {
        throw new Error(data.message || 'Failed to fetch agents');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgentWorkflow = async (agentId: string) => {
    setLoadingWorkflow(true);
    try {
      const response = await fetch(`https://skynetagent-c0n525.stackos.io/api/agents/${agentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch agent workflow');
      }

      const data = await response.json();
      
      if (data.success) {
        setViewingAgent(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch agent workflow');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workflow');
    } finally {
      setLoadingWorkflow(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAgents(1, searchTerm);
      setCurrentPage(1);
    }
  }, [isOpen, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchAgents(page, searchTerm);
  };

  const handleViewWorkflow = (agent: Agent) => {
    fetchAgentWorkflow(agent.id);
  };

  const handleSelectAgent = (agent: Agent) => {
    onSelect(agent);
    onClose();
    setViewingAgent(null);
  };

  const handleClose = () => {
    onClose();
    setViewingAgent(null);
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center space-x-3">
            {viewingAgent && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewingAgent(null)}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <Bot className="w-6 h-6 text-blue-500" />
            <span>
              {viewingAgent ? `${viewingAgent.name} - Workflow` : 'Select AI Agent'}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {viewingAgent ? (
            // Workflow View
            <div className="h-full overflow-y-auto pr-2">
              <div className="space-y-6">
                {/* Agent Info Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{viewingAgent.name}</h3>
                      <p className="text-slate-600 mb-4">{viewingAgent.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Steps: {viewingAgent.subnet_list?.length || 0}</span>
                        <span>•</span>
                        <span>Status: {viewingAgent.is_deployed ? 'Deployed' : 'Draft'}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSelectAgent(viewingAgent)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                      Select This Agent
                    </Button>
                  </div>
                </div>

                {/* Workflow Visualization */}
                <WorkflowVisualization 
                  workflow={viewingAgent} 
                  isLoading={loadingWorkflow}
                />
              </div>
            </div>
          ) : (
            // Agent List View
            <div className="h-full flex flex-col">
              {/* Search */}
              <div className="flex-shrink-0 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                    <p className="text-slate-600 mb-4">{error}</p>
                    <Button onClick={() => fetchAgents(currentPage, searchTerm)} variant="outline">
                      Try Again
                    </Button>
                  </div>
                ) : agents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Bot className="w-12 h-12 text-slate-400 mb-4" />
                    <p className="text-slate-600">No agents found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                    {agents.map((agent) => (
                      <Card 
                        key={agent.id} 
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                          selectedAgent?.id === agent.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-800 line-clamp-1">
                                  {agent.name}
                                </h3>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {agent.subnet_list?.length || 0} steps
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                            {agent.description}
                          </p>
                          
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewWorkflow(agent)}
                              className="flex-1"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Workflow
                            </Button>
                            <Button
                              onClick={() => handleSelectAgent(agent)}
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                            >
                              Select
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination */}
              {!loading && !error && totalPages > 1 && (
                <div className="flex-shrink-0 flex items-center justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-slate-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
