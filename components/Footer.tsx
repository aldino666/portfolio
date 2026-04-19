"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={30} height={30} className="rounded-sm" />
          <span className="font-bold text-lg">Portfolio</span>
        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} — {t('footer_rights')}
        </p>

        <div className="flex gap-6 text-gray-500 text-sm">
          <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
          <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
