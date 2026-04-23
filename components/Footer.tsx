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
    <footer className="py-12 px-6 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={30} height={30} className="rounded-sm" />
          <span className="font-bold text-lg tracking-widest text-emerald-400">Aldino</span>
        </div>

        <p className="text-gray-500 text-sm">
          © {year || '...'} — {t('footer_rights')}
        </p>

        <div className="flex gap-6 text-gray-500">
          <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
            <Github size={20} />
          </a>
          <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
