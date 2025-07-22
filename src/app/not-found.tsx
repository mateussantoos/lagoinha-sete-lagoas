"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Compass, Home } from "lucide-react";

import Image from "next/image";
import BgImage from "@/assets/webp/img05.webp";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-center p-4 bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black">
      {/* Imagem de fundo com overlay melhorado */}
      <div className="absolute inset-0">
        <Image
          src={BgImage}
          alt="Fundo decorativo"
          fill
          className="object-cover opacity-5 dark:opacity-[3%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/60 dark:from-black/80 dark:via-black/60 to-transparent"></div>
      </div>

      {/* Elementos decorativos flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-20 w-3 h-3 bg-primary/20 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-40 left-20 w-1 h-1 bg-primary/40 rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        {/* Ícone principal com animação */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
          className="mx-auto h-24 w-24 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-8 shadow-lg backdrop-blur-sm border border-primary/20"
        >
          <Compass className="h-12 w-12 text-primary" />
        </motion.div>

        {/* Título com animação de entrada */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-bebas text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-neutral-800 dark:text-neutral-100 mb-4"
        >
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            404
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-bebas text-3xl sm:text-4xl tracking-tighter text-neutral-700 dark:text-neutral-200 mb-6"
        >
          Página Não Encontrada
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-lato text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg mx-auto leading-relaxed"
        >
          Parece que você se perdeu pelo caminho, mas não se preocupe, estamos
          aqui para te ajudar a encontrar o rumo certo.
        </motion.p>

        {/* Botões de ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Home className="mr-2 h-5 w-5" />
            Voltar para a Página Inicial
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Informação adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 p-4 bg-white/50 dark:bg-neutral-800/50 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-neutral-700/50"
        >
          <p className="font-lato text-sm text-neutral-500 dark:text-neutral-400">
            Se você acredita que isso é um erro, entre em contato conosco.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
