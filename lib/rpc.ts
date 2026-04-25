import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// Default RPC endpoints (fallback)
const DEFAULT_RPC_ENDPOINTS: Record<WalletAdapterNetwork, string> = {
    [WalletAdapterNetwork.Mainnet]: "https://api.mainnet-beta.solana.com",
    [WalletAdapterNetwork.Devnet]: "https://api.devnet.solana.com",
    [WalletAdapterNetwork.Testnet]: "https://api.testnet.solana.com",
};

// RPC Provider URL builders
const RPC_BUILDERS = {
    helius: (key: string) => `https://mainnet.helius-rpc.com/?api-key=${key}`,
    quicknode: (key: string) => `https://mainnet.quicknode.com/${key}`,
};

// Get network from environment variable (default to mainnet)
export const getSolanaNetwork = (): WalletAdapterNetwork => {
    const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "mainnet";
    switch (network.toLowerCase()) {
        case "devnet":
            return WalletAdapterNetwork.Devnet;
        case "testnet":
            return WalletAdapterNetwork.Testnet;
        case "mainnet":
        default:
            return WalletAdapterNetwork.Mainnet;
    }
};

// Get active provider name
const getActiveProvider = (): string => {
    return process.env.NEXT_PUBLIC_RPC_PROVIDER || "helius";
};

// Get API key for a specific provider
const getApiKey = (provider: string): string | undefined => {
    switch (provider) {
        case "helius":
            return process.env.NEXT_PUBLIC_HELIUS_API_KEY;
        case "quicknode":
            return process.env.NEXT_PUBLIC_QUICKNODE_API_KEY;
        default:
            return undefined;
    }
};

// Get RPC endpoint for mainnet using active provider
export const getRpcEndpoint = (network: WalletAdapterNetwork): string => {
    // Only apply custom RPC for mainnet
    if (network !== WalletAdapterNetwork.Mainnet) {
        return DEFAULT_RPC_ENDPOINTS[network];
    }

    const provider = getActiveProvider();
    const apiKey = getApiKey(provider);
    const builder = RPC_BUILDERS[provider as keyof typeof RPC_BUILDERS];

    if (apiKey && builder) {
        return builder(apiKey);
    }

    return DEFAULT_RPC_ENDPOINTS[WalletAdapterNetwork.Mainnet];
};

// Helper to check which provider is active (useful for UI)
export const getActiveProviderLabel = (): string => {
    return getActiveProvider().toUpperCase();
};