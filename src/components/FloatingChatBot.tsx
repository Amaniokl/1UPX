import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, CheckCircle } from 'lucide-react';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(64);
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const detectNavbarHeight = () => {
      const navbar = document.querySelector('nav, .navbar, [role="navigation"], header');
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setNavbarHeight(rect.height);
      } else {
        setNavbarHeight(window.innerWidth < 768 ? 56 : 64);
      }
    };
    
    checkMobile();
    detectNavbarHeight();
    
    window.addEventListener('resize', () => {
      checkMobile();
      detectNavbarHeight();
    });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', detectNavbarHeight);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced function to format and parse structured responses
  const parseAndFormatResponse = (text) => {
    if (!text) return { type: 'text', content: '' };
    
    // Clean the text first - handle various quote patterns
    const cleanedText = text
      .replace(/^['"]|['"]$/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold** formatting
      .replace(/\*(.*?)\*/g, '$1')     // Remove *italic* formatting
      .replace(/''(.*?)''/g, '$1')     // Remove double single quotes
      .replace(/"(.*?)"/g, '$1')       // Remove double quotes
      .replace(/`(.*?)`/g, '$1')       // Remove backticks
      .trim();

    // Check if it's a bulleted list (starts with * or -)
    const bulletPattern = /^\s*[\*\-]\s+/;
    const lines = cleanedText.split('\n').filter(line => line.trim());
    
    // If most lines start with bullets, treat as a list
    const bulletLines = lines.filter(line => bulletPattern.test(line));
    if (bulletLines.length > 0 && bulletLines.length >= lines.length * 0.5) {
      const listItems = lines.map(line => {
        if (bulletPattern.test(line)) {
          return {
            type: 'bullet',
            text: line.replace(bulletPattern, '').trim()
          };
        }
        return {
          type: 'text',
          text: line.trim()
        };
      }).filter(item => item.text);

      return { type: 'list', content: listItems };
    }

    // Check for numbered lists
    const numberPattern = /^\s*\d+\.\s+/;
    const numberedLines = lines.filter(line => numberPattern.test(line));
    if (numberedLines.length > 0 && numberedLines.length >= lines.length * 0.5) {
      const listItems = lines.map(line => {
        if (numberPattern.test(line)) {
          return {
            type: 'numbered',
            text: line.replace(numberPattern, '').trim()
          };
        }
        return {
          type: 'text',
          text: line.trim()
        };
      }).filter(item => item.text);

      return { type: 'numbered-list', content: listItems };
    }

    // Default to formatted text
    return { type: 'text', content: cleanedText };
  };

  // Component to render formatted responses
  const FormattedResponse = ({ text }) => {
    const parsed = parseAndFormatResponse(text);
    
    if (parsed.type === 'list') {
      return (
        <div className="space-y-2">
          {parsed.content.map((item, index) => (
            <div key={index}>
              {item.type === 'bullet' ? (
                <div className="flex items-start space-x-2">
                  <CheckCircle className={`flex-shrink-0 mt-0.5 text-cyan-400 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  <span className="text-white leading-relaxed">{item.text}</span>
                </div>
              ) : (
                <div className="text-white/90 text-sm font-medium mb-1">{item.text}</div>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    if (parsed.type === 'numbered-list') {
      return (
        <div className="space-y-2">
          {parsed.content.map((item, index) => (
            <div key={index}>
              {item.type === 'numbered' ? (
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold ${isMobile ? 'w-5 h-5 text-xs' : 'w-6 h-6 text-sm'}`}>
                    {index + 1}
                  </div>
                  <span className="text-white leading-relaxed">{item.text}</span>
                </div>
              ) : (
                <div className="text-white/90 text-sm font-medium mb-1">{item.text}</div>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    // Default text formatting
    return (
      <div className="whitespace-pre-wrap text-white leading-relaxed">
        {parsed.content.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            {index < parsed.content.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>
    );
  };

  // Test the formatting with sample data
  const handleTestFormatting = () => {
    const sampleResponse = `* Automates repetitive tasks (research, drafting, analysis).
* Allows users to focus on high-value work.
* Creates a personalized AI assistant mirroring the user's work style.
* Improves efficiency and productivity.`;
    
    const testMessage = {
      id: messages.length + 1,
      text: sampleResponse,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, testMessage]);
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

  const getButtonClasses = () => {
    return `fixed z-50 transition-all duration-300 ${
      isMobile 
        ? 'bottom-6 right-4' 
        : 'bottom-8 right-8'
    }`;
  };

  const getChatWindowClasses = () => {
    if (isMobile) {
      return `fixed z-50 transition-all duration-300 ${
        isMinimized 
          ? 'bottom-0 left-0 right-0 h-16 top-auto' 
          : `left-0 right-0 bottom-0`
      }`;
    } else {
      return `fixed z-50 transition-all duration-300 ${
        isMinimized 
          ? 'bottom-8 right-8 w-80 h-16' 
          : 'bottom-8 right-8 w-96 h-[500px] max-h-[calc(100vh-4rem)]'
      }`;
    }
  };

  const getChatContentClasses = () => {
    if (isMobile && !isMinimized) {
      return `w-full flex flex-col`;
    }
    return '';
  };

  const getMobileHeight = () => {
    if (isMobile && !isMinimized) {
      const availableHeight = window.innerHeight - navbarHeight;
      return `${availableHeight}px`;
    }
    return 'auto';
  };

  const getMessagesClasses = () => {
    if (isMobile && !isMinimized) {
      return 'flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-slate-900/50';
    }
    return 'h-80 overflow-y-auto p-4 space-y-4 bg-slate-900/50';
  };

  const getMobileTopPosition = () => {
    if (isMobile && !isMinimized) {
      return `${navbarHeight}px`;
    }
    return 'auto';
  };

  return (
    <>
      {/* Test Button for Demo */}
      {!isOpen && (
        <button
          onClick={handleTestFormatting}
          className="fixed top-4 right-4 z-40 bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Test Formatting
        </button>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <div className={getButtonClasses()}>
          <button
            onClick={() => setIsOpen(true)}
            className={`group relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 animate-bounce ${
              isMobile ? 'p-3' : 'p-4'
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur"></div>
            <MessageCircle className={`relative z-10 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
            
            <div className={`absolute bg-red-500 rounded-full flex items-center justify-center ${
              isMobile ? '-top-1 -right-1 w-3 h-3' : '-top-1 -right-1 w-4 h-4'
            }`}>
              <div className={`bg-white rounded-full animate-pulse ${
                isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
              }`}></div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={getChatWindowClasses()}
          style={{
            top: isMobile && !isMinimized ? getMobileTopPosition() : 'auto',
            height: isMobile && !isMinimized ? getMobileHeight() : 'auto'
          }}
        >
          <div className={`bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 shadow-2xl overflow-hidden h-full ${
            isMobile && !isMinimized 
              ? 'rounded-none' 
              : isMobile && isMinimized
                ? 'rounded-t-2xl'
                : 'rounded-2xl'
          } ${getChatContentClasses()}`}>
            
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <div className={`bg-white rounded-full flex items-center justify-center ${
                    isMobile ? 'w-7 h-7' : 'w-8 h-8'
                  }`}>
                    <Bot className={`text-purple-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  </div>
                  <div className={`absolute bg-green-400 rounded-full border-2 border-white ${
                    isMobile ? '-bottom-0.5 -right-0.5 w-2.5 h-2.5' : '-bottom-1 -right-1 w-3 h-3'
                  }`}></div>
                </div>
                <div>
                  <h3 className={`text-white font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    1upX Assistant
                  </h3>
                  <p className={`text-white/80 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                {!isMobile && (
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded"
                >
                  <X className={isMobile ? 'w-5 h-5' : 'w-4 h-4'} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className={getMessagesClasses()}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-2 sm:space-x-3 ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div className={`flex-shrink-0 rounded-full flex items-center justify-center ${
                        isMobile ? 'w-6 h-6' : 'w-8 h-8'
                      } ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600' 
                          : 'bg-white'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className={`text-white ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                        ) : (
                          <Bot className={`text-purple-600 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                        )}
                      </div>
                      
                      <div className={`max-w-[85%] sm:max-w-xs ${
                        message.sender === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        <div className={`inline-block p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          <div className={`leading-relaxed ${isMobile ? 'text-xs' : 'text-sm'} ${
                            message.sender === 'user' ? 'text-left' : ''
                          }`}>
                            {message.sender === 'bot' ? (
                              <FormattedResponse text={message.text} />
                            ) : (
                              <p className="text-white text-left">{message.text}</p>
                            )}
                          </div>
                        </div>
                        <p className={`text-white/50 mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <div className={`flex-shrink-0 rounded-full bg-white flex items-center justify-center ${
                        isMobile ? 'w-6 h-6' : 'w-8 h-8'
                      }`}>
                        <Bot className={`text-purple-600 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      </div>
                      <div className={`bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-3`}>
                        <div className="flex space-x-1">
                          <div className={`bg-white/60 rounded-full animate-bounce ${
                            isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                          }`}></div>
                          <div className={`bg-white/60 rounded-full animate-bounce ${
                            isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                          }`} style={{ animationDelay: '0.1s' }}></div>
                          <div className={`bg-white/60 rounded-full animate-bounce ${
                            isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                          }`} style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 sm:p-4 border-t border-white/10 flex-shrink-0">
                  <div className="flex items-end space-x-2 sm:space-x-3">
                    <div className="flex-1 relative">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className={`w-full bg-white/10 border border-white/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/60 focus:outline-none focus:border-cyan-400 transition-colors resize-none text-left ${
                          isMobile ? 'text-sm' : 'text-base'
                        }`}
                        rows="1"
                        style={{
                          minHeight: isMobile ? '36px' : '44px',
                          maxHeight: isMobile ? '120px' : '150px',
                          textAlign: 'left',
                          direction: 'ltr'
                        }}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={inputMessage.trim() === ''}
                      className={`bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 ${
                        isMobile ? 'p-2.5' : 'p-3'
                      }`}
                    >
                      <Send className={isMobile ? 'w-4 h-4' : 'w-4 h-4'} />
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