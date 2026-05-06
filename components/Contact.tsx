"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard, Button } from "./UI";
import { motion } from "framer-motion";
import { Github, Linkedin, Wallet, Loader2, Copy, Check, Send, Cpu, Database } from "lucide-react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const SOLANA_ADDRESS = "5qsHwA8wzwXmv6fQoM1TB23hdr6wqf4kDE5B4JjttoYq";

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const responseTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_RESPONSE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // 1. Send the initial message to the owner
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      // 2. Send the automated response to the visitor
      if (responseTemplateId) {
        try {
          await emailjs.send(
            serviceId,
            responseTemplateId,
            {
              name: formData.name,
              email: formData.email,
              greeting: t('email_response_greeting'),
              thanks: t('email_response_thanks'),
              message: t('email_response_message'),
              crd: t('email_response_crd'),
            },
            publicKey
          );
        } catch (autoResponseError) {
          console.error("Auto-response failed:", autoResponseError);
          // We don't block the success toast if only the auto-response fails
        }
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SOLANA_ADDRESS);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy address.");
    }
  };

  return (
    <Section id="contact" className="relative">
      <SectionHeading subtitle={t('contact_subtitle')}>
        {t('contact_title')}
      </SectionHeading>

      <div className="grid lg:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <GlassCard className="p-10 border-white/5 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Transmission Interface</h3>
              <div className="text-[8px] font-mono text-primary/50 flex gap-2">
                <span>SECURE</span>
                <span>v2.1</span>
              </div>
            </div>

            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t('contact_name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="terminal-input w-full"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t('contact_email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="terminal-input w-full"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t('contact_message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="terminal-input w-full resize-none"
                  placeholder="Input packet content here..."
                  required
                ></textarea>
              </div>
              <Button
                className="w-full !rounded-none h-14 !bg-primary !text-black uppercase tracking-[0.4em] text-[10px] font-black shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin mx-auto" />
                ) : (
                  <>
                    <Send size={16} className="inline mr-2" />
                    {t('contact_send')}
                  </>
                )}
              </Button>
            </form>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="grid gap-4">
            <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="group">
              <GlassCard className="p-6 flex items-center gap-6 border-white/5 hover:border-primary/30 transition-all duration-500">
                <div className="p-3 bg-white/5 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <Github size={20} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">GitHub Endpoint</p>
                  <p className="text-sm font-black uppercase tracking-wider text-white">github/0xAlDInO</p>
                </div>
              </GlassCard>
            </a>
            <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="group">
              <GlassCard className="p-6 flex items-center gap-6 border-white/5 hover:border-primary/30 transition-all duration-500">
                <div className="p-3 bg-white/5 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">LinkedIn Sync</p>
                  <p className="text-sm font-black uppercase tracking-wider text-white">linkedin/ramanantsirahonana</p>
                </div>
              </GlassCard>
            </a>
          </div>

          <div className="p-6 border-white/5 hover:border-primary/30 transition-all duration-500 cursor-pointer group glass-card" onClick={handleCopy}>
              <div className="flex items-center gap-6 mb-4">
                <div className="p-3 bg-white/5 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <Wallet size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Web3 Identity Marker</p>
                  <p className="text-[10px] font-mono break-all text-gray-400 group-hover:text-white transition-colors">{SOLANA_ADDRESS}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary">
                <span>{copied ? 'Copied' : 'Click to Copy Address'}</span>
                {copied ? <Check size={10} /> : <Copy size={10} />}
              </div>
          </div>

          <div className="grid gap-4">
            <GlassCard className="p-8 border-primary/20 bg-primary/5 glow-border-cyan relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-4">Strategic Focus</p>
                <p className="text-sm text-white font-black uppercase tracking-widest leading-relaxed">
                  {t('contact_blockchain_expert')}
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu size={100} />
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/10 bg-white/5 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Enterprise Solutions</p>
                <p className="text-sm text-white font-black uppercase tracking-widest leading-relaxed">
                  {t('contact_sap_consultant')}
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Database size={100} />
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
