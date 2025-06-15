import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

// Arbitrum USDC contract address
const ARBITRUM_USDC_ADDRESS = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

interface OnRampConfig {
    address: string;
    amount?: number;
    network?: string;
}

// Initialize OnRamp widget in hosted mode
export const initializeOnRamp = async (config: OnRampConfig) => {
    try {
        // OnRamp widget configuration
        const onrampConfig = {
            appId: process.env.NEXT_PUBLIC_ONRAMP_APP_ID, // Your OnRamp app ID
            walletAddress: config.address,
            coinCode: "USDC",
            network: "arbitrum",
            fiatAmount: config.amount || 100,
            fiatCurrency: "USD",
            paymentMethod: "all", // Allow all payment methods
            redirectURL: window.location.origin + "/settings/add-funds",
        };

        // Create OnRamp widget URL
        const queryParams = new URLSearchParams({
            appId: onrampConfig.appId || "",
            walletAddress: onrampConfig.walletAddress,
            coinCode: onrampConfig.coinCode,
            network: onrampConfig.network,
            fiatAmount: onrampConfig.fiatAmount.toString(),
            fiatCurrency: onrampConfig.fiatCurrency,
            paymentMethod: onrampConfig.paymentMethod,
            redirectURL: onrampConfig.redirectURL,
        });

        // Open OnRamp widget in a new window
        const width = 500;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            `https://onramp.money/hosted/${queryParams.toString()}`,
            "OnRamp",
            `width=${width},height=${height},left=${left},top=${top}`
        );

        return true;
    } catch (error) {
        console.error("OnRamp initialization error:", error);
        throw error;
    }
};

// Function to check if USDC is already in the wallet
export const checkUSDCBalance = async (web3Auth: Web3Auth, address: string): Promise<string> => {
    try {
        if (!web3Auth.provider) {
            throw new Error("Provider not initialized");
        }

        const response = await web3Auth.provider.request({
            method: "eth_call",
            params: [{
                to: ARBITRUM_USDC_ADDRESS,
                data: `0x70a08231000000000000000000000000${address.slice(2)}` // balanceOf method
            }, "latest"]
        });

        // Convert response from hex to decimal and format to show 6 decimals (USDC standard)
        const balance = parseInt(response as string, 16) / 1e6;
        return balance.toString();
    } catch (error) {
        console.error("Error checking USDC balance:", error);
        return "0";
    }
};

// Function to get supported fiat currencies
export const getSupportedFiatCurrencies = async (web3Auth: Web3Auth) => {
    try {
        if (!web3Auth.provider) {
            throw new Error("Provider not initialized");
        }

        const response = await web3Auth.provider.request({
            method: "get_supported_fiat_currencies",
            params: {}
        });

        return response;
    } catch (error) {
        console.error("Error getting supported fiat currencies:", error);
        return [];
    }
};

// Function to get estimated fees
export const getEstimatedFees = async (web3Auth: Web3Auth, amount: number) => {
    try {
        if (!web3Auth.provider) {
            throw new Error("Provider not initialized");
        }

        const response = await web3Auth.provider.request({
            method: "get_estimated_fees",
            params: {
                fiatAmount: amount,
                fiatCurrency: "USD",
                cryptoCurrency: "USDC",
                network: "arbitrum"
            }
        });

        return response;
    } catch (error) {
        console.error("Error getting estimated fees:", error);
        return null;
    }
}; 