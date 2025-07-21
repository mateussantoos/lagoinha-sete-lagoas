"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import ImageLagoinha from "@/assets/webp/img05.webp";

// --- DADOS DA SEÇÃO ---
const declaracoes = [
  {
    preTitulo: "O Propósito da Lagoinha",
    titulo: "Ser uma igreja grande para servir e pequena para se importar.",
  },
  {
    preTitulo: "A Visão da Lagoinha",
    titulo:
      "Alcançar pelo menos 10% de todas as cidades onde estamos plantados, levando pessoas a Cristo.",
  },
  {
    preTitulo: "A Missão da Lagoinha",
    titulo:
      "Levar cada pessoa a um relacionamento público e crescente com Cristo.",
  },
];
const SLIDE_DURATION_SECONDS = 8;

// --- Variantes de Animação ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Atraso entre a animação de cada palavra
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

// --- Sub-componente para a Barra de Progresso ---
const ProgressIndicator = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-10 h-1 rounded-full bg-white/20 relative overflow-hidden"
    aria-label="Ir para a próxima declaração"
  >
    {isActive && (
      <motion.div
        className="absolute top-0 left-0 h-full bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: SLIDE_DURATION_SECONDS, ease: "linear" }}
      />
    )}
  </button>
);

export const Declaracao = () => {
  const [index, setIndex] = useState(0);

  // Criando uma referência para a seção para o efeito parallax
  const sectionRef = useRef(null);

  // Monitorando o scroll da seção
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Animação ocorre enquanto a seção está visível
  });

  // Transformando o progresso do scroll em movimento vertical (y) para a imagem
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Efeito para trocar a declaração a cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % declaracoes.length);
    }, SLIDE_DURATION_SECONDS * 1000);

    return () => clearInterval(interval);
  }, [index]);

  const declaracaoAtual = declaracoes[index];
  const palavras = declaracaoAtual.titulo.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-neutral-900 text-white overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }} // O movimento parallax é aplicado aqui
      >
        <Image
          src={ImageLagoinha}
          alt="Fundo da seção de declarações da Lagoinha Sete Lagoas"
          fill
          className="object-cover opacity-20 scale-125"
          placeholder="blur"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 max-w-4xl min-h-[50vh] mx-auto px-4 text-center flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex flex-col items-center w-full"
          >
            <p className="font-lato font-bold text-sm tracking-widest uppercase text-primary mb-4">
              {declaracaoAtual.preTitulo}
            </p>
            <motion.h2
              className="font-bebas text-4xl sm:text-6xl lg:text-7xl leading-tight"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {palavras.map((palavra, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  variants={wordVariants}
                >
                  {palavra}
                </motion.span>
              ))}
            </motion.h2>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-12 absolute bottom-[-4rem] sm:bottom-[-2rem]">
          {declaracoes.map((_, i) => (
            <ProgressIndicator
              key={i}
              isActive={index === i}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
