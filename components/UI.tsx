"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Section({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={cn("section-padding max-w-7xl mx-auto", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-4 w-[2px] bg-primary animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter glow-text-cyan">
            {children}
          </h2>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent mb-6" />
        {subtitle && <p className="text-gray-500 text-sm md:text-lg max-w-2xl font-mono uppercase tracking-wider">{subtitle}</p>}
      </motion.div>
    </div>
  );
}

export function GlassCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("glass-card p-8 group hover:border-primary/30", className)}>
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const variants: Record<string, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "bg-transparent border border-primary/50 hover:border-primary text-primary px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/5",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white px-6 py-3 rounded-full font-bold transition-all"
  };

  return (
    <button
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
