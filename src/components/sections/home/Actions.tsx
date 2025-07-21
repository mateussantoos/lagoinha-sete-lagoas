"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// --- DADOS DA SEÇÃO ---
const actionsData = [
  {
    title: "Ministério de Louvor",
    description:
      "Nossa equipe de louvor e adoração, dedicada a conduzir a igreja à presença de Deus através da música.",
    imageSrc: "/images/actions/webp/img01.webp",
    link: "/ministerios",
  },
  {
    title: "Dança",
    description:
      "Um ministério que expressa adoração e conta histórias através do movimento, trazendo beleza e profundidade aos nossos cultos.",
    imageSrc: "/images/actions/webp/img03.webp",
    link: "/ministerios",
  },
  {
    title: "Ação Social",
    description:
      "O braço da igreja que alcança nossa cidade, oferecendo suporte, alimento e esperança para os que mais precisam.",
    imageSrc: "/images/actions/webp/img02.webp",
    link: "/ministerios",
  },
  {
    title: "Ministério Infantil",
    description:
      "Um espaço seguro, divertido e edificante onde nossas crianças aprendem sobre o amor de Jesus desde cedo.",
    imageSrc: "/images/actions/webp/img04.webp",
    link: "/ministerios",
  },
  {
    title: "Veja todos os ministérios",
    description:
      "Cada membro é um ministro. Descubra todas as áreas onde você pode servir e usar seus dons para edificar o corpo de Cristo.",
    link: "/ministerios",
  },
];

// --- Variantes de Animação ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const Actions = () => {
  const gridItems = actionsData.flatMap((action) => {
    const textBlock = (
      <motion.div
        key={`${action.title}-text`}
        className={`bg-stone-100 dark:bg-neutral-900 p-8 sm:p-12 flex flex-col justify-center`}
        variants={itemVariants}
      >
        <h3 className="font-bebas text-3xl sm:text-4xl uppercase tracking-wider text-neutral-800 dark:text-neutral-100">
          {action.title}
        </h3>
        <p className="font-lato mt-4 mb-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {action.description}
        </p>
        <Link
          href={action.link}
          className="group font-bebas text-lg uppercase text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
        >
          Conheça
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    );

    if (action.imageSrc) {
      const imageBlock = (
        <motion.div
          key={`${action.title}-image`}
          className="relative aspect-square"
          variants={itemVariants}
        >
          <Image
            src={action.imageSrc}
            alt={`Imagem para ${action.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
      );
      return [textBlock, imageBlock];
    }
    return [textBlock];
  });

  return (
    <section
      id="ministerios"
      className="py-24 bg-white dark:bg-black md:mt-20 lg:mt-45"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tighter text-neutral-800 dark:text-neutral-100">
            Nossos Ministérios
          </h2>
          <p className="font-lato mt-4 text-base md:text-lg max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            Cada iniciativa é um braço da igreja estendido para abençoar, cuidar
            e transformar vidas em nossa cidade.
          </p>
        </motion.div>

        {/* Container do Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Renderiza a lista de itens já processada */}
          {gridItems}
        </motion.div>
      </div>
    </section>
  );
};
