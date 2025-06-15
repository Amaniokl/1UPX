import { PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';
import { Connection } from '@solana/web3.js';

export interface WalletProvider {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getAddress(): Promise<string>;
    getBalance(): Promise<string>;
    signMessage(message: string): Promise<string>;
    isConnected(): boolean;
}

export interface EVMWalletProvider extends WalletProvider {
    getProvider(): ethers.BrowserProvider;
    getSigner(): Promise<ethers.Signer>;
}

export interface SolanaWalletProvider extends WalletProvider {
    getPublicKey(): Promise<PublicKey>;
    getProvider(): any; // Solana wallet provider type
    getConnection(): Connection; // Get the Solana connection
} 