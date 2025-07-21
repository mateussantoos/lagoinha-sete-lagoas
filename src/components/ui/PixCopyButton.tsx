"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PixCopyButton = ({ pixKey }: { pixKey: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50"
      disabled={copied}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2"
          >
            <Check size={18} />
            Chave Copiada!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Copy size={18} />
            Copiar Chave PIX
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
