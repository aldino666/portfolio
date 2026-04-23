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
    <footer className="py-20 px-6 border-t border-white/5 bg-darker-gray">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-4 group cursor-pointer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <span className="font-black text-2xl tracking-tighter text-white uppercase group-hover:text-primary transition-colors">ALDINO</span>
        </div>

        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest text-center md:text-left">
          © {year || '...'} — {t('footer_rights')}
        </p>

        <div className="flex gap-8">
          <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-all transform hover:scale-110">
            <Github size={24} />
          </a>
          <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all transform hover:scale-110">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
