"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useSolanaNetwork } from "@/context/SolanaContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import { Button, GlassCard } from "./UI";
import { Github, Linkedin, Wallet, Loader2, ArrowRight, Search, Terminal, Cpu, Download, Info, ShieldCheck, ShieldAlert } from "lucide-react";
import { getMint } from "@solana/spl-token";
import { toast } from "react-toastify";

const RECEIVER_WALLET = "5qsHwA8wzwXmv6fQoM1TB23hdr6wqf4kDE5B4JjttoYq";
const TOKEN_PROGRAM_ID_STR = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_2022_PROGRAM_ID_STR = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const METADATA_PROGRAM_ID_STR = "metaqbxxUf397E1iXCTMBza4d86X5zg6mHwoSbwS297";

interface TokenData {
  address: string;
  name: string;
  symbol: string;
  supply: string;
  decimals: number;
  mintAuthority: string | null;
  freezeAuthority: string | null;
  updateAuthority: string | null;
  holders: string | null;
  volume24h: string | null;
  isToken2022: boolean;
}

export default function Hero() {
    const { t, language } = useLanguage();
    const { connection } = useConnection();
    const { network, networkLabel } = useSolanaNetwork(); void network;
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
    const [txHash, setTxHash] = useState(""); void txHash;
    const [mounted, setMounted] = useState(false);

    // Token Inspector State
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenLoading, setTokenLoading] = useState(false);
    const [tokenError, setTokenError] = useState<string | null>(null);
    const [tokenData, setTokenData] = useState<TokenData | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const inspectToken = async () => {
        const trimmedAddress = tokenAddress.trim();
        if (!trimmedAddress) return;
        if (!connection) {
            setTokenError(t('connection_not_ready') || "Connection not ready");
            return;
        }

        setTokenLoading(true);
        setTokenError(null);
        setTokenData(null);

        try {
          let mintPubkey: PublicKey;
          try {
            mintPubkey = new PublicKey(trimmedAddress);
          } catch {
            setTokenError(t('token_error') || "Invalid token address");
            setTokenLoading(false);
            return;
          }

          // 1. Try fetching Mint Info (Check both Token and Token-2022)
          let mintInfo;
          let isToken2022 = false;
          const tokenProgram = new PublicKey(TOKEN_PROGRAM_ID_STR);
          const token2022Program = new PublicKey(TOKEN_2022_PROGRAM_ID_STR);

          try {
            mintInfo = await getMint(connection, mintPubkey, "confirmed", tokenProgram);
          } catch {
            try {
                mintInfo = await getMint(connection, mintPubkey, "confirmed", token2022Program);
                isToken2022 = true;
            } catch (err) {
                console.error("Mint fetch failed:", err);
                throw new Error("Mint not found on any known program");
            }
          }

          // 2. Fetch Metadata (Metaplex)
          let name = "Unknown Token";
          let symbol = "???";
          let updateAuthority = null;

          try {
            const metadataProgram = new PublicKey(METADATA_PROGRAM_ID_STR);
            const encoder = new TextEncoder();
            const [metadataPDA] = PublicKey.findProgramAddressSync(
              [encoder.encode("metadata"), metadataProgram.toBuffer(), mintPubkey.toBuffer()],
              metadataProgram
            );
            const accountInfo = await connection.getAccountInfo(metadataPDA);
            if (accountInfo) {
               const data = accountInfo.data;
               // Very basic parsing of Metaplex metadata layout
               if (data.length >= 33) {
                 updateAuthority = new PublicKey(data.slice(1, 33)).toBase58();
               }

               const decoder = new TextDecoder();
               // Name starts at offset 65 for Token Metadata V1
               if (data.length >= 65 + 32) {
                 const nameStart = 65;
                 const nameLen = 32;
                 name = decoder.decode(data.slice(nameStart, nameStart + nameLen)).replace(/\0/g, '').trim();
               }
               if (data.length >= 97 + 10) {
                 symbol = decoder.decode(data.slice(97, 97 + 10)).replace(/\0/g, '').trim();
               }
            }
          } catch (e) {
            console.warn("Metaplex metadata fetch failed", e);
          }

          // 3. Fetch Market Data from DexScreener
          let volume24h = "N/A";
          const holders = "N/A";
          try {
            const dexRes = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${trimmedAddress}`);
            const dexData = await dexRes.json();
            if (dexData.pairs && dexData.pairs.length > 0) {
              const pair = dexData.pairs[0];
              volume24h = `$${Number(pair.volume.h24).toLocaleString()}`;
              if (name === "Unknown Token") name = pair.baseToken.name;
              if (symbol === "???") symbol = pair.baseToken.symbol;
            }
          } catch (e) {
            console.warn("DexScreener fetch failed", e);
          }

          const supply = (Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals)).toLocaleString();

          setTokenData({
            address: mintPubkey.toBase58(),
            name,
            symbol,
            supply,
            decimals: mintInfo.decimals,
            mintAuthority: mintInfo.mintAuthority ? mintInfo.mintAuthority.toBase58() : null,
            freezeAuthority: mintInfo.freezeAuthority ? mintInfo.freezeAuthority.toBase58() : null,
            updateAuthority,
            holders,
            volume24h,
            isToken2022
          });
        } catch (err) {
          console.error(err);
          const errorMsg = err instanceof Error ? err.message : String(err);
          if (errorMsg.includes('403') || errorMsg.includes('Access forbidden')) {
            setTokenError(t('rpc_rate_limit') || "RPC rate limit exceeded. Check your endpoint configuration.");
          } else {
            setTokenError(t('token_error') || "Failed to fetch token info");
          }
        } finally {
          setTokenLoading(false);
        }
    };

    const handleSend = async () => {
        // 1. Pre-validation
        if (!publicKey) {
            toast.error(t('wallet_not_connected') || "Wallet not connected");
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            toast.error(t('invalid_amount') || "Invalid amount");
            return;
        }
        if (!connection) {
            toast.error("Connection not initialized");
            return;
        }

        try {
            setStatus("pending");

            // Debugging Logs
            console.log("--- START TRANSACTION ---");
            console.log("RPC Endpoint:", connection.rpcEndpoint);
            console.log("Wallet Public Key:", publicKey.toBase58());
            console.log("Amount (SOL):", amount);

            const receiver = new PublicKey(RECEIVER_WALLET);
            const lamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);

            // 2. Transaction Build
            const latestBlockhash = await connection.getLatestBlockhash();
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: receiver,
                    lamports,
                })
            );

            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.feePayer = publicKey;

            console.log("Transaction Object:", transaction);

            // 3. Send Transaction
            const signature = await sendTransaction(transaction, connection);
            console.log("Signature Received:", signature);

            // 4. Confirmation Strategy
            toast.info(t('tx_confirming') || "Confirming transaction...");
            await connection.confirmTransaction({
                signature,
                ...latestBlockhash
            }, "confirmed");

            setTxHash(signature);
            setStatus("success");
            setAmount("");
            toast.success(t('tx_success') || "Transaction successful!");
            console.log("--- TRANSACTION SUCCESS ---");
        } catch (error: unknown) {
            console.error("--- TRANSACTION FAILED ---");
            console.error(error);
            setStatus("error");

            // User Feedback
            const errorMsg = error instanceof Error ? error.message : String(error);
            toast.error(`${t('tx_failed') || "Transaction failed"}: ${errorMsg.slice(0, 50)}...`);
        }
    };

  const AuthorityBadge = ({ authority, label }: { authority: string | null, label: string }) => (
    <div className="bg-black/40 p-2 border border-white/5">
        <p className="text-[7px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-center gap-1.5">
            {authority ? (
                <ShieldAlert size={8} className="text-red-500" />
            ) : (
                <ShieldCheck size={8} className="text-primary" />
            )}
            <p className={`text-[8px] font-black truncate ${authority ? 'text-white' : 'text-primary'}`}>
                {authority ? (authority.slice(0, 8) + '...') : t('token_status_revoked')}
            </p>
        </div>
    </div>
  );

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden command-grid">
      <div className="absolute inset-0 scanline opacity-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Main Command Tile: Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            <GlassCard className="h-full p-10 flex flex-col justify-between border-primary/20 glow-border-cyan relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal size={120} className="text-primary" />
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8"
                >
                  <span className="status-dot status-dot-active" />
                  {t('available')}
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black leading-[0.85] mb-6 uppercase tracking-tighter glow-text-cyan">
                  <span className="sr-only">Ralskill - </span>
                  <span className="text-white">AL</span>
                  <span className="text-primary">DINO</span>
                </h1>

                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[2px] w-12 bg-primary/50" />
                  <p className="text-primary font-black text-xs uppercase tracking-[0.3em]">
                    {t('hero_title')}
                  </p>
                </div>

                <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed font-medium font-mono">
                  &gt; {t('hero_subtitle')}
                  <span className="inline-block w-2 h-5 bg-primary ml-2 animate-pulse align-middle" />
                </p>
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <Button
                    onClick={() => document.getElementById('projects')?.scrollIntoView()}
                    className="flex items-center gap-2 !rounded-none !bg-primary !text-black !font-black !px-8 hover:!bg-white transition-colors"
                >
                  {t('hero_cta_projects')}
                  <ArrowRight size={18} />
                </Button>
                <Button
                  variant="outline"
                  className="!rounded-none border-white/20 text-white hover:border-primary hover:text-primary transition-all font-black !px-8"
                  onClick={() => document.getElementById('contact')?.scrollIntoView()}
                >
                  {t('hero_cta_contact')}
                </Button>

                <div className="ml-auto flex gap-6">
                  <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all transform hover:scale-110">
                      <Github size={24} />
                  </a>
                  <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all transform hover:scale-110">
                      <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Side Tile: Dev Support Donation (Formerly Token Inspector) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4"
          >
            <GlassCard className="h-full p-8 border-white/5 bg-dark-gray/20 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`status-dot ${mounted && publicKey ? 'status-dot-active' : 'bg-red-500'}`} />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            {mounted && publicKey ? 'Node Connected' : 'Wallet Detached'}
                        </span>
                    </div>
                    <Wallet className="text-primary/30" size={20} />
                </div>

                <div className="flex-1 space-y-6">
                    <div className="space-y-3">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                           <Info size={14} className="text-primary" />
                           {t('web3_support_title')}
                        </h3>
                        <p className="text-[10px] font-mono leading-relaxed text-gray-500 uppercase">
                           {t('web3_support_desc')}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-4">
                        {mounted ? (
                            <WalletMultiButton />
                        ) : (
                            <div className="h-12 w-full bg-white/5 animate-pulse" />
                        )}

                        {mounted && publicKey && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="terminal-input w-full !pr-12"
                                        placeholder="Amount..."
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-black text-[10px]">SOL</span>
                                </div>

                                <Button
                                    className="w-full !rounded-none h-12 !bg-primary !text-black uppercase tracking-widest text-[10px] font-black"
                                    disabled={status === "pending" || !amount}
                                    onClick={handleSend}
                                >
                                    {status === "pending" ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Execute Support'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </GlassCard>
          </motion.div>

          {/* Bottom Tile: Token Inspector (Integrated into stats) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-12"
          >
            <GlassCard className="p-8 border-white/5 bg-dark-gray/20 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 border border-primary/20">
                            <Search size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em]">{t('token_inspector_title')}</h3>
                            <p className="text-[9px] font-mono text-gray-500 uppercase mt-1">v1.1.0 — {networkLabel.toUpperCase()} NODE</p>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Paste Solana Mint Address..."
                            className="terminal-input flex-1 md:w-80"
                            value={tokenAddress}
                            onChange={(e) => setTokenAddress(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && inspectToken()}
                        />
                        <Button
                            onClick={inspectToken}
                            disabled={tokenLoading || !tokenAddress}
                            className="!rounded-none !bg-white/5 hover:!bg-primary hover:!text-black border border-white/10 transition-all font-black"
                        >
                            {tokenLoading ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
                        </Button>
                    </div>
                </div>

                <div className="relative z-10 min-h-[120px]">
                  <AnimatePresence mode="wait">
                    {tokenError ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/20 text-red-400 text-[10px] font-mono"
                        >
                            <ShieldAlert size={16} />
                            [SYSTEM ERROR]: {tokenError}
                        </motion.div>
                    ) : tokenData ? (
                        <motion.div
                            key="data"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                                {[
                                    { label: t('token_name'), value: tokenData.name, primary: true },
                                    { label: 'Symbol', value: tokenData.symbol, primary: true },
                                    { label: t('token_supply'), value: tokenData.supply },
                                    { label: t('token_volume_24h'), value: tokenData.volume24h, primary: true },
                                    { label: t('token_holders'), value: tokenData.holders },
                                    { label: 'Decimals', value: tokenData.decimals },
                                    { label: 'Program', value: tokenData.isToken2022 ? 'TOKEN-2022' : 'SPL-TOKEN' }
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
                                        <p className={`text-sm font-black truncate ${stat.primary ? 'text-primary' : 'text-white'}`}>
                                            {stat.value || 'N/A'}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <AuthorityBadge label={t('token_mint_authority')} authority={tokenData.mintAuthority} />
                                <AuthorityBadge label={t('token_freeze_authority')} authority={tokenData.freezeAuthority} />
                                <AuthorityBadge label={t('token_update_authority')} authority={tokenData.updateAuthority} />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full"
                        >
                          {[
                            { label: 'Blockchain', value: 'Solana/EVM' },
                            { label: 'Network', value: networkLabel.toUpperCase() },
                            { label: 'Status', value: mounted && publicKey ? 'Online' : 'Offline' },
                            { label: 'Location', value: 'Remote' }
                          ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                              <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">{stat.label}</p>
                              <p className="text-sm font-black text-white uppercase tracking-wider">{stat.value}</p>
                            </div>
                          ))}
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-primary/5 to-transparent flex items-center justify-center pointer-events-none">
                  <Cpu size={60} className="text-primary/10 animate-pulse" />
                </div>
            </GlassCard>
          </motion.div>

        </div>

        {/* Download CV Button */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex justify-center"
        >
            <a
                href={language === 'fr' ? '/fr-cv.pdf' : '/en-cv.pdf'}
                download
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-700 shadow-[0_0_10px_rgba(6,182,212,1)]" />

                <Download size={18} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white group-hover:text-primary transition-colors">
                    {t('nav_download_cv')}
                </span>
            </a>
        </motion.div>
      </div>
    </section>
  );
}
