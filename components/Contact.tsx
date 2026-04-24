"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Section, SectionHeading, GlassCard, Button } from "./UI";
import { Github, Linkedin, Wallet, Loader2, Copy, Check, Send } from "lucide-react";
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

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

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
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

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
    <Section id="contact">
      <SectionHeading subtitle={t('contact_subtitle')}>
        {t('contact_title')}
      </SectionHeading>

      <div className="grid lg:grid-cols-2 gap-16">
        <GlassCard className="bg-dark-gray/30 p-10 border-white/5">
          <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('contact_name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-darker-gray/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all font-bold"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('contact_email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-darker-gray/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all font-bold"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('contact_message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-darker-gray/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all font-bold resize-none"
                  placeholder="How can I help you?"
                  required
                ></textarea>
              </div>
            </div>
            <Button className="w-full flex items-center justify-center gap-3 h-14 uppercase tracking-widest text-sm" disabled={loading}>
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Send size={20} />
                  {t('contact_send')}
                </>
              )}
            </Button>
          </form>
        </GlassCard>

        <div className="flex flex-col justify-between py-6">
          <div className="space-y-12">
            <h3 className="text-3xl font-black uppercase tracking-tighter">{t('contact_connect')}</h3>
            <div className="grid gap-8">
              <a href={t('github_url')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="p-5 rounded-2xl bg-white/5 group-hover:bg-primary group-hover:text-white text-gray-400 transition-all duration-500 transform group-hover:rotate-6">
                  <Github size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">GitHub</p>
                  <p className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">aldino666</p>
                </div>
              </a>
              <a href={t('linkedin_url')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="p-5 rounded-2xl bg-white/5 group-hover:bg-primary group-hover:text-white text-gray-400 transition-all duration-500 transform group-hover:rotate-6">
                  <Linkedin size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">ramanantsirahonana</p>
                </div>
              </a>
              <div
                onClick={handleCopy}
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="p-5 rounded-2xl bg-white/5 group-hover:bg-primary group-hover:text-white text-gray-400 transition-all duration-500 transform group-hover:rotate-6">
                  <Wallet size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                    Web3 Identity
                    {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </p>
                  <p className="font-bold text-xs break-all text-gray-400 group-hover:text-white transition-colors">{SOLANA_ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-dark-gray/20 border border-white/5 group hover:border-primary/20 transition-all">
            <p className="text-primary font-black text-sm uppercase tracking-widest mb-3">{t('contact_sap_consultant')}</p>
            <p className="text-lg text-gray-400 font-medium leading-snug">{t('sap_future')}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
