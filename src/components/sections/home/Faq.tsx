"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// --- DADOS DO FAQ ---
// Este é o "centro de controle". Edite, adicione ou remova perguntas aqui.
const faqData = [
  {
    question: "Quais os horários de culto?",
    answer: (
      <p>
        Nossos encontros semanais são:
        <br />- <strong>Quarta-feira, 19:30h:</strong> Escola de Oração
        <br />- <strong>Quinta-feira, 19:30h:</strong> Culto Fé
        <br />- <strong>Sábado, 19:30h:</strong> Clube Legacy (Jovens)
        <br />- <strong>Domingo, 10h e 19h:</strong> Culto de Celebração
      </p>
    ),
  },
  {
    question: "O que é um GC?",
    answer: (
      <p>
        GC (Grupo de Crescimento) é um lugar de aconchego, comunhão, edificação
        e cura. É um grupo de irmãos que se reúnem semanalmente na casa de um
        anfitrião para um estudo sistemático da Palavra de Deus, ministrado por
        um líder treinado pela igreja.
      </p>
    ),
  },
  {
    question: "Como faço para participar de um GC?",
    answer: (
      <p>
        Os GCs são abertos a todos! Nossa igreja disponibiliza uma lista de GCs
        com o contato do líder e o endereço. Você pode encontrar o mais próximo
        de você e entrar em contato para participar.
      </p>
    ),
  },
  {
    question: "Quero servir em um ministério, o que fazer?",
    answer: (
      <p>
        Ao se tornar membro da Igreja, todos são bem-vindos para servir. O
        primeiro passo é entrar em contato com o coordenador do ministério que
        você deseja participar e se voluntariar para servir com alegria.
      </p>
    ),
  },
  {
    question: "Tem sala kids para as crianças? Como funciona?",
    answer: (
      <p>
        Sim! Temos classes especiais para ministração às crianças. Elas
        acontecem durante as reuniões de culto, em um espaço seguro e preparado
        ao lado da nossa igreja.
      </p>
    ),
  },
  {
    question: "O que é o Carisma?",
    answer: (
      <p>
        O Carisma é o Seminário Teológico da Igreja Batista da Lagoinha, com
        duração de um ano. Para participar, é necessário ter mais de 18 anos e
        ser alfabetizado.
      </p>
    ),
  },
  {
    question: "Os cultos são transmitidos?",
    answer: (
      <p>
        Sim, os cultos de Domingo e em datas especiais são transmitidos ao vivo
        em nosso canal oficial.{" "}
        <a
          href="https://www.youtube.com/@lagoinhasetelagoas7913"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80"
        >
          Acesse aqui o nosso YouTube
        </a>
        .
      </p>
    ),
  },
];

// Componente para um item individual do FAQ
const FaqItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: (typeof faqData)[0];
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border-b border-neutral-200 dark:border-neutral-800 py-6">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left"
    >
      <h3 className="font-bebas text-xl md:text-2xl text-neutral-800 dark:text-neutral-100">
        {item.question}
      </h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown
          className={`h-6 w-6 text-primary transition-transform duration-300`}
        />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto", marginTop: "16px" },
            collapsed: { opacity: 0, height: 0, marginTop: "0px" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="font-lato text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {item.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tighter text-neutral-800 dark:text-neutral-100">
            Perguntas <i className="font-crimson-text ">Frequentes</i>
          </h2>
          <p className="font-lato mt-4 text-base md:text-lg max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            Tiramos aqui algumas das dúvidas mais comuns. Se a sua não estiver
            aqui, entre em contato conosco!
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <FaqItem
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
