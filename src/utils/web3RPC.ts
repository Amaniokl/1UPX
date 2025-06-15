import type { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

export class Web3RPC {
    private provider: IProvider;

    constructor(provider: IProvider) {
        this.provider = provider;
    }

    async getChainId(): Promise<string> {
        try {
            const ethersProvider = new ethers.BrowserProvider(this.provider);
            const network = await ethersProvider.getNetwork();
            return network.chainId.toString();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAccounts(): Promise<string> {
        try {
            const ethersProvider = new ethers.BrowserProvider(this.provider);
            const signer = await ethersProvider.getSigner();
            return await signer.getAddress();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getBalance(): Promise<string> {
        try {
            const ethersProvider = new ethers.BrowserProvider(this.provider);
            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
            const balance = await ethersProvider.getBalance(address);
            const formattedBalance = parseFloat(ethers.formatEther(balance))
                .toFixed(6)
                .replace(/\.?0+$/, '');
            return formattedBalance;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async signMessage(message: string): Promise<string> {
        try {
            const ethersProvider = new ethers.BrowserProvider(this.provider);
            const signer = await ethersProvider.getSigner();
            return await signer.signMessage(message);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
} 