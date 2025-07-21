"use client";
import { motion } from "framer-motion";

export const HeroBookstore = () => {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="font-bebas text-5xl sm:text-7xl tracking-tighter uppercase text-neutral-800 dark:text-neutral-100">
          Bookstore
        </h1>
        <p className="font-lato text-base sm:text-lg max-w-2xl mx-auto mt-2 text-neutral-600 dark:text-neutral-400">
          Livros, camisetas e recursos para edificar sua vida.
        </p>
      </motion.div>
    </section>
  );
};
