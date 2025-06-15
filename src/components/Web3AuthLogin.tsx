import React from 'react';
import { useWeb3Auth } from "@web3auth/modal/react";

const Web3AuthLogin: React.FC = () => {
  const { 
    provider, 
    login, 
    logout, 
    getUserInfo, 
    isLoading, 
    isConnected 
  } = useWeb3Auth();
  
  const [userInfo, setUserInfo] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      if (isConnected && provider) {
        try {
          const info = await getUserInfo();
          setUserInfo(info);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };
    
    fetchUserInfo();
  }, [isConnected, provider, getUserInfo]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserInfo(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Web3 Authentication</h2>
      
      {!isConnected ? (
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
          </svg>
          Connect with Web3Auth
        </button>
      ) : (
        <div className="space-y-4">
          {userInfo && (
            <div className="flex flex-col items-center">
              {userInfo.profileImage && (
                <img 
                  src={userInfo.profileImage} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full mb-2"
                />
              )}
              <h3 className="font-medium text-lg">{userInfo.name}</h3>
              <p className="text-gray-600 text-sm">{userInfo.email}</p>
              
              <div className="mt-3 p-3 bg-gray-50 rounded-md w-full">
                <p className="text-xs text-gray-500 mb-1">Connected Account</p>
                <p className="text-sm font-mono truncate">
                  {userInfo.typeOfLogin} • {userInfo.verifierId?.substring(0, 15)}...
                </p>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default Web3AuthLogin;
