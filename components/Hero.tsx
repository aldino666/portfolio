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
import { Github, Linkedin, Wallet, CheckCircle2, AlertCircle, Loader2, ArrowRight, Search, Terminal, Cpu } from "lucide-react";
import { getMint } from "@solana/spl-token";
import { toast } from "react-toastify";

const RECEIVER_WALLET = "5qsHwA8wzwXmv6fQoM1TB23hdr6wqf4kDE5B4JjttoYq";

interface TokenData {
  address: string;
  supply: string;
  decimals: number;
  mintAuthority: string | null;
  freezeAuthority: string | null;
}

export default function Hero() {
    const { t } = useLanguage();
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
        if (!tokenAddress) return;
        if (!connection) {
            setTokenError(t('connection_not_ready') || "Connection not ready");
            return;
        }

        setTokenLoading(true);
        setTokenError(null);
        setTokenData(null);

        try {
          const mintPubkey = new PublicKey(tokenAddress);
          const mintInfo = await getMint(connection, mintPubkey);

          const supply = (Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals)).toLocaleString();

          setTokenData({
            address: mintPubkey.toBase58(),
            supply,
            decimals: mintInfo.decimals,
            mintAuthority: mintInfo.mintAuthority ? mintInfo.mintAuthority.toBase58() : null,
            freezeAuthority: mintInfo.freezeAuthority ? mintInfo.freezeAuthority.toBase58() : null,
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

          {/* Side Tile: Token Inspector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4"
          >
            <GlassCard className="h-full p-8 border-white/5 bg-dark-gray/20 flex flex-col">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <Search size={16} className="text-primary" />
                        {t('token_inspector_title')}
                    </h3>
                    <div className="text-[10px] font-mono text-gray-600">v1.0.4</div>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Target Mint Address</p>
                    <input
                        type="text"
                        placeholder="Paste Solana Mint..."
                        className="terminal-input w-full"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && inspectToken()}
                    />
                    <Button
                        onClick={inspectToken}
                        disabled={tokenLoading || !tokenAddress}
                        className="w-full h-12 !rounded-none !bg-white/5 hover:!bg-primary hover:!text-black border border-white/10 transition-all uppercase tracking-widest text-[10px] font-black"
                    >
                        {tokenLoading ? <Loader2 className="animate-spin mx-auto" size={16} /> : t('token_inspect_button')}
                    </Button>
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                      {tokenError && (
                          <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="p-4 bg-red-500/5 border border-red-500/20 text-red-400 text-[10px] font-mono leading-relaxed"
                          >
                              [ERROR]: {tokenError}
                          </motion.div>
                      )}

                      {tokenData ? (
                          <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-4"
                          >
                              <div className="space-y-2">
                                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                                  <span className="text-gray-500">Supply</span>
                                  <span className="text-white font-black">{tokenData.supply}</span>
                                </div>
                                <div className="w-full h-1 bg-white/5">
                                  <div className="h-full bg-primary w-2/3 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 pt-4">
                                  <div className="bg-black/40 p-3 border border-white/5">
                                      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</p>
                                      <div className="flex items-center gap-1">
                                          {!tokenData.mintAuthority ? (
                                              <CheckCircle2 size={10} className="text-primary" />
                                          ) : (
                                              <AlertCircle size={10} className="text-amber-500" />
                                          )}
                                          <span className={`text-[9px] font-black uppercase ${!tokenData.mintAuthority ? 'text-primary' : 'text-amber-500'}`}>
                                              {!tokenData.mintAuthority ? 'VERIFIED' : 'RISKY'}
                                          </span>
                                      </div>
                                  </div>
                                  <div className="bg-black/40 p-3 border border-white/5">
                                      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Authority</p>
                                      <p className="text-[9px] font-black text-white truncate">
                                        {tokenData.mintAuthority ? 'Enabled' : 'Revoked'}
                                      </p>
                                  </div>
                              </div>
                          </motion.div>
                      ) : !tokenLoading && (
                        <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/10 opacity-30">
                          <Cpu size={32} />
                          <p className="text-[8px] font-black uppercase mt-2 tracking-[0.2em]">Awaiting Data</p>
                        </div>
                      )}
                  </AnimatePresence>
                </div>
            </GlassCard>
          </motion.div>

          {/* Bottom Tile: Solana Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <GlassCard className="p-8 border-white/5 bg-dark-gray/20">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`status-dot ${mounted && publicKey ? 'status-dot-active' : 'bg-red-500'}`} />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            {mounted && publicKey ? 'Node Connected' : 'Wallet Detached'}
                        </span>
                    </div>
                    <Wallet className="text-primary/30" size={20} />
                </div>

                <div className="space-y-6">
                    {mounted ? (
                        <WalletMultiButton className="!bg-primary/10 !w-full !justify-center !rounded-none !border !border-primary/50 !font-black hover:!bg-primary hover:!text-black transition-all !h-12 !text-primary !uppercase !tracking-widest !text-[10px]" />
                    ) : (
                        <div className="h-12 w-full bg-white/5 animate-pulse" />
                    )}

                    {mounted && publicKey && (
                        <div className="space-y-4 pt-4 border-t border-white/5">
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
            </GlassCard>
          </motion.div>

          {/* Bottom Tile: Decorative Data/Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8"
          >
            <GlassCard className="p-8 border-white/5 bg-dark-gray/20 flex items-center justify-between relative overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full relative z-10">
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
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent flex items-center justify-center">
                  <Cpu size={40} className="text-primary/20 animate-pulse" />
                </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
