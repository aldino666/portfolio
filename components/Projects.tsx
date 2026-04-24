"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard } from "./UI";
import { motion } from "framer-motion";
import { ExternalLink, Github, Wallet, LineChart, Database, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('proj_dapp_title'),
      desc: t('proj_dapp_desc'),
      tech: ["Next.js", "Solana/Web3.js", "Framer Motion", "Tailwind"],
      icon: <Wallet className="text-primary" />,
      link: "https://github.com/aldino666/ox-amm-pool",
      github: "https://github.com/aldino666/ox-amm-pool"
    },
    {
      title: t('proj_smart_title'),
      desc: t('proj_smart_desc'),
      tech: ["Rust", "Anchor", "Solana CLI"],
      icon: <ExternalLink className="text-primary" />,
      link: "https://github.com/aldino666/oxalix-smart-contract",
      github: "https://github.com/aldino666/oxalix-smart-contract"
    },
    {
      title: t('proj_data_title'),
      desc: t('proj_data_desc'),
      tech: ["Rust", "Solana/Web3.js", "CLI"],
      icon: <LineChart className="text-primary" />,
      link: "https://github.com/aldino666/Wallet-Tracking-Solana",
      github: "https://github.com/aldino666/Wallet-Tracking-Solana"
    },
    {
      title: t('proj_sap_title'),
      desc: t('proj_sap_desc'),
      tech: ["SAP UI5", "OData V4", "ABAP RAP", "S/4HANA"],
      icon: <Database className="text-primary" />,
      link: "#"
    }
  ];

  return (
    <Section id="projects">
      <SectionHeading subtitle={t('projects_subtitle')}>
        {t('projects_title')}
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <GlassCard className="flex flex-col h-full group p-0 overflow-hidden bg-dark-gray/30">
              <div className="p-8 pb-0 flex justify-between items-start">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-1">
                  {project.icon}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a href={project.github} className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                      <Github size={22} />
                    </a>
                  )}
                  <a href={project.link} className="p-2 rounded-full text-gray-500 hover:text-primary hover:bg-primary/5 transition-all">
                    <ArrowUpRight size={22} />
                  </a>
                </div>
              </div>

              <div className="p-8 pt-6 flex-grow">
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-medium leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] uppercase tracking-widest font-black px-3 py-1.5 rounded-lg bg-darker-gray border border-white/5 text-gray-500 group-hover:border-primary/20 group-hover:text-gray-300 transition-all"
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
      </div>
    </Section>
  );
}
