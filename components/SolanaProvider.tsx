"use client";

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { useSolanaNetwork } from '@/context/SolanaContext';
import { getRpcEndpoint } from '@/lib/rpc';
import '@solana/wallet-adapter-react-ui/styles.css';

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
    const { network } = useSolanaNetwork();

    const endpoint = useMemo(() => {
        const url = getRpcEndpoint(network);
        return url;
    }, [network]);


    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
