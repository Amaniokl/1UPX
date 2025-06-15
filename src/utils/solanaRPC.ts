import { SolanaPrivateKeyProvider, SolanaWallet } from "@web3auth/solana-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Connection, LAMPORTS_PER_SOL, PublicKey, ConnectionConfig } from "@solana/web3.js";
import { getED25519Key } from "@web3auth/auth-adapter";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

// Helius RPC endpoint
const HELIUS_RPC_URL = 'https://mainnet.helius-rpc.com/?api-key=c73b793a-38da-4141-ad57-97d71c264a76';

// Connection configuration with higher timeouts and proper commitment
const CONNECTION_CONFIG: ConnectionConfig = {
    commitment: 'finalized',
    confirmTransactionInitialTimeout: 120000, // 2 minutes
    wsEndpoint: 'wss://mainnet.helius-rpc.com/ws?api-key=c73b793a-38da-4141-ad57-97d71c264a76',
    httpHeaders: {
        'Content-Type': 'application/json',
    }
};

// Rate limiting settings
const RATE_LIMIT_RESET_INTERVAL = 1000; // 1 second
const MAX_REQUESTS_PER_SECOND = 50; // Helius rate limit
const RATE_LIMIT_BUFFER = 5; // Buffer to stay under limit

// Exponential backoff settings for 429s
const INITIAL_BACKOFF = 1000; // 1 second
const MAX_BACKOFF = 30000; // 30 seconds
const MAX_RETRIES = 5;

// Block validity settings
const BLOCK_HEIGHT_BUFFER = 150; // Buffer blocks before expiry
const MIN_VALID_BLOCK_HEIGHT = 150; // Minimum blocks of validity

class SolanaRPCManager {
    private static instance: SolanaRPCManager;
    private connection: Connection;
    private requestCount: number;
    private lastResetTime: number;
    private lastBlockhash: { blockhash: string; lastValidBlockHeight: number } | null = null;
    private lastBlockhashTime: number = 0;
    private readonly BLOCKHASH_CACHE_TIMEOUT = 5000; // 5 seconds

    private constructor() {
        this.connection = new Connection(HELIUS_RPC_URL, CONNECTION_CONFIG);
        this.requestCount = 0;
        this.lastResetTime = Date.now();
    }

    public static getInstance(): SolanaRPCManager {
        if (!SolanaRPCManager.instance) {
            SolanaRPCManager.instance = new SolanaRPCManager();
        }
        return SolanaRPCManager.instance;
    }

    private async waitForRateLimit(): Promise<void> {
        const now = Date.now();
        const timeSinceReset = now - this.lastResetTime;

        // Reset counter if RATE_LIMIT_RESET_INTERVAL has passed
        if (timeSinceReset >= RATE_LIMIT_RESET_INTERVAL) {
            this.requestCount = 0;
            this.lastResetTime = now;
            return;
        }

        // If we're approaching the rate limit, wait for reset
        if (this.requestCount >= (MAX_REQUESTS_PER_SECOND - RATE_LIMIT_BUFFER)) {
            const waitTime = RATE_LIMIT_RESET_INTERVAL - timeSinceReset;
            await new Promise(resolve => setTimeout(resolve, waitTime));
            this.requestCount = 0;
            this.lastResetTime = Date.now();
        }
    }

    private async getBackoff(retryCount: number): Promise<number> {
        const backoff = Math.min(INITIAL_BACKOFF * Math.pow(2, retryCount), MAX_BACKOFF);
        return backoff + Math.random() * backoff * 0.1; // Add jitter
    }

    public async getLatestBlockhashWithValidityPeriod() {
        const now = Date.now();

        // Return cached blockhash if it's still fresh
        if (this.lastBlockhash && (now - this.lastBlockhashTime) < this.BLOCKHASH_CACHE_TIMEOUT) {
            return this.lastBlockhash;
        }

        try {
            // Get current slot and latest blockhash
            const [currentSlot, { blockhash, lastValidBlockHeight }] = await Promise.all([
                this.executeWithRetry(conn => conn.getSlot('finalized'), 'getSlot'),
                this.executeWithRetry(conn => conn.getLatestBlockhash('finalized'), 'getLatestBlockhash')
            ]);

            // Ensure minimum validity period
            const adjustedValidBlockHeight = Math.max(
                currentSlot + MIN_VALID_BLOCK_HEIGHT,
                lastValidBlockHeight - BLOCK_HEIGHT_BUFFER
            );

            this.lastBlockhash = {
                blockhash,
                lastValidBlockHeight: adjustedValidBlockHeight
            };
            this.lastBlockhashTime = now;

            return this.lastBlockhash;
        } catch (error) {
            console.error('Error getting latest blockhash:', error);
            throw error;
        }
    }

