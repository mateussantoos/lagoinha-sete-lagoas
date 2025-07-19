"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface Episode {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
}

const SkeletonCard = () => (
  <div className="flex-grow-0 flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 pl-4">
    <div className="aspect-square bg-stone-200 dark:bg-neutral-800 rounded-lg animate-pulse"></div>
  </div>
);

export const ClubCast = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        // AQUI ESTÁ A MUDANÇA: Usando fetch para chamar nossa API
        const response = await fetch("/api/spotify");
        if (!response.ok) {
          throw new Error("Falha ao buscar episódios da nossa API.");
        }
        const data = await response.json();
        setEpisodes(data.episodes);
      } catch (error) {
        console.error("Erro ao buscar episódios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Cabeçalho da Seção --- */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bebas text-4xl sm:text-5xl tracking-tighter text-neutral-800 dark:text-neutral-100">
            Nosso Club Cast
          </h2>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-full bg-stone-200 dark:bg-neutral-800 hover:bg-stone-300 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Episódio anterior"
            >
              <ArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-full bg-stone-200 dark:bg-neutral-800 hover:bg-stone-300 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Próximo episódio"
            >
              <ArrowRight className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
            </button>
          </div>
        </div>

        {/* --- Carrossel --- */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : episodes.map((episode, index) => (
                  <div
                    key={episode.id}
                    className="flex-grow-0 flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 pl-4"
                  >
                    <motion.a
                      href={episode.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group rounded-lg overflow-hidden relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Image
                        src={episode.thumbnail}
                        alt={episode.name}
                        width={400}
                        height={400}
                        className="aspect-square object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.a>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};
