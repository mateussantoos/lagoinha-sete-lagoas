"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MinisterioCard } from "./MinisterioCard";
import { MinisterioDetailModal } from "./MinisterioDetailModal";

// Tipagem para os dados que esperamos da nossa API
type Ministerio = {
  id: string;
  name: string;
  description?: string | null;
  leaderName?: string | null;
  imageSrc?: string | null;
};

export const MinisteriosList = () => {
  const [ministerios, setMinisterios] = useState<Ministerio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMinisterio, setSelectedMinisterio] =
    useState<Ministerio | null>(null);

  useEffect(() => {
    const fetchMinisterios = async () => {
      try {
        const response = await fetch("/api/ministerios");
        if (!response.ok) {
          throw new Error("Falha ao buscar os ministérios.");
        }
        const data = await response.json();
        setMinisterios(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMinisterios();
  }, []);

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
