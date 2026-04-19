"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Section({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={cn("py-20 px-6 max-w-7xl mx-auto", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) {
  return (
    <div className="mb-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {children}
        <div className="h-1 w-20 bg-emerald-500 mt-2 rounded-full" />
      </motion.h2>
      {subtitle && <p className="text-gray-400 max-w-2xl">{subtitle}</p>}
    </div>
  );
}

export function GlassCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300", className)}>
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const variants: Record<string, string> = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-black",
    outline: "bg-transparent border border-emerald-500/50 hover:border-emerald-500 text-emerald-400",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white"
  };

  return (
    <button
      className={cn("px-6 py-3 rounded-full font-semibold transition-all active:scale-95 disabled:opacity-50", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
