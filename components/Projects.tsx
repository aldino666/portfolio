"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard } from "./UI";
import { motion } from "framer-motion";
import { ExternalLink, Github, Wallet, LineChart, Database } from "lucide-react";

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('proj_dapp_title'),
      desc: t('proj_dapp_desc'),
      tech: ["Next.js", "Solana/Web3.js", "Framer Motion", "Tailwind"],
      icon: <Wallet className="text-emerald-400" />,
      link: "#",
      github: "#"
    },
    {
      title: t('proj_smart_title'),
      desc: t('proj_smart_desc'),
      tech: ["Rust", "Anchor", "Solana CLI"],
      icon: <ExternalLink className="text-blue-400" />,
      link: "#",
      github: "#"
    },
    {
      title: t('proj_data_title'),
      desc: t('proj_data_desc'),
      tech: ["React", "Node.js", "PostgreSQL", "Chart.js"],
      icon: <LineChart className="text-purple-400" />,
      link: "#",
      github: "#"
    },
    {
      title: t('proj_sap_title'),
      desc: t('proj_sap_desc'),
      tech: ["SAP UI5", "OData", "ABAP"],
      icon: <Database className="text-blue-600" />,
      link: "#"
    }
  ];

  return (
    <Section id="projects">
      <SectionHeading subtitle={t('projects_subtitle')}>
        {t('projects_title')}
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="flex flex-col h-full group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                  {project.icon}
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} className="text-gray-500 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  <a href={project.link} className="text-gray-500 hover:text-emerald-400 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-6 flex-grow">{project.desc}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
