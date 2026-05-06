"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard, Button } from "./UI";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Wallet,
  LineChart,
  Database,
  ArrowUpRight,
  Cpu,
  Code2,
  ShoppingBag,
  MapPin,
  Plus,
  Minus
} from "lucide-react";

export default function Projects() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const allProjects = [
    {
      title: t('proj_smart_title'),
      desc: t('proj_smart_desc'),
      tech: ["Rust", "Anchor", "Smart Contract"],
      icon: <Cpu className="text-primary" />,
      link: "https://solscan.io/account/7EmvXDM9hJz3ULKuP9o5qxyfM2M3MT948aJnZnqzKPBG?cluster=devnet#programIdl",
      github: "https://github.com/0xAlDinO/oxalix-smart-contract"
    },
    {
      title: t('proj_chaintip_title'),
      desc: t('proj_chaintip_desc'),
      tech: ["ERC-4337", "EVM", "Account Abstraction"],
      icon: <Wallet className="text-primary" />,
      link: "https://sepolia.etherscan.io/address/0xd9877CdAABd987b81f0ebB40303FB294B0607897#writeContract",
      github: "https://github.com/aldino666/EVM-project.git"
    },
    {
      title: t('proj_dapp_title'),
      desc: t('proj_dapp_desc'),
      tech: ["Solana", "Web3.js", "Liquidity"],
      icon: <Wallet className="text-primary" />,
      link: "https://github.com/aldino666/ox-amm-pool",
      github: "https://github.com/aldino666/ox-amm-pool"
    },
    {
      title: t('proj_data_title'),
      desc: t('proj_data_desc'),
      tech: ["Rust", "Solana", "Data Analysis"],
      icon: <LineChart className="text-primary" />,
      link: "https://github.com/aldino666/Wallet-Tracking-Solana",
      github: "https://github.com/aldino666/Wallet-Tracking-Solana"
    },
    {
      title: t('proj_token_title'),
      desc: t('proj_token_desc'),
      tech: ["Solana", "TypeScript", "Automation"],
      icon: <Code2 className="text-primary" />,
      link: "https://github.com/aldino666/oxalix-token-creator",
      github: "https://github.com/aldino666/oxalix-token-creator"
    },
    {
      title: t('proj_sdk_title'),
      desc: t('proj_sdk_desc'),
      tech: ["TypeScript", "SDK", "Web3"],
      icon: <Code2 className="text-primary" />,
      link: "https://github.com/aldino666/oxalix-presales-SDK",
      github: "https://github.com/aldino666/oxalix-presales-SDK"
    },
    {
      title: t('proj_fiori_title'),
      desc: t('proj_fiori_desc'),
      tech: ["SAP Fiori", "JavaScript", "Enterprise"],
      icon: <Database className="text-primary" />,
      link: "https://github.com/aldino666/fiori-v1",
      github: "https://github.com/aldino666/fiori-v1"
    },
    {
      title: t('proj_ecommerce_title'),
      desc: t('proj_ecommerce_content'),
      tech: ["Java", "Fullstack", "Database"],
      icon: <ShoppingBag className="text-primary" />,
      link: "https://github.com/aldino666/E-Commerce-Plateforme",
      github: "https://github.com/aldino666/E-Commerce-Plateforme"
    },
    {
      title: t('proj_webmapping_title'),
      desc: t('proj_webmapping_desc'),
      tech: ["PHP", "GIS", "Data Viz"],
      icon: <MapPin className="text-primary" />,
      link: "https://github.com/aldino666/neighborhood-analysis-webmapping",
      github: "https://github.com/aldino666/neighborhood-analysis-webmapping"
    }
  ];

  const visibleProjects = showAll ? allProjects : allProjects.slice(0, 4);

  return (
    <Section id="projects" className="relative">
      <SectionHeading subtitle={t('projects_subtitle')}>
        {t('projects_title')}
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              layout
            >
              <GlassCard className="flex flex-col h-full group p-0 overflow-hidden bg-white/[0.01] border-white/5 hover:border-primary/30 transition-all duration-500 relative">
                <div className="absolute top-0 right-0 p-3 flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-primary hover:text-black transition-all">
                      <Github size={14} />
                    </a>
                  )}
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-primary hover:text-black transition-all">
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                <div className="p-8 pt-12 flex-grow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                      {project.icon}
                    </div>
                    <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-primary/20" />
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">
                      PRJ.00{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors glow-text-cyan">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 font-mono text-[11px] leading-relaxed mb-8 uppercase line-clamp-3">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[8px] uppercase tracking-[0.2em] font-black px-2 py-1 bg-white/5 border border-white/5 text-gray-400 group-hover:border-primary/20 group-hover:text-white transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-[0_0_10px_rgba(6,182,212,1)] group-hover:w-full transition-all duration-700" />
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        className="mt-12 flex justify-center"
      >
        <Button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-3 px-8 !rounded-none !bg-white/5 border border-white/10 hover:!bg-primary hover:!text-black !text-[10px] font-black uppercase tracking-[0.3em] transition-all h-12"
        >
          {showAll ? (
            <>
              <Minus size={20} />
              {t('projects_view_less')}
            </>
          ) : (
            <>
              <Plus size={20} />
              {t('projects_view_more')}
            </>
          )}
        </Button>
      </motion.div>
    </Section>
  );
}
