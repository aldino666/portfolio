"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard } from "./UI";
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
    <Section id="journey">
      <SectionHeading subtitle={t('journey_subtitle')}>
        {t('experience_title')}
      </SectionHeading>

      <div className="relative ml-4 md:ml-12 border-l-4 border-white/5 space-y-16 py-8">
        {milestones.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative pl-12 group"
          >
            {/* Timeline Marker */}
            <div className="absolute left-[-14px] top-0 w-6 h-6 rounded-lg bg-darker-gray border-4 border-white/10 group-hover:border-primary transition-all duration-300 group-hover:rotate-45" />

            <GlassCard className="p-8 border-transparent hover:border-primary/20 bg-dark-gray/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <span className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-black text-xs uppercase tracking-widest border border-primary/20 whitespace-nowrap">
                  {item.year}
                </span>
              </div>

              <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-4xl group-hover:text-gray-300 transition-colors">
                {item.desc}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
