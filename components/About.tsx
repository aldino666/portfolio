"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard } from "./UI";
import { motion } from "framer-motion";
import { Code2, Database, Blocks } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const specialties = [
    { icon: <Code2 className="text-emerald-400" />, title: t('spec_web_title'), desc: t('spec_web_desc') },
    { icon: <Blocks className="text-emerald-400" />, title: t('spec_web3_title'), desc: t('spec_web3_desc') },
    { icon: <Database className="text-emerald-400" />, title: t('spec_sap_title'), desc: t('spec_sap_desc') }
  ];

  return (
    <Section id="about">
      <SectionHeading subtitle={t('about_subtitle')}>
        {t('about_title')}
      </SectionHeading>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            {t('about_text')}
          </p>
          <p className="text-gray-400">
            {t('about_approach')}
          </p>
        </motion.div>

        <div className="grid gap-4">
          {specialties.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="flex items-start gap-4 p-5 group hover:border-emerald-500/30">
                <div className="p-3 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
