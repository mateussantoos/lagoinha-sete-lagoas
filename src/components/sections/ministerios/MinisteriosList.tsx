"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MinisterioCard } from "./MinisterioCard";
import { MinisterioDetailModal } from "./MinisterioDetailModal";

export const MinisteriosList = ({ ministerios }: { ministerios: any[] }) => {
  const [selectedMinisterio, setSelectedMinisterio] = useState<any | null>(
    null
  );

  return (
    <>
      <section className="py-24 bg-stone-100 dark:bg-black">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministerios.map((ministerio) => (
              <MinisterioCard
                key={ministerio.id}
                ministerio={ministerio}
                onCardClick={() => setSelectedMinisterio(ministerio)}
              />
            ))}
          </div>
        </div>
      </section>

      <MinisterioDetailModal
        ministerio={selectedMinisterio}
        onClose={() => setSelectedMinisterio(null)}
      />
    </>
  );
};
