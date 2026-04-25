"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard } from "./UI";
import { motion } from "framer-motion";
import {
  Globe,
  Cpu,
  Database,
  Code2,
  Box
} from "lucide-react";

export default function Skills() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      title: t('skills_solana'),
      icon: <Cpu className="text-primary" />,
      skills: [
        { name: "Solana", status: null },
        { name: "Anchor (Rust)", status: null },
        { name: "Smart Contracts", status: null },
        { name: "Wallet Tracking", status: null }
      ]
    },
    {
      title: t('skills_ethereum'),
      icon: <Box className="text-primary" />,
      skills: [
        { name: "ERC 4337", status: t('skills_started_january') },
        { name: "Solidity", status: t('skills_learning') },
        { name: "Hardhat", status: t('skills_learning') },
        { name: "Ethers.js", status: t('skills_started_january') }
      ]
    },
    {
      title: t('skills_frontend'),
      icon: <Globe className="text-primary" />,
      skills: [
        { name: "TypeScript", status: null },
        { name: "Next.js / React", status: null },
        { name: "Tailwind CSS", status: null },
        { name: "UI/UX Design", status: null }
      ]
    },
    {
      title: t('skills_backend'),
      icon: <Code2 className="text-primary" />,
      skills: [
        { name: "Rust", status: null },
        { name: "Node.js", status: null },
        { name: "JavaScript", status: null },
        { name: "Python", status: t('skills_learning') }
      ]
    },
    {
      title: t('skills_sap'),
      icon: <Database className="text-primary" />,
      skills: [
        { name: "SAP Fiori", status: null },
        { name: "SAP ERP", status: null },
        { name: "OData / RAP", status: null },
        { name: "Integration", status: null }
      ]
    }
  ];

  return (
    <Section id="skills" className="relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full command-grid opacity-20 -z-10" />

      <SectionHeading subtitle={t('skills_subtitle')}>
        {t('skills_title')}
      </SectionHeading>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <GlassCard className="h-full group border-white/5 hover:border-primary/20 transition-all duration-500 bg-white/[0.01]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="text-primary opacity-50 group-hover:opacity-100 transition-opacity">
                    {group.icon}
                  </div>
                  <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-white/80 group-hover:text-primary transition-colors">
                    {group.title}
                  </h3>
                </div>
                <div className="text-[8px] font-black text-gray-700 uppercase tracking-widest">
                  SYS.SKILL.{groupIndex + 1}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {group.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center justify-between p-3 rounded-none bg-black/20 border-l border-white/5 group-hover:border-primary/30 transition-all group/item"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/item:text-white transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 bg-white/10 group-hover/item:bg-primary transition-colors" />
                      {skill.name}
                    </span>
                    {skill.status ? (
                      <span className="text-[7px] px-2 py-0.5 rounded-none bg-primary/10 text-primary border border-primary/20 font-black uppercase tracking-tighter">
                        {skill.status}
                      </span>
                    ) : (
                      <span className="text-[7px] font-black text-gray-700 uppercase">Deployed</span>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
