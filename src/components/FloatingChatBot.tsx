import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to format the response text
  const formatResponseText = (text) => {
    if (!text) return '';
    
    return text
      // Remove extra quotes at the beginning and end
      .replace(/^['"]|['"]$/g, '')
      // Replace \n with actual line breaks
      .replace(/\\n/g, '\n')
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      // Remove extra whitespace around line breaks
      .replace(/\s*\n\s*/g, '\n')
      // Trim leading and trailing whitespace
      .trim();
  };

  // Component to render formatted text with line breaks
  const FormattedText = ({ text }) => {
    const formattedText = formatResponseText(text);
    
    return (
      <div className="whitespace-pre-wrap">
        {formattedText.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            {index < formattedText.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>
    );
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('https://gemii.onrender.com/ask-gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: currentMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botResponse = {
        id: messages.length + 2,
        text: data.response || data.message || data.text || 'Sorry, I received an empty response.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      
      const errorResponse = {
        id: messages.length + 2,
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later or contact our support team.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-40 right-8 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 animate-bounce"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
            <MessageCircle className="w-6 h-6 relative z-10" />
            
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-40 right-8 z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
        }`}>
          <div className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">1upX Assistant</h3>
                  <p className="text-white/80 text-xs">Online • Ready to help</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600' 
                          : 'bg-white'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      
                      <div className={`max-w-xs ${
                        message.sender === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        <div className={`inline-block p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          <div className="text-sm leading-relaxed">
                            {message.sender === 'bot' ? (
                              <FormattedText text={message.text} />
                            ) : (
                              <p>{message.text}</p>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-white/50 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <Bot className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/60 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                        rows="1"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={inputMessage.trim() === ''}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;