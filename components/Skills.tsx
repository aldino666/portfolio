"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard } from "./UI";
import { motion } from "framer-motion";
import {
  Globe,
  Cpu,
  Database,
  Settings
} from "lucide-react";

export default function Skills() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      title: t('skills_web'),
      icon: <Globe className="text-primary" />,
      skills: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "REST APIs"]
    },
    {
      title: t('skills_web3'),
      icon: <Cpu className="text-primary" />,
      skills: ["Smart Contracts", "Rust / Solana", "Wallet Integration", "DeFi / DEX", "Ethers.js"]
    },
    {
      title: t('skills_sap'),
      icon: <Database className="text-primary" />,
      skills: ["SAP ERP Basics", "ABAP (Learning)", "Functional Modules", "Business Processes", "Project Management"]
    },
    {
      title: t('skills_tools'),
      icon: <Settings className="text-primary" />,
      skills: ["Git / GitHub", "Docker", "PostgreSQL", "Linux", "Vercel / AWS"]
    }
  ];

  return (
    <Section id="skills">
      <SectionHeading subtitle={t('skills_subtitle')}>
        {t('skills_title')}
      </SectionHeading>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <GlassCard className="h-full group">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-all duration-300">
                  {group.icon}
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest text-white">{group.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-1.5 rounded-lg bg-darker-gray border border-white/5 text-[10px] font-bold uppercase tracking-tighter text-gray-400 group-hover:text-white group-hover:border-primary/30 transition-all"
                  >
                    {skill}
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
