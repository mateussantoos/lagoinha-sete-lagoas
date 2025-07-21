"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

export const MinisterioDetailModal = ({
  ministerio,
  onClose,
}: {
  ministerio: any;
  onClose: () => void;
}) => {
  if (!ministerio) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col lg:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-auto">
            <Image
              src={ministerio.imageSrc || "/images/placeholder.png"}
              alt={ministerio.name}
              fill
              className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
            />
          </div>

          <div className="w-full lg:w-1/2 p-8 flex flex-col overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-primary transition-colors z-10"
            >
              <X size={24} />
            </button>
            <h2 className="font-bebas text-4xl lg:text-5xl text-neutral-800 dark:text-neutral-100">
              {ministerio.name}
            </h2>
            {ministerio.leaderName && (
              <p className="font-lato text-lg font-bold text-primary mt-2">
                Liderado por: {ministerio.leaderName}
              </p>
            )}
            <p className="font-lato text-neutral-600 dark:text-neutral-400 mt-6 leading-relaxed">
              {ministerio.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
