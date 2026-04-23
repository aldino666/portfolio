"use client";

import { useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard, Button } from "./UI";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Info, AlertCircle, CheckCircle2 } from "lucide-react";

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

      <GlassCard className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder={t('token_address_label')}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && inspectToken()}
            />
          </div>
          <Button
            onClick={inspectToken}
            disabled={loading || !address}
            className="md:w-48"
          >
            {loading ? t('token_loading') : t('token_inspect_button')}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6"
            >
              <AlertCircle size={20} />
              <p>{error}</p>
            </motion.div>
          )}

          {tokenData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-wider">
                    <Info size={16} />
                    {t('token_metadata')}
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t('token_supply')}</span>
                      <span className="font-mono">{tokenData.supply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t('token_decimals')}</span>
                      <span>{tokenData.decimals}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-wider">
                    <Shield size={16} />
                    {t('token_security')}
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">{t('token_mint_authority')}</span>
                      {tokenData.mintAuthority ? (
                        <span className="text-amber-400 flex items-center gap-1 text-sm">
                          <AlertCircle size={14} /> {t('token_status_active')}
                        </span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1 text-sm">
                          <CheckCircle2 size={14} /> {t('token_status_revoked')}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">{t('token_freeze_authority')}</span>
                      {tokenData.freezeAuthority ? (
                        <span className="text-amber-400 flex items-center gap-1 text-sm">
                          <AlertCircle size={14} /> {t('token_status_active')}
                        </span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1 text-sm">
                          <CheckCircle2 size={14} /> {t('token_status_revoked')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-mono break-all">
                  MINT: {tokenData.address}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </Section>
  );
}
