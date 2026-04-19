"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard, Button } from "./UI";
import { Github, Linkedin, Wallet } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact">
      <SectionHeading subtitle={t('contact_subtitle')}>
        {t('contact_title')}
      </SectionHeading>

      <div className="grid lg:grid-cols-2 gap-12">
        <GlassCard>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">{t('contact_name')}</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">{t('contact_email')}</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">{t('contact_message')}</label>
              <textarea
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            <Button className="w-full">
              {t('contact_send')}
            </Button>
          </form>
        </GlassCard>

        <div className="flex flex-col justify-between py-4">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">{t('contact_connect')}</h3>
            <div className="grid gap-6">
              <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-emerald-500/10 text-gray-400 group-hover:text-emerald-400 transition-all">
                  <Github size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">GitHub</p>
                  <p className="font-bold">aldino666</p>
                </div>
              </a>
              <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-blue-500/10 text-gray-400 group-hover:text-blue-400 transition-all">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">LinkedIn</p>
                  <p className="font-bold">ramanantsirahonana</p>
                </div>
              </a>
              <div className="flex items-center gap-4 group">
                <div className="p-4 rounded-2xl bg-white/5 text-gray-400">
                  <Wallet size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Web3 Identity</p>
                  <p className="font-mono text-sm break-all">5qsHwA...ttoYq</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-linear-to-br from-emerald-500/10 to-transparent border border-emerald-500/10">
            <p className="text-emerald-400 font-bold mb-1">{t('contact_sap_expert')}</p>
            <p className="text-sm text-gray-400">{t('sap_future')}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
