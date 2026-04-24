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
      title: t('proj_dapp_title'),
      desc: t('proj_dapp_desc'),
      tech: ["Solana", "Web3.js", "Liquidity"],
      icon: <Wallet className="text-primary" />,
      link: "https://github.com/aldino666/ox-amm-pool",
      github: "https://github.com/aldino666/ox-amm-pool"
    },
    {
      title: t('proj_smart_title'),
      desc: t('proj_smart_desc'),
      tech: ["Rust", "Anchor", "Smart Contract"],
      icon: <Cpu className="text-primary" />,
      link: "https://github.com/aldino666/oxalix-smart-contract",
      github: "https://github.com/aldino666/oxalix-smart-contract"
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
      desc: t('proj_ecommerce_desc'),
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
    <Section id="projects">
      <SectionHeading subtitle={t('projects_subtitle')}>
        {t('projects_title')}
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-10">
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
              <GlassCard className="flex flex-col h-full group p-0 overflow-hidden bg-dark-gray/30 border-white/5 hover:border-primary/20 transition-colors">
                <div className="p-8 pb-0 flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-1 shadow-lg">
                    {project.icon}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                        <Github size={22} />
                      </a>
                    )}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-gray-500 hover:text-primary hover:bg-primary/5 transition-all">
                      <ArrowUpRight size={22} />
                    </a>
                  </div>
                </div>

                <div className="p-8 pt-6 flex-grow">
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity text-sm line-clamp-2">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[9px] uppercase tracking-widest font-black px-3 py-1.5 rounded-lg bg-darker-gray border border-white/5 text-gray-500 group-hover:border-primary/30 group-hover:text-gray-200 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-1.5 w-0 bg-primary group-hover:w-full transition-all duration-700" />
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        className="mt-16 flex justify-center"
      >
        <Button
          variant="secondary"
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-3 px-10 h-14"
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
