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
        { name: "ERC 4337", status: t('skills_3months') },
        { name: "Solidity", status: t('skills_learning') },
        { name: "Hardhat", status: t('skills_learning') },
        { name: "Ethers.js", status: t('skills_3months') }
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
    <Section id="skills">
      <SectionHeading subtitle={t('skills_subtitle')}>
        {t('skills_title')}
      </SectionHeading>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <GlassCard className="h-full group border-white/5 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-all duration-300">
                  {group.icon}
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest text-white">{group.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-darker-gray border border-white/5 group-hover:border-primary/10 transition-all"
                  >
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    {skill.status && (
                      <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-black uppercase tracking-tighter">
                        {skill.status}
                      </span>
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
