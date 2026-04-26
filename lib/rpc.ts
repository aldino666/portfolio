import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const RPC_ENDPOINTS: Record<string, string> = {
    [WalletAdapterNetwork.Mainnet]: "https://api.mainnet-beta.solana.com",
    [WalletAdapterNetwork.Devnet]: "https://api.devnet.solana.com",
    [WalletAdapterNetwork.Testnet]: "https://api.testnet.solana.com",
};

export const getRpcEndpoint = (network: string): string => {
    return RPC_ENDPOINTS[network] || RPC_ENDPOINTS[WalletAdapterNetwork.Mainnet];
};
