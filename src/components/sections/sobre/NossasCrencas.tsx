"use client";
import { motion, Variants } from "framer-motion";
import { BookOpen, Heart, Users, Music } from "lucide-react";

// Edite os pilares da sua igreja aqui
const crencasData = [
  {
    icon: BookOpen,
    title: "A Palavra",
    description:
      "Cremos que a Bíblia é a palavra inspirada de Deus, nosso guia infalível de fé e conduta.",
  },
  {
    icon: Users,
    title: "Comunhão",
    description:
      "Valorizamos os relacionamentos e o cuidado mútuo, expressos principalmente nos Grupos de Crescimento.",
  },
  {
    icon: Music,
    title: "Adoração",
    description:
      "Buscamos uma adoração extravagante e sincera, que conecta nosso coração ao coração do Pai.",
  },
  {
    icon: Heart,
    title: "Serviço",
    description:
      "Acreditamos que cada membro é um ministro, chamado para servir a igreja e a comunidade com seus dons.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const NossasCrencas = () => {
  return (
    <section className="py-24 bg-white dark:bg-black ">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-bebas text-5xl sm:text-6xl tracking-tighter text-neutral-800 dark:text-neutral-100">
            No Que Cremos
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {crencasData.map((crenca) => (
            <motion.div
              key={crenca.title}
              className="text-center p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
              variants={itemVariants}
            >
              <crenca.icon className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="font-bebas text-2xl text-neutral-800 dark:text-neutral-100 mb-2">
                {crenca.title}
              </h3>
              <p className="font-lato text-neutral-600 dark:text-neutral-400 text-sm">
                {crenca.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