    public async executeWithRetry<T>(
        operation: (connection: Connection) => Promise<T>,
        context: string = 'unknown'
    ): Promise<T> {
        let lastError: Error | null = null;

        for (let retry = 0; retry < MAX_RETRIES; retry++) {
            try {
                await this.waitForRateLimit();
                this.requestCount++;

                const result = await operation(this.connection);
                return result;
            } catch (error: any) {
                console.warn(`Helius RPC error (${context}):`, error);
                lastError = error;

                // If it's a rate limit error, wait before retry
                if (error?.response?.status === 429 || error?.code === 429) {
                    const backoff = await this.getBackoff(retry);
                    console.log(`Rate limited. Waiting ${backoff}ms before retry ${retry + 1}/${MAX_RETRIES}`);
                    await new Promise(resolve => setTimeout(resolve, backoff));
                    // Reset request count after rate limit
                    this.requestCount = 0;
                    this.lastResetTime = Date.now();
                } else {
                    // For non-rate-limit errors, throw immediately
                    throw error;
                }
            }
        }

        throw lastError || new Error('All RPC retries failed');
    }

    public getConnection(): Connection {
        return this.connection;
    }
}

export const solanaRPC = SolanaRPCManager.getInstance();

export default class SolanaRPC {
    private provider: SolanaPrivateKeyProvider;
    private privateKey: string;
    private connection: Connection;

    constructor(privateKey: string) {
        console.log("Initializing SolanaRPC with connection config");
        // Initialize connection with proper config
        this.connection = new Connection(HELIUS_RPC_URL, {
            commitment: 'confirmed',
            confirmTransactionInitialTimeout: 120000, // 2 minutes
            wsEndpoint: 'wss://mainnet.helius-rpc.com/ws?api-key=c73b793a-38da-4141-ad57-97d71c264a76',
        });

        this.provider = new SolanaPrivateKeyProvider({
            config: {
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.SOLANA,
                    chainId: "0x1",
                    rpcTarget: HELIUS_RPC_URL,
                    displayName: "Solana Mainnet",
                    blockExplorerUrl: "https://explorer.solana.com/",
                    ticker: "SOL",
                    tickerName: "Solana",
                },
            },
        });
        this.privateKey = privateKey;
        console.log("SolanaRPC initialized successfully");
    }

    async getAccounts(): Promise<string> {
        try {
            console.log("Getting Solana account from private key");
            const ed25519key = getED25519Key(this.privateKey).sk.toString("hex");
            console.log("ED25519 key generated successfully");
            
            await this.provider.setupProvider(ed25519key);
            console.log("Provider setup completed");
            
            const solanaWallet = new SolanaWallet(this.provider as SolanaPrivateKeyProvider);
            console.log("Solana wallet instance created");
            
            const solana_address = await solanaWallet.requestAccounts();
            console.log("Retrieved Solana address:", solana_address[0]);
            
            return solana_address[0];
        } catch (error) {
            console.error("Error getting Solana account:", error);
            throw error;
        }
    }

    async getLatestBlockhashWithValidityPeriod() {
        try {
            console.log("Fetching latest blockhash with confirmed commitment");
            const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash({
                commitment: 'confirmed'
            });
            console.log("Latest blockhash details:", {
                blockhash,
                lastValidBlockHeight,
                timestamp: new Date().toISOString()
            });

            return { blockhash, lastValidBlockHeight };
        } catch (error) {
            console.error("Error getting latest blockhash:", error);
            throw error;
        }
    }

    async getBalance(): Promise<string> {
        try {
            console.log("Fetching Solana balance");
            const address = await this.getAccounts();
            console.log("Fetching balance for address:", address);
            
            const balance = await this.connection.getBalance(new PublicKey(address), 'confirmed');
            const formattedBalance = (balance / LAMPORTS_PER_SOL).toString();
            console.log("Balance retrieved:", {
                rawBalance: balance,
                formattedBalance,
                address
            });
            
            return formattedBalance;
        } catch (error) {
            console.error("Error getting balance:", error);
            throw error;
        }
    }

    async getTokenBalance(tokenAddress: string): Promise<string> {
        try {
            console.log("Fetching token balance for:", tokenAddress);
            const address = await this.getAccounts();
            console.log("Owner address:", address);

            console.log("Getting parsed token accounts");
            const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
                new PublicKey(address),
                { mint: new PublicKey(tokenAddress) },
                'confirmed'
            );

            console.log("Token accounts found:", tokenAccounts.value.length);

            if (tokenAccounts.value.length === 0) {
                console.log("No token accounts found, returning 0 balance");
                return "0";
            }

            // Log all token accounts and their balances
            tokenAccounts.value.forEach((account, index) => {
                console.log(`Token account ${index + 1}:`, {
                    address: account.pubkey.toString(),
                    balance: account.account.data.parsed.info.tokenAmount.amount,
                    decimals: account.account.data.parsed.info.tokenAmount.decimals
                });
            });

            // Get the token account with the highest balance
            const highestBalanceAccount = tokenAccounts.value.reduce((prev, curr) => {
                const prevBalance = BigInt(prev.account.data.parsed.info.tokenAmount.amount);
                const currBalance = BigInt(curr.account.data.parsed.info.tokenAmount.amount);
                return prevBalance > currBalance ? prev : curr;
            });

            console.log("Highest balance account:", {
                address: highestBalanceAccount.pubkey.toString(),
                balance: highestBalanceAccount.account.data.parsed.info.tokenAmount.amount,
                decimals: highestBalanceAccount.account.data.parsed.info.tokenAmount.decimals
            });

            return highestBalanceAccount.account.data.parsed.info.tokenAmount.amount;
        } catch (error) {
            console.error("Error getting token balance:", error);
            throw error;
        }
    }
} 