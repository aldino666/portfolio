"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-lg border-b border-white/10"
    >
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-sm" />
        <span className="font-bold text-xl hidden sm:block">Portfolio</span>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
          <Link href="#projects" className="hover:text-emerald-400 transition-colors">{t('nav_projects')}</Link>
          <Link href="#about" className="hover:text-emerald-400 transition-colors">{t('nav_about')}</Link>
          <Link href="#skills" className="hover:text-emerald-400 transition-colors">{t('nav_skills')}</Link>
          <Link href="#contact" className="hover:text-emerald-400 transition-colors">{t('nav_contact')}</Link>
        </div>

        <button
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-semibold"
        >
          <Globe size={14} className="text-emerald-400" />
          {language.toUpperCase()}
        </button>
      </div>
    </motion.nav>
  );
}
