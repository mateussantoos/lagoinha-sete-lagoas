"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import ImageLagoinha from "@/assets/webp/img01.webp";
import { Button } from "@/components/common/Button";

// --- Variantes de Animação ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const AboutUs = () => {
  return (
    <section className="py-16 md:py-24 mt-20 lg:mt-45">
      <motion.div
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="rounded-2xl bg-stone-100 dark:bg-neutral-900 flex flex-col-reverse lg:flex-row justify-center items-center p-6 md:p-12 lg:p-0 gap-12">
          {/* --- Coluna de Texto (Esquerda) --- */}
          <div className="w-full lg:w-9/20 lg:pl-16 text-left  lg:text-left ">
            <motion.h1
              className="font-bebas text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none  text-neutral-800 tracking-tighter dark:text-neutral-100  -translate-y-22"
              variants={itemVariants}
            >
              Sobre{" "}
              <span className="relative font-crimson-text font-light italic tracking-tighter">
                a Igreja
              </span>
            </motion.h1>
            <motion.h2
              className="font-crimson-text text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 leading-none text-neutral-700 dark:text-neutral-200  -translate-y-20"
              variants={itemVariants}
            >
              Grande para servir e{" "}
              <i className="italic">pequena para se importar</i>
            </motion.h2>
            <motion.p
              className="font-lato text-gray-800 dark:text-gray-300 leading-snug text-base md:text-lg tracking-wide max-w-lg mx-auto lg:mx-0 mb-8 text-justify lg:text-left"
              variants={itemVariants}
            >
              Somos uma extensão da Igreja Batista da Lagoinha, um lugar para
              todos. Nosso coração queima para servir Sete Lagoas, espalhando o
              amor e a esperança de Jesus em cada rua e em cada lar.
            </motion.p>
            <motion.p
              className="font-lato text-gray-800 dark:text-gray-300 leading-snug text-base md:text-lg tracking-wide max-w-lg mx-auto lg:mx-0 mb-8 text-justify lg:text-left"
              variants={itemVariants}
            >
              Nosso coração é viver como uma família unida em fé e amor.
              Compartilhamos a Palavra de Deus com coragem e compaixão. Uma
              igreja que impacta localmente e alcança o mundo.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button href="#contato" text="Nossa História" />
            </motion.div>
          </div>

          {/* --- Coluna da Imagem (Direita) --- */}
          <motion.div
            className="w-full lg:w-9/20 aspect-square lg:-translate-y-10 -translate-y-15"
            variants={imageVariants}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src={ImageLagoinha.src}
                alt="Membros da igreja em um momento de louvor e adoração"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
