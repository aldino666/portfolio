"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-24 h-24 relative mb-4">
               <Image src="/logo.png" alt="Loading" fill className="object-contain" />
            </div>
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-emerald-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
