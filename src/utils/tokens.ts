import { createPublicClient, http, erc20Abi, formatUnits, Address } from "viem";
import { mainnet, arbitrum, base, optimism, polygon } from "viem/chains";

export interface TokenInfo {
    address: string;
    symbol: string;
    decimals: number;
    name: string;
    iconUrl?: string;
    type: string;
    balance?: string;
    occurrences?: number;
}

const CHAIN_IDS = {
    ethereum: "1",
    polygon: "137",
    base: "8453"
};

const RPC_CONFIGS = {
    [CHAIN_IDS.ethereum]: {
        chain: mainnet,
        url: "https://eth-mainnet.g.alchemy.com/v2/2Xl0kiqyNVT5An-x05eclIgbpBMYVjAD"
    },
    [CHAIN_IDS.polygon]: {
        chain: polygon,
        url: "https://polygon-mainnet.g.alchemy.com/v2/2Xl0kiqyNVT5An-x05eclIgbpBMYVjAD"
    },
    [CHAIN_IDS.base]: {
        chain: base,
        url: "https://base-mainnet.g.alchemy.com/v2/2Xl0kiqyNVT5An-x05eclIgbpBMYVjAD"
    }
};

const getPublicClient = (chainId: string) => {
    const config = RPC_CONFIGS[chainId];
    if (!config) return null;

    return createPublicClient({
        chain: config.chain,
        transport: http(config.url)
    });
};

const getTokenList = async (chainId: string): Promise<TokenInfo[]> => {
    try {
        const data = await import(`./tokens/list/${chainId}.json`);
        const filteredTokens = data.default.filter(
            (token: TokenInfo) => parseInt(token.occurrences?.toString() || "0") >= 5
        );
        return filteredTokens;
    } catch (error) {
        console.error(`Error loading token list for chain ${chainId}:`, error);
        return [];
    }
};

const getTokensBalance = async (
    chainId: string,
    tokens: TokenInfo[],
    userAddress: string,
    client: any
): Promise<string[]> => {
    try {
        const balance = await client.multicall({
            contracts: tokens.map((token) => ({
                address: token.address as Address,
                abi: erc20Abi,
                functionName: "balanceOf",
                args: [userAddress as Address],
            })),
        });

        return balance.map((v: any, idx: number) =>
            formatUnits(v.result as bigint, tokens[idx].decimals)
        );
    } catch (error) {
        console.error("Error fetching token balances:", error);
        return tokens.map(() => "0");
    }
};

export const fetchTokensForChain = async (
    chainId: string,
    provider?: any,
    userAddress?: string
): Promise<TokenInfo[]> => {
    try {
        const tokens = await getTokenList(chainId);
        const client = getPublicClient(chainId);
        if (!client) return tokens;

        if (provider && userAddress) {
            // Get native token balance
            let nativeBalance = "0";
            try {
                const balance = await client.getBalance({ address: userAddress as Address });
                nativeBalance = formatUnits(balance, 18);
            } catch (error) {
                console.warn("Error fetching native balance:", error);
            }

            // Filter out native token for multicall
            const erc20Tokens = tokens.filter(token =>
                token.address !== "native" &&
                token.address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            );
            const nativeTokens = tokens.filter(token =>
                token.address === "native" ||
                token.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            );

            // Get ERC20 balances using multicall
            const balances = await getTokensBalance(chainId, erc20Tokens, userAddress, client);

            // Combine native and ERC20 tokens with their balances
            const tokensWithData = [
                ...nativeTokens.map(token => ({
                    ...token,
                    balance: nativeBalance
                })),
                ...erc20Tokens.map((token, idx) => ({
                    ...token,
                    balance: balances[idx]
                }))
            ];

            return tokensWithData.sort((a, b) => {
                const balanceA = parseFloat(a.balance || "0");
                const balanceB = parseFloat(b.balance || "0");
                if (balanceA === 0 && balanceB === 0) return 0;
                if (balanceA === 0) return 1;
                if (balanceB === 0) return -1;
                return balanceB - balanceA;
            });
        }

        return tokens;
    } catch (error) {
        console.error(`Error fetching tokens for chain ${chainId}:`, error);
        return [];
    }
};

export const SUPPORTED_CHAINS = [
    { id: "ethereum", name: "Ethereum", chainId: CHAIN_IDS.ethereum },
    { id: "polygon", name: "Polygon", chainId: CHAIN_IDS.polygon },
    { id: "base", name: "Base", chainId: CHAIN_IDS.base }
]; 