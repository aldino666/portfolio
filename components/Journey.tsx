"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading } from "./UI";
import { motion } from "framer-motion";

export default function Journey() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: "Current",
      title: t('journey_current_title'),
      desc: t('journey_current_desc'),
      type: "focus"
    },
    {
      year: "2023 - 2024",
      title: t('journey_intern_title'),
      desc: t('journey_intern_desc'),
      type: "work"
    },
    {
      year: "2022",
      title: t('journey_sap_title'),
      desc: t('journey_sap_desc'),
      type: "education"
    },
    {
      year: "Early Days",
      title: t('journey_early_title'),
      desc: t('journey_early_desc'),
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
