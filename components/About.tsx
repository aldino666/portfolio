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
    <Section id="about">
      <SectionHeading subtitle={t('about_subtitle')}>
        {t('about_title')}
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p className="text-gray-300 text-xl leading-relaxed font-medium">
            {t('about_text')}
          </p>
          <div className="p-1 bg-gradient-to-r from-primary/30 to-transparent rounded-lg">
            <div className="bg-darker-gray p-6 rounded-lg">
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">
                {t('about_approach')}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {specialties.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="flex items-center gap-6 p-6 group">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-primary/10 transition-all duration-500 transform group-hover:rotate-6">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1 text-white uppercase tracking-tight">{item.title}</h3>
                  <p className="text-sm text-gray-400 font-medium leading-snug">{item.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
