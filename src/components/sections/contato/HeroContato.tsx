"use client";
import { motion } from "framer-motion";

export const HeroContato = () => {
  return (
    <section className="bg-stone-100 dark:bg-neutral-900 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-bebas text-5xl sm:text-7xl tracking-tighter text-neutral-800 dark:text-neutral-100">
          Fale Conosco
        </h1>
        <p className="font-lato text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl mx-auto">
          Estamos aqui para ouvir você. Se tiver alguma dúvida, pedido de oração
          ou apenas quiser conversar, entre em contato.
        </p>
      </motion.div>
    </section>
  );
};
