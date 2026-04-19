"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "./UI";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/20"
            />
            <div className="absolute inset-4 rounded-full border border-emerald-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
               <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={300}
                className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]"
               />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
