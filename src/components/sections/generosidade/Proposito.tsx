"use client";

import { motion } from "framer-motion";

export const Proposito = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-neutral-300 dark:border-neutral-600 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-neutral-300 dark:border-neutral-600 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-neutral-300 dark:border-neutral-600 transform rotate-45"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </motion.div>

            <h3 className="font-bebas text-lg text-amber-600 dark:text-amber-400 mb-4 tracking-wider">
              NOSSO PROPÓSITO
            </h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-6xl text-neutral-200 dark:text-neutral-700 font-serif">
              "
            </div>
            <h2 className="font-crimson-text italic text-3xl md:text-4xl lg:text-5xl text-neutral-800 dark:text-neutral-100  relative z-10">
              Cada um contribua segundo propôs no seu coração, não com tristeza
              ou por necessidade; porque Deus ama ao que dá com alegria.
            </h2>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-neutral-800 dark:to-neutral-700 px-6 py-3 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <p className="font-bebas text-xl text-neutral-600 dark:text-neutral-300 tracking-wider">
              2 Coríntios 9:7
            </p>
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Com Amor
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Com Alegria
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Com Generosidade
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
