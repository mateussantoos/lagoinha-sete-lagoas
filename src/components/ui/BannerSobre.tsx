"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "../common/Button";
import Image from "next/image";
import ImageLagoinha from "@/assets/webp/img02.webp";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

export const BannerSobre = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Imagem de Fundo Otimizada */}
          <Image
            src={ImageLagoinha}
            alt="Fundo da seção Sobre da Lagoinha Sete Lagoas"
            fill
            className="object-cover"
            placeholder="blur"
            priority
          />

          <div className="absolute inset-0 bg-black/50" />

          {/* Conteúdo com Animações */}
          <motion.div
            className="relative z-10 px-8 py-24 md:px-12 md:py-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="max-w-4xl">
              <motion.h1
                className="font-bebas text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tighter text-white mb-6"
                variants={itemVariants}
              >
                Conheça a Nossa Igreja
              </motion.h1>

              <motion.div
                className="font-lato text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl space-y-4"
                variants={itemVariants}
              >
                <p>
                  Somos uma Igreja de Jesus. Uma pequena tribo de Seus
                  seguidores, conectados por nossa fé em comum e por um profundo
                  desejo de ver nossa cidade e o mundo conhecerem Seu poder e
                  beleza.
                </p>
                <p className="font-bold">
                  Saiba mais sobre nós e nossa liderança abaixo.
                </p>
                <Button text="Conheça nossa igreja" href="/sobre" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
