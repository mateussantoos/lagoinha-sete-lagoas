"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- DADOS DOS CULTOS ---
// Edite aqui para adicionar, remover ou alterar os horários facilmente
const cultos = [
  {
    dia: "Quarta-feira",
    horarios: "19:30h",
    titulo: "Escola de Oração - Carisma",
  },
  {
    dia: "Quinta-feira",
    horarios: "19:30h",
    titulo: "Culta Fé",
  },
  {
    dia: "Sexta-feira",
    horarios: "19:30h",
    titulo: "Culto de Jovens - Legacy",
  },
  {
    dia: "Domingo",
    horarios: "10h & 18h",
    titulo: "Culto de Celebração",
  },
];

// --- Variantes de Animação ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scheduleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const Cults = () => {
  return (
    <section className="my-20 bg-white dark:bg-black">
      <motion.div
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* --- Coluna de Texto (Esquerda) --- */}
          <div className="text-center lg:text-left">
            <motion.h2
              className="font-bebas text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tighter text-neutral-800 dark:text-neutral-100"
              variants={textVariants}
            >
              Nossos{" "}
              <i className="font-crimson-text tracking-tighter">Cultos</i>
            </motion.h2>
            <motion.p
              className="font-lato mt-4 text-base md:text-lg max-w-lg mx-auto lg:mx-0 text-neutral-600 dark:text-neutral-400"
              variants={textVariants}
            >
              Você e sua família são nossos convidados especiais para celebrar e
              adorar a Deus conosco. Encontre um horário e venha nos visitar.
            </motion.p>
            <motion.a
              href="#contato"
              className="inline-flex items-center mt-8 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 text-base"
              variants={textVariants}
            >
              Como Chegar
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
          </div>

          {/* --- Coluna da Lista de Horários (Direita) --- */}
          <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
          >
            {cultos.map((culto, index) => (
              <motion.div
                key={index}
                className="p-6 border-l-4 border-primary bg-stone-100 dark:bg-neutral-900 rounded-r-lg"
                variants={scheduleVariants}
              >
                <p className="font-lato text-sm text-neutral-500 dark:text-neutral-400">
                  {culto.dia}
                </p>
                <div className="flex items-baseline gap-4 mt-1">
                  <h3 className="font-bebas text-3xl md:text-4xl text-neutral-800 dark:text-neutral-100">
                    {culto.horarios}
                  </h3>
                  <p className="font-lato font-bold text-base text-neutral-700 dark:text-neutral-300">
                    {culto.titulo}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
