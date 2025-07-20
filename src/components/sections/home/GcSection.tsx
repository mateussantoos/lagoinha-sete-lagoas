"use client";

import { Button } from "@/components/common/Button";
import { motion, Variants } from "framer-motion";
import { Phone, MapPin, MessageSquare, Map as MapIcon } from "lucide-react";

// Informações centralizadas para fácil edição
const contatoInfo = {
  address: "R. Olinto Alvim, 97 - Boa Vista, Sete Lagoas",
  mapsQuery: encodeURIComponent(
    `R. Olinto Alvim, 97 - Boa Vista, Sete Lagoas, Minas Gerais`
  ),
  get mapsLink() {
    return `https://maps.google.com/?q=${this.mapsQuery}`;
  },
  phoneNumber: "5531983311535",
  get formattedPhoneNumber() {
    return "+55 (31) 98331-1535";
  },
  get whatsappLink() {
    return `https://api.whatsapp.com/send?phone=${this.phoneNumber}`;
  },
  get telLink() {
    return `tel:${this.phoneNumber}`;
  },
};

// Variantes de animação consistentes
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatingCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: ["0rem", "-0.75rem", "0rem"],
    transition: {
      opacity: { duration: 0.6, ease: "easeOut" },
      y: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  },
};

export const GcSection = () => {
  return (
    <section className=" bg-stone-100 dark:bg-neutral-900 mt-40 pb-5 lg:mt-45 md:py-5 relative">
      <motion.div
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24 -translate-y-10 md:translate-y-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* --- Coluna do Card (Esquerda) --- */}
        <div className="w-full max-w-sm lg:w-4/12 lg:-mt-32">
          {/* CARD FLIP - Visível apenas em telas grandes (desktop) */}
          <motion.div
            className="relative h-56 hidden lg:block group [perspective:1000px]"
            variants={floatingCardVariants}
          >
            <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-transform">
              {/* Frente do Card */}
              <div className="absolute w-full h-full bg-white dark:bg-neutral-800 text-black rounded-lg shadow-xl p-6 flex flex-col items-center justify-center gap-2 [backface-visibility:hidden]">
                <MapPin className="w-12 h-12 text-primary" />
                <h3 className="font-bebas text-2xl uppercase text-neutral-800 dark:text-neutral-100">
                  Nosso Ponto de Encontro
                </h3>
                <p className="font-lato text-sm text-center text-neutral-600 dark:text-neutral-300">
                  {contatoInfo.address}
                </p>
                <p className="font-lato text-xs font-semibold text-neutral-500 mt-2">
                  Passe o mouse para mais opções
                </p>
              </div>

              {/* Verso do Card */}
              <div className="absolute w-full h-full bg-neutral-800 dark:bg-neutral-950 text-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center gap-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <h3 className="font-bebas text-2xl uppercase">Fale Conosco</h3>
                <a
                  href={contatoInfo.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-lato text-sm uppercase hover:text-primary transition-colors flex items-center gap-2"
                >
                  <MapPin size={16} /> Ver no Mapa
                </a>
                <a
                  href={contatoInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-lato text-sm uppercase hover:text-primary transition-colors flex items-center gap-2"
                >
                  <MessageSquare size={16} /> WhatsApp
                </a>
                <a
                  href={contatoInfo.telLink}
                  className="font-lato text-sm uppercase hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Phone size={16} /> Ligar Agora
                </a>
              </div>
            </div>
          </motion.div>

          {/* CARD ESTÁTICO - Visível apenas em telas pequenas (mobile/tablet) */}
          <motion.div
            className="relative h-auto bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6 flex flex-col items-center justify-center gap-4 text-center lg:hidden"
            variants={floatingCardVariants}
          >
            <MapPin className="w-12 h-12 text-primary" />
            <h3 className="font-bebas text-2xl uppercase text-neutral-800 dark:text-neutral-100">
              Nosso Ponto de Encontro
            </h3>
            <p className="font-lato text-sm text-neutral-600 dark:text-neutral-300">
              {contatoInfo.address}
            </p>
            <a
              href={contatoInfo.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 text-sm"
            >
              Ver no mapa
            </a>
          </motion.div>
        </div>

        {/* --- Coluna de Texto (Direita) --- */}
        <motion.div
          className="w-full lg:w-8/12  lg:text-left md:pl-40 -translate-y-12"
          variants={itemVariants}
        >
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl leading-none tracking-tighter text-neutral-800 dark:text-neutral-100 mb-4 ">
            Encontre um GC <i className=" font-crimson-text">Para você</i>
          </h2>
          <span className="font-lato font-bold text-sm tracking-widest uppercase text-primary mb-2 inline-block">
            Comunhão e Crescimento
          </span>
          <p className="font-lato text-neutral-600 dark:text-neutral-400  lg:text-left text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
            Os Grupos de Crescimento (GCs) são a igreja se reunindo nos lares
            durante a semana. É um ambiente de comunhão, cuidado mútuo e
            aprofundamento na Palavra. Temos GCs espalhados por toda Sete Lagoas
            e região, e um deles é perfeito para você.
          </p>
          <Button
            href="/mapa-gcs"
            text="Mapa de GCs"
            icon={<MapIcon />}
            arrow={false}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
