"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// --- DADOS DA SEÇÃO ---
const actionsData = [
  {
    title: "Culto de Jovens",
    description:
      "Um encontro vibrante preparado para a juventude, com louvor, palavra e muita comunhão. Acontece quinzenalmente.",
    imageSrc: "/images/actions/webp/img01.webp",
    link: "/jovens",
  },
  {
    title: "Batismo",
    description:
      "Milhares de vidas têm tomado a decisão de nascer de novo e, como igreja, nós celebramos cada pessoa que faz a melhor escolha.",
    imageSrc: "/images/actions/webp/img02.webp",
    link: "/batismo",
  },
  {
    title: "Ação Social",
    description:
      "Somos uma igreja que vive além da estrutura do templo, por meio de projetos que dão suporte a pessoas com vulnerabilidade social.",
    imageSrc: "/images/actions/webp/img03.webp",
    link: "/acao-social",
  },
  {
    title: "Ministério Infantil",
    description:
      "As crianças são o futuro, mas também são o presente. Temos um espaço preparado com muito carinho e segurança para elas.",
    imageSrc: "/images/actions/webp/img04.webp",
    link: "/infantil",
  },
  {
    title: "Grupos de Crescimento",
    description:
      "A igreja nos lares durante a semana. Um ambiente de comunhão, cuidado mútuo e aprofundamento na Palavra.",
    link: "/mapa-gcs",
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
  // Lógica para criar uma lista única com todos os itens do grid
  const gridItems = actionsData.flatMap((action, index) => {
    const isLastItem = index === actionsData.length - 1;

    const textBlock = (
      <motion.div
        key={`${action.title}-text`} // Key única
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
          key={`${action.title}-image`} // Key única
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
      // Retorna ambos como itens separados na lista
      return [textBlock, imageBlock];
    }
    // Retorna apenas o bloco de texto se não houver imagem
    return [textBlock];
  });

  return (
    <section className="py-24 bg-white dark:bg-black md:mt-20 lg:mt-45">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tighter text-neutral-800 dark:text-neutral-100">
            Conheça Nossas Ações
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
