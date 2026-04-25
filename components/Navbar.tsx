"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSolanaNetwork } from "@/context/SolanaContext";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, X, ChevronDown, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { network, setNetwork } = useSolanaNetwork();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_projects'), href: "#projects" },
    { name: t('nav_about'), href: "#about" },
    { name: t('nav_skills'), href: "#skills" },
    { name: t('nav_contact'), href: "#contact" },
  ];

  // Suppress unused warning

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? "bg-darker-gray/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent"
      }`}
    >
      <div className="absolute inset-0 scanline opacity-20" />
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-bold text-2xl tracking-tighter text-white uppercase">
              ALDINO
            </span>
          </Link>

          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1 gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
             <span className="text-[10px] font-black tracking-[0.2em] flex items-center">
                <span className="text-white uppercase">ALDINO-</span>
                <span className="text-primary uppercase">{network === 'mainnet-beta' ? 'MAINNET' : network}</span>
             </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="nav-link text-sm font-bold uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* RPC Selector */}
            <div className="relative">
              <button
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all text-xs font-bold uppercase tracking-wider"
              >
                <Cpu size={14} className="text-primary" />
                {network === 'mainnet-beta' ? 'MAINNET' : network}
                <ChevronDown size={14} className={`transition-transform duration-300 ${isNetworkDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isNetworkDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-dark-gray border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 p-2"
                  >
                    {[
                      { label: 'Mainnet', value: WalletAdapterNetwork.Mainnet },
                      { label: 'Devnet', value: WalletAdapterNetwork.Devnet },
                      { label: 'Testnet', value: WalletAdapterNetwork.Testnet }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setNetwork(opt.value);
                          setIsNetworkDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          network === opt.value
                          ? 'bg-primary text-white'
                          : 'hover:bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all text-xs font-bold"
            >
              <Globe size={14} className="text-primary" />
              {language.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="p-2 rounded-full bg-white/5 border border-white/10"
          >
            <Globe size={18} className="text-primary" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-gray border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Network</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'MN', value: WalletAdapterNetwork.Mainnet },
                    { label: 'DV', value: WalletAdapterNetwork.Devnet },
                    { label: 'TS', value: WalletAdapterNetwork.Testnet }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setNetwork(opt.value);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        network === opt.value
                        ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-white/5 border-white/10 text-gray-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
