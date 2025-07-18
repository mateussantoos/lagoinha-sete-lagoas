"use client";
import Video from "next-video";
import { motion, Variants } from "framer-motion";

const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const Banner = () => {
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/11] rounded-2xl">
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
            <motion.div
              className="w-full h-full"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Video
                className="w-full h-full object-cover"
                src="/videos/videoBanner.webm"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              />
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>

          <motion.div
            className="relative z-10 flex flex-col justify-start lg:justify-end h-full p-6 md:p-12 text-white"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              // Tamanho de fonte fluido e alinhamento à esquerda
              className="font-lato-900 font-bold leading-tight text-[3vw] md:text-[4vw] lg:text-[5vw] xl:text-[6vw]"
              style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
              variants={textItemVariants}
            >
              Um lugar para pertencer.
            </motion.h1>
            <motion.p
              // Tamanho de fonte fluido e largura máxima responsiva
              className="mt-2 md:mt-4 max-w-md lg:max-w-lg font-lato text-[1.5vw] md:text-[2vw]"
              style={{ fontSize: "clamp(0.8rem, 2vw, 1.5rem)" }}
              variants={textItemVariants}
            >
              Somos uma família que ama a Deus e deseja ver Sua glória manifesta
              em Sete Lagoas e no mundo.
            </motion.p>
            <motion.div className="mt-4 md:mt-8" variants={textItemVariants}>
              <a
                href="#contato"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-bold text-[1vw] md:text-[1.2vw] py-2 px-4 md:py-3 md:px-6 rounded-full transition-colors duration-300"
                style={{ fontSize: "clamp(0.7rem, 1.2vw, 1rem)" }}
              >
                Participe Conosco
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
