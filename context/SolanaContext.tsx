"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { getSolanaNetwork } from '@/lib/rpc';

type SolanaNetwork = WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Devnet | WalletAdapterNetwork.Testnet;

interface SolanaContextType {
    network: SolanaNetwork;
    setNetwork: (network: SolanaNetwork) => void;
    networkLabel: string;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export function SolanaNetworkProvider({ children }: { children: ReactNode }) {
    const [network, setNetwork] = useState<SolanaNetwork>(() => getSolanaNetwork());

    const networkLabel = network === WalletAdapterNetwork.Mainnet
        ? "mainnet"
        : network === WalletAdapterNetwork.Devnet
            ? "devnet"
            : "testnet";

    return (
        <SolanaContext.Provider value={{ network, setNetwork, networkLabel }}>
            {children}
        </SolanaContext.Provider>
    );
}

export function useSolanaNetwork() {
    const context = useContext(SolanaContext);
    if (context === undefined) {
        throw new Error('useSolanaNetwork must be used within a SolanaNetworkProvider');
    }
    return context;
}