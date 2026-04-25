"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="absolute inset-0 command-grid opacity-20" />
          <div className="absolute inset-0 scanline opacity-10" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center relative z-10"
          >
            <div className="w-24 h-24 relative mb-12">
               <Image
                src="/logo.png"
                alt="Loading"
                fill
                className="object-contain"
               />
               <motion.div
                className="absolute inset-0 border-2 border-primary/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
               />
            </div>

            <div className="w-80 space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary glow-text-cyan">
                        Boot_Sequence
                    </span>
                    <span className="text-[10px] font-mono text-primary/60">
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className="w-full h-[2px] bg-white/5 relative">
                    <motion.div
                        className="h-full bg-primary shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between">
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-700"
                    >
                        Fetching Core_Modules...
                    </motion.span>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-700">
                        Aldino_OS v1.0.0
                    </span>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
