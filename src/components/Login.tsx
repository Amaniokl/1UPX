// src/components/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Context, CONNECT_STATES } from '../providers/Web3ContextProvider';
import { useContext } from 'react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const web3Context = useContext(Web3Context);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await web3Context.login();
      
      // If we successfully connected, redirect to onboarding
      if (web3Context.status === CONNECT_STATES.CONNECTED) {
        navigate('/onboarding1');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        {web3Context.status === CONNECT_STATES.ERROR && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-md">
            {web3Context.message || 'An error occurred during login'}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isLoading || web3Context.status === CONNECT_STATES.CONNECTING}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${(isLoading || web3Context.status === CONNECT_STATES.CONNECTING) ? 'opacity-50 cursor-not-allowed' : ''}`}
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

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={handleLogin} 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
