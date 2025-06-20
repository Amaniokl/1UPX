import { Web3AuthProvider as Web3AuthModalProvider, useWeb3Auth } from "@web3auth/modal-react-hooks";
import { web3AuthConfig } from "../config/web3AuthConfig";
import { ReactNode, createContext, useContext, useEffect } from "react";
import type { ChainType } from "../config/web3AuthConfig";
import { CHAIN_NAMESPACES, type IWeb3Auth } from "@web3auth/base";
import { useNavigate } from "react-router-dom";


interface ChainContextType {
    switchChain: (chainType: ChainType) => Promise<void>;
}

const ChainContext = createContext<ChainContextType>({
    switchChain: async () => { }
});

export const useChainContext = () => useContext(ChainContext);

function ChainProvider({ children }: { children: ReactNode }) {
    //provider is there
    //
    //
    const { provider, web3Auth } = useWeb3Auth();
    const router = useNavigate();

    useEffect(() => {
        const handleError = (error: any) => {
            if (error?.message?.includes('Session Expired') || error?.message?.includes('Invalid public key')) {
                console.log('Session expired, redirecting to login...');
                // router.push('/login');
            }
        };

        // Add error listener
        window.addEventListener('error', handleError);
        
        return () => {
            window.removeEventListener('error', handleError);
        };
    }, [router]);

    const switchChain = async (chainType: ChainType) => {
        if (!web3Auth || !provider) return;

        try {
            const chainConfig = web3AuthConfig.getChainConfig(chainType);
            const web3AuthInstance = web3Auth as IWeb3Auth;
            await web3AuthInstance.addChain({
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: chainConfig.chainId,
                rpcTarget: chainConfig.rpcTarget,
                displayName: chainConfig.displayName,
                blockExplorerUrl: chainConfig.blockExplorerUrl,
                ticker: chainConfig.ticker,
                tickerName: chainConfig.tickerName
            });
            await web3AuthInstance.switchChain({ chainId: chainConfig.chainId });
        } catch (error) {
            console.error("Error switching chain:", error);
            if (error instanceof Error && 
                (error.message.includes('Session Expired') || error.message.includes('Invalid public key'))) {
                // router.push('/login');
            }
        }
    };

    return (
        <ChainContext.Provider value={{ switchChain }}>
            {children}
        </ChainContext.Provider>
    );
}

export function Web3AuthProvider({ children }: { children: ReactNode }) {
    const router = useNavigate();

    useEffect(() => {
        const handleInitError = (error: any) => {
            if (error?.message?.includes('Session Expired') || error?.message?.includes('Invalid public key')) {
                console.log('Session expired during initialization, redirecting to login...');
                // router.push('/login');
            }
        };

        // Add error listener for initialization errors
        window.addEventListener('error', handleInitError);
        
        return () => {
            window.removeEventListener('error', handleInitError);
        };
    }, [router]);

    console.log("chain config", web3AuthConfig);
    return (
        <Web3AuthModalProvider config={web3AuthConfig}>
            <ChainProvider>
                {children}
            </ChainProvider>
        </Web3AuthModalProvider>
    );
} 