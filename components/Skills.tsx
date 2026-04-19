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
      icon: <Globe className="text-blue-400" />,
      skills: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "REST APIs"]
    },
    {
      title: t('skills_web3'),
      icon: <Cpu className="text-purple-400" />,
      skills: ["Smart Contracts", "Rust / Solana", "Wallet Integration", "DeFi / DEX", "Ethers.js"]
    },
    {
      title: t('skills_sap'),
      icon: <Database className="text-blue-600" />,
      skills: ["SAP ERP Basics", "ABAP (Learning)", "Functional Modules", "Business Processes", "Project Management"]
    },
    {
      title: t('skills_tools'),
      icon: <Settings className="text-gray-400" />,
      skills: ["Git / GitHub", "Docker", "PostgreSQL", "Linux", "Vercel / AWS"]
    }
  ];

  return (
    <Section id="skills">
      <SectionHeading subtitle={t('skills_subtitle')}>
        {t('skills_title')}
      </SectionHeading>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <GlassCard className="h-full border-t-2 border-t-transparent hover:border-t-emerald-500/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/5">
                  {group.icon}
                </div>
                <h3 className="font-bold text-lg">{group.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
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
