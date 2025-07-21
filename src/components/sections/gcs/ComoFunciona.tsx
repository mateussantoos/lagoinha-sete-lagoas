"use client";

import { Users, Search, Heart } from "lucide-react";

const StepCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div className="mx-auto h-16 w-16 flex items-center justify-center bg-primary/20 rounded-full mb-4">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="font-bebas text-2xl text-neutral-800 dark:text-neutral-100">
      {title}
    </h3>
    <p className="font-lato mt-2 text-neutral-600 dark:text-neutral-400">
      {description}
    </p>
  </div>
);

export const ComoFunciona = () => {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl sm:text-5xl text-neutral-800 dark:text-neutral-100">
            Como Participar
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StepCard
            icon={Search}
            title="1. Encontre um GC"
            description="Use o mapa interativo abaixo para encontrar o Grupo de Crescimento mais perto de você."
          />
          <StepCard
            icon={Users}
            title="2. Entre em Contato"
            description="Cada GC na lista ao lado do mapa mostra o nome dos líderes. Sinta-se à vontade para conversar."
          />
          <StepCard
            icon={Heart}
            title="3. Participe"
            description="Visite o GC, conheça novas pessoas e mergulhe em um ambiente de comunhão e estudo da Palavra."
          />
        </div>
      </div>
    </section>
  );
};
