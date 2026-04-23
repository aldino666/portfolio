"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import { Button, GlassCard } from "./UI";
import { Github, Linkedin, Wallet, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const RECEIVER_WALLET = "5qsHwA8wzwXmv6fQoM1TB23hdr6wqf4kDE5B4JjttoYq";

export default function Hero() {
    const { t } = useLanguage();
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
    const [txHash, setTxHash] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {t('available')}
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="gradient-text">Aldino</span>
            <br />
            <span className="text-white text-3xl md:text-5xl">{t('hero_title')}</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button onClick={() => document.getElementById('projects')?.scrollIntoView()}>
              {t('hero_cta_projects')}
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
              {t('hero_cta_contact')}
            </Button>
          </div>

          <div className="mt-8 flex gap-6">
             <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Github size={24} />
             </a>
             <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Linkedin size={24} />
             </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
            <GlassCard className="bg-white/5 border-emerald-500/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`w-2 h-2 rounded-full ${mounted && publicKey ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {mounted && publicKey ? t('wallet_connected') : t('wallet_not_connected')}
                    </span>
                </div>

                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Wallet className="text-emerald-400" size={20} />
                    {t('web3_support_title')}
                </h3>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {t('web3_support_desc')}
                </p>

                <div className="space-y-4">
                    {mounted ? (
                        <WalletMultiButton className="!bg-emerald-500 !w-full !justify-center !rounded-xl !font-bold hover:!bg-emerald-600 transition-all !h-12" />
                    ) : (
                        <div className="h-12 w-full bg-white/5 animate-pulse rounded-xl" />
                    )}

                    <AnimatePresence mode="wait">
                        {mounted && publicKey && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="space-y-4 pt-4 border-t border-white/10"
                            >
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors text-sm"
                                        placeholder="0.1"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-xs">SOL</span>
                                </div>

                                <Button
                                    className="w-full flex items-center justify-center gap-2 h-12"
                                    disabled={status === "pending" || !amount}
                                    onClick={handleSend}
                                >
                                    {status === "pending" ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                    {t('send_button')}
                                </Button>

                                {status !== "idle" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-3 rounded-xl flex items-center gap-3 text-xs ${
                                            status === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                            status === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                                            "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        }`}
                                    >
                                        {status === "success" && <CheckCircle2 size={16} />}
                                        {status === "error" && <AlertCircle size={16} />}
                                        {status === "pending" && <Loader2 className="animate-spin" size={16} />}

                                        <div>
                                            <p className="font-bold">
                                                {status === "success" ? t('status_success') :
                                                 status === "error" ? t('status_error') :
                                                 t('status_pending')}
                                            </p>
                                            {status === "success" && txHash && (
                                                <a
                                                    href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline opacity-70 hover:opacity-100 mt-1 block"
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
        </motion.div>
      </div>
    </section>
  );
}
