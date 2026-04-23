"use client";

import { useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard, Button } from "./UI";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Info, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface TokenData {
  address: string;
  supply: string;
  decimals: number;
  mintAuthority: string | null;
  freezeAuthority: string | null;
}

export default function TokenInspector() {
  const { t } = useLanguage();
  const { connection } = useConnection();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  const inspectToken = async () => {
    if (!address) return;

    setLoading(true);
    setError(null);
    setTokenData(null);

    try {
      const mintPubkey = new PublicKey(address);
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
      setError(t('token_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="token-inspector">
      <SectionHeading subtitle={t('token_inspector_subtitle')}>
        {t('token_inspector_title')}
      </SectionHeading>

      <GlassCard className="max-w-4xl mx-auto bg-dark-gray/30 p-10">
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
            <input
              type="text"
              placeholder={t('token_address_label')}
              className="w-full bg-darker-gray/50 border border-white/10 rounded-xl py-4 pl-14 pr-6 focus:outline-none focus:border-primary/50 transition-all font-bold"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && inspectToken()}
            />
          </div>
          <Button
            onClick={inspectToken}
            disabled={loading || !address}
            className="md:w-60 h-14 uppercase tracking-widest text-sm"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : t('token_inspect_button')}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-10 font-bold uppercase tracking-tight text-sm"
            >
              <AlertCircle size={24} />
              <p>{error}</p>
            </motion.div>
          )}

          {tokenData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest">
                    <Info size={18} />
                    {t('token_metadata')}
                  </div>
                  <div className="bg-darker-gray/50 rounded-2xl p-6 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{t('token_supply')}</span>
                      <span className="font-black text-white">{tokenData.supply}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{t('token_decimals')}</span>
                      <span className="font-black text-white">{tokenData.decimals}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest">
                    <Shield size={18} />
                    {t('token_security')}
                  </div>
                  <div className="bg-darker-gray/50 rounded-2xl p-6 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{t('token_mint_authority')}</span>
                      {tokenData.mintAuthority ? (
                        <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <AlertCircle size={12} /> {t('token_status_active')}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={12} /> {t('token_status_revoked')}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{t('token_freeze_authority')}</span>
                      {tokenData.freezeAuthority ? (
                        <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <AlertCircle size={12} /> {t('token_status_active')}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={12} /> {t('token_status_revoked')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">On-Chain Identifier</span>
                </div>
                <p className="text-[11px] text-gray-400 font-bold break-all opacity-60">
                  {tokenData.address}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </Section>
  );
}
