"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard, Button } from "./UI";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const RECEIVER_WALLET = "5qsHwA8wzwXmv6fQoM1TB23hdr6wqf4kDE5B4JjttoYq";

export default function Web3Interaction() {
    const { t } = useLanguage();
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
    const [txHash, setTxHash] = useState("");

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
        <Section id="web3">
            <SectionHeading subtitle={t('web3_interaction_subtitle')}>
                {t('web3_interaction_title')}
            </SectionHeading>

            <div className="max-w-4xl mx-auto">
                <GlassCard className="relative overflow-hidden bg-linear-to-br from-emerald-500/5 to-purple-500/5 border-emerald-500/20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-3 h-3 rounded-full ${publicKey ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                <span className="text-sm font-medium text-gray-400">
                                    {publicKey ? t('wallet_connected') : t('wallet_not_connected')}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Wallet className="text-emerald-400" />
                                {t('web3_support_title')}
                            </h3>

                            <p className="text-gray-400 mb-8">
                                {t('web3_support_desc')}
                            </p>

                            <WalletMultiButton className="!bg-emerald-500 !rounded-full !font-bold hover:!bg-emerald-600 transition-all" />
                        </div>

                        <AnimatePresence mode="wait">
                            {publicKey ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">{t('amount_placeholder')}</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                                placeholder="0.1"
                                                min="0.001"
                                                step="0.01"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">SOL</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full flex items-center justify-center gap-2"
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
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`p-4 rounded-xl flex items-center gap-3 ${
                                                status === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                                status === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                                                "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                            }`}
                                        >
                                            {status === "success" && <CheckCircle2 size={20} />}
                                            {status === "error" && <AlertCircle size={20} />}
                                            {status === "pending" && <Loader2 className="animate-spin" size={20} />}

                                            <div className="text-xs">
                                                <p className="font-bold">
                                                    {status === "success" ? t('status_success') :
                                                     status === "error" ? t('status_error') :
                                                     t('status_pending')}
                                                </p>
                                                {txHash && (
                                                    <a
                                                        href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline opacity-70 hover:opacity-100"
                                                    >
                                                        {t('web3_view_explorer')}
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <div className="h-48 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
                                    <p className="text-gray-500 text-sm">{t('web3_connect_prompt')}</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </GlassCard>
            </div>
        </Section>
    );
}
