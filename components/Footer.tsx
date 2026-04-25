"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 scanline opacity-5" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="p-2 bg-white/5 group-hover:bg-primary transition-colors duration-500">
            <Image
              src="/logo.png"
              alt="Logo"
              width={20}
              height={20}
            />
          </div>
          <span className="font-black text-lg tracking-[0.2em] text-white uppercase group-hover:text-primary transition-colors">ALDINO</span>
        </div>

        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
            System Status: Operational
          </p>
          <p className="text-gray-500 text-[9px] font-mono uppercase">
            © {year || '...'} — {t('footer_rights')}
          </p>
        </div>

        <div className="flex gap-4">
          <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-primary hover:text-black transition-all">
            <Github size={16} />
          </a>
          <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-primary hover:text-black transition-all">
            <Linkedin size={16} />
          </a>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </footer>
  );
}
