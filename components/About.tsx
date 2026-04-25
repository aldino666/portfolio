"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard } from "./UI";
import { motion } from "framer-motion";
import { Code2, Database, Blocks } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const specialties = [
    { icon: <Code2 className="text-primary" />, title: t('spec_web_title'), desc: t('spec_web_desc') },
    { icon: <Blocks className="text-primary" />, title: t('spec_web3_title'), desc: t('spec_web3_desc') },
    { icon: <Database className="text-primary" />, title: t('spec_sap_title'), desc: t('spec_sap_desc') }
  ];

  return (
    <Section id="about" className="relative">
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] -z-10 pointer-events-none">
        <Blocks size={400} />
      </div>

      <SectionHeading subtitle={t('about_subtitle')}>
        {t('about_title')}
      </SectionHeading>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-8"
        >
          <GlassCard className="p-10 border-primary/10 bg-white/[0.02]">
            <p className="text-gray-300 text-xl leading-relaxed font-medium font-mono">
              <span className="text-primary font-black mr-2">&gt;</span>
              {t('about_text')}
              <span className="inline-block w-2 h-5 bg-primary/40 ml-2 animate-pulse align-middle" />
            </p>
          </GlassCard>

          <div className="flex gap-4">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/50 to-transparent self-center" />
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] whitespace-nowrap">
              Operational Mindset
            </p>
          </div>

          <div className="bg-primary/5 border-l-4 border-primary p-8 rounded-r-xl">
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs leading-relaxed">
              {t('about_approach')}
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-5 grid gap-4">
          {specialties.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="flex items-center gap-6 p-6 border-white/5 hover:border-primary/30 group transition-all duration-500">
                <div className="p-4 bg-white/5 group-hover:bg-primary/10 transition-all duration-500 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-sm mb-1 text-white uppercase tracking-[0.2em]">{item.title}</h3>
                  <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase">{item.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
