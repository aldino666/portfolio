"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

type SolanaNetwork = WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Devnet | WalletAdapterNetwork.Testnet;

interface SolanaContextType {
    network: SolanaNetwork;
    setNetwork: (network: SolanaNetwork) => void;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export function SolanaNetworkProvider({ children }: { children: ReactNode }) {
    const [network, setNetwork] = useState<SolanaNetwork>(WalletAdapterNetwork.Mainnet);

    return (
        <SolanaContext.Provider value={{ network, setNetwork }}>
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
