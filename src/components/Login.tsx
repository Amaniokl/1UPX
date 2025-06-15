// src/components/Login.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Context, CONNECT_STATES } from '../providers/Web3ContextProvider';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const web3Context = useContext(Web3Context);

  // This effect will automatically redirect when authentication state changes
  useEffect(() => {
    if (web3Context.status === CONNECT_STATES.CONNECTED) {
      navigate('/onboarding1');
    }
  }, [web3Context.status, navigate]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await web3Context.login();
      // No need to navigate here, the useEffect will handle it
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="w-full max-w-md p-8 space-y-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl shadow-2xl border border-slate-700/30">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome</h1>
          <p className="mt-2 text-slate-400">Sign in to continue</p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isLoading || web3Context.status === CONNECT_STATES.CONNECTING}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300
            ${(isLoading || web3Context.status === CONNECT_STATES.CONNECTING) ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading || web3Context.status === CONNECT_STATES.CONNECTING ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : (
            'Sign in with Web3Auth'
          )}
        </button>

        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          
        </div> */}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Animated Background Orbs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-3xl animate-pulse" style={{animationDuration: '8s'}} />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 blur-3xl animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}} />
        </div>
      </div>
    </div>
  );
};

export default Login;
