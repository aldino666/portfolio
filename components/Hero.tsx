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
import { Github, Linkedin, Wallet, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight, Search } from "lucide-react";
import { getMint } from "@solana/spl-token";

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
    const { network } = useSolanaNetwork();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
    const [txHash, setTxHash] = useState("");
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
          setTokenError(t('token_error'));
        } finally {
          setTokenLoading(false);
        }
    };

    const handleSend = async () => {
        if (!publicKey || !amount) return;

        try {
            setStatus("pending");
            const receiver = new PublicKey(RECEIVER_WALLET);
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: receiver,
                    lamports,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, "processed");

            setTxHash(signature);
            setStatus("success");
            setAmount("");
        } catch (error) {
            console.error("Transaction failed", error);
            setStatus("error");
        }
    };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t('available')}
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 uppercase tracking-tighter">
            <span className="cyan-gradient-text">ALDINO</span>
            <br />
            <span className="text-white text-3xl md:text-5xl block mt-2 opacity-90">{t('hero_title')}</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-medium">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <Button
                onClick={() => document.getElementById('projects')?.scrollIntoView()}
                className="flex items-center gap-2"
            >
              {t('hero_cta_projects')}
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
              {t('hero_cta_contact')}
            </Button>
          </div>

          <div className="mt-12 flex gap-8">
             <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all transform hover:scale-110">
                <Github size={28} />
             </a>
             <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all transform hover:scale-110">
                <Linkedin size={28} />
             </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col gap-6"
        >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full -z-10" />

            {/* Solana Support Card */}
            <GlassCard className="p-10 border-white/5 bg-dark-gray/40">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${mounted && publicKey ? 'bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'bg-red-500'}`} />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {mounted && publicKey ? t('wallet_connected') : t('wallet_not_connected')}
                        </span>
                    </div>
                    <Wallet className="text-primary/50" size={24} />
                </div>

                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">
                    {t('web3_support_title')}
                </h3>

                <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
                    {t('web3_support_desc')}
                </p>

                <div className="space-y-6">
                    {mounted ? (
                        <WalletMultiButton className="!bg-primary !w-full !justify-center !rounded-xl !font-bold hover:!bg-primary/90 transition-all !h-14 !text-white !uppercase !tracking-widest !text-sm" />
                    ) : (
                        <div className="h-14 w-full bg-white/5 animate-pulse rounded-xl" />
                    )}

                    <AnimatePresence mode="wait">
                        {mounted && publicKey && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                                className="space-y-6 pt-6 border-t border-white/10"
                            >
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-darker-gray/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold"
                                        placeholder="0.1"
                                    />
                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-primary font-black text-xs">SOL</span>
                                </div>

                                <Button
                                    className="w-full flex items-center justify-center gap-3 h-14 uppercase tracking-widest text-sm"
                                    disabled={status === "pending" || !amount}
                                    onClick={handleSend}
                                >
                                    {status === "pending" ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <Send size={20} />
                                    )}
                                    {t('send_button')}
                                </Button>

                                {status !== "idle" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-4 rounded-xl flex items-center gap-4 text-xs font-bold ${
                                            status === "success" ? "bg-primary/10 text-primary border border-primary/20" :
                                            status === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                                            "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        }`}
                                    >
                                        {status === "success" && <CheckCircle2 size={20} />}
                                        {status === "error" && <AlertCircle size={20} />}
                                        {status === "pending" && <Loader2 className="animate-spin" size={20} />}

                                        <div>
                                            <p className="uppercase tracking-wider">
                                                {status === "success" ? t('status_success') :
                                                 status === "error" ? t('status_error') :
                                                 t('status_pending')}
                                            </p>
                                            {status === "success" && txHash && (
                                                <a
                                                    href={`https://explorer.solana.com/tx/${txHash}${network === 'mainnet-beta' ? '' : `?cluster=${network}`}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline opacity-70 hover:opacity-100 mt-1 block uppercase tracking-tighter"
                                                >
                                                    {t('web3_view_explorer')}
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </GlassCard>

            {/* Token Inspector Card */}
            <GlassCard className="p-8 border-white/5 bg-dark-gray/40">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                        <Search size={18} className="text-primary" />
                        {t('token_inspector_title')}
                    </h3>
                </div>

                <div className="flex gap-3 mb-6">
                    <input
                        type="text"
                        placeholder={t('token_address_label')}
                        className="flex-1 bg-darker-gray/50 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all text-xs font-bold"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && inspectToken()}
                    />
                    <Button
                        onClick={inspectToken}
                        disabled={tokenLoading || !tokenAddress}
                        className="px-6 h-12 uppercase tracking-widest text-[10px]"
                    >
                        {tokenLoading ? <Loader2 className="animate-spin" size={16} /> : t('token_inspect_button')}
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {tokenError && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase"
                        >
                            {tokenError}
                        </motion.div>
                    )}

                    {tokenData && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-darker-gray/50 rounded-xl p-4 border border-white/5">
                                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{t('token_supply')}</p>
                                    <p className="text-xs font-black text-white truncate">{tokenData.supply}</p>
                                </div>
                                <div className="bg-darker-gray/50 rounded-xl p-4 border border-white/5">
                                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{t('token_security')}</p>
                                    <div className="flex items-center gap-1">
                                        {!tokenData.mintAuthority ? (
                                            <CheckCircle2 size={12} className="text-primary" />
                                        ) : (
                                            <AlertCircle size={12} className="text-amber-500" />
                                        )}
                                        <span className={`text-[8px] font-black uppercase ${!tokenData.mintAuthority ? 'text-primary' : 'text-amber-500'}`}>
                                            {!tokenData.mintAuthority ? 'Safe' : 'Risky'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
