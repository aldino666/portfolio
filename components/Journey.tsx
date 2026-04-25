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
    <Section id="journey" className="relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-[0.02] -z-10 pointer-events-none">
        <div className="text-[200px] font-black uppercase leading-none select-none">
          TIMELINE
        </div>
      </div>

      <SectionHeading subtitle={t('journey_subtitle')}>
        {t('experience_title')}
      </SectionHeading>

      <div className="relative space-y-4 max-w-5xl">
        <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/5 md:left-8" />

        {milestones.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="relative pl-12 md:pl-20 group"
          >
            {/* HUD Marker */}
            <div className="absolute left-2.5 md:left-6.5 top-8 w-3 h-3 bg-darker-gray border border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-500 z-10" />

            <GlassCard className="p-10 border-white/5 hover:border-primary/20 bg-white/[0.01] transition-all duration-500 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-primary uppercase tracking-[0.4em]">
                    PHASE.0{milestones.length - index}
                  </p>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors glow-text-cyan">
                    {item.title}
                  </h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 border border-white/5 group-hover:border-primary/30 group-hover:text-white transition-all">
                    {item.year}
                  </span>
                </div>
              </div>

              <p className="text-gray-500 font-mono text-xs uppercase leading-relaxed max-w-3xl group-hover:text-gray-300 transition-colors">
                <span className="text-primary/40 mr-2">&gt;</span>
                {item.desc}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
