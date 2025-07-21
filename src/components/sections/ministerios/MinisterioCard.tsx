"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const MinisterioCard = ({
  ministerio,
  onCardClick,
}: {
  ministerio: any;
  onCardClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={ministerio.imageSrc || "/images/placeholder.png"}
          alt={`Imagem do ministério ${ministerio.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bebas text-2xl text-neutral-800 dark:text-neutral-100">
          {ministerio.name}
        </h3>
        {ministerio.leaderName && (
          <p className="font-lato text-sm font-bold text-primary mt-1">
            Líder: {ministerio.leaderName}
          </p>
        )}
        <p className="font-lato text-neutral-600 dark:text-neutral-400 mt-3 flex-grow line-clamp-3">
          {ministerio.description}
        </p>
        <button
          onClick={onCardClick}
          className="group/button mt-4 font-bebas text-lg uppercase text-primary hover:text-primary/80 transition-colors flex items-center gap-2 self-start"
        >
          Ler Mais
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};
