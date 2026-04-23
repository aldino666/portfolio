"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading } from "./UI";
import { motion } from "framer-motion";

export default function Journey() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: "2025 - 2026",
      title: t('journey_sap_work_title'),
      desc: t('journey_sap_work_desc'),
      type: "work"
    },
    {
      year: "2024",
      title: t('journey_sap_exp_title'),
      desc: t('journey_sap_exp_desc'),
      type: "focus"
    },
    {
      year: "2023 - Present",
      title: t('journey_web3_title'),
      desc: t('journey_web3_desc'),
      type: "focus"
    },
    {
      year: "2022",
      title: t('journey_nomerikia_title'),
      desc: t('journey_nomerikia_desc'),
      type: "work"
    },
    {
      year: "2021",
      title: t('journey_health_title'),
      desc: t('journey_health_desc'),
      type: "internship"
    },
    {
      year: "2019 - 2024",
      title: t('journey_edu_title'),
      desc: t('journey_edu_desc'),
      type: "education"
    }
  ];

  return (
    <Section>
      <SectionHeading subtitle={t('journey_subtitle')}>
        {t('experience_title')}
      </SectionHeading>

      <div className="relative border-l-2 border-emerald-500/20 ml-4 md:ml-8 space-y-12 pb-8">
        {milestones.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-10"
          >
            {/* Dot */}
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <span className="text-emerald-400 font-mono text-sm font-bold">{item.year}</span>
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>

            <p className="text-gray-400 max-w-2xl">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
