"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { PlayCircle, ArrowRight, X } from "lucide-react";

// Tipo para vídeos
interface Video {
  title: string;
  thumbnail: string;
  videoId: string;
  url: string;
}

// Animações
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export const Youtube = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/youtube");
        if (!response.ok) throw new Error("Falha ao buscar os vídeos.");
        const data = await response.json();
        setVideos(data.recentVideos || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const latestVideo = videos.length > 0 ? videos[0] : null;
  const otherVideos = videos.length > 1 ? videos.slice(1, 3) : [];

  const openVideo = (videoId: string) => setSelectedVideoId(videoId);
  const closeVideo = () => setSelectedVideoId(null);

  return (
    <>
      <section className="py-24 bg-stone-100 dark:bg-neutral-900 md:mt-20 lg:mt-45">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-bebas text-[clamp(2rem,6vw,5rem)] leading-none tracking-tighter text-neutral-800 dark:text-neutral-100">
              Assista Nossas Mensagens
            </h2>
            <p className="font-lato mt-4 text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
              Acompanhe as últimas pregações e cultos completos diretamente do
              nosso canal.
            </p>
          </motion.div>

          {loading && (
            <p className="text-center mt-12 text-neutral-600 dark:text-neutral-400">
              Carregando vídeos...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 mt-12">Erro: {error}</p>
          )}

          {!loading && !error && videos.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 mt-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {latestVideo && (
                <motion.button
                  onClick={() => openVideo(latestVideo.videoId)}
                  className="group relative md:col-span-2 md:row-span-2 aspect-video rounded-lg overflow-hidden shadow-lg text-left"
                  variants={itemVariants}
                >
                  <Image
                    src={latestVideo.thumbnail}
                    alt={latestVideo.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/70 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                  </div>
                  <h3 className="absolute bottom-0 left-0 p-6 font-bebas text-2xl md:text-4xl text-white leading-tight line-clamp-2">
                    {latestVideo.title}
                  </h3>
                </motion.button>
              )}

              {otherVideos.map((video) => (
                <motion.button
                  key={video.videoId}
                  onClick={() => openVideo(video.videoId)}
                  className="group relative aspect-video rounded-lg overflow-hidden shadow-lg text-left"
                  variants={itemVariants}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-10 w-10 text-white/70 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                  </div>
                  <h3 className="absolute bottom-0 left-0 p-3 font-bebas text-lg text-white leading-tight line-clamp-2">
                    {video.title}
                  </h3>
                </motion.button>
              ))}
            </motion.div>
          )}

          <motion.div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@lagoinhasetelagoas7913"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-colors duration-300 text-[clamp(0.9rem,1.2vw,1.1rem)]"
            >
              Ver todos no YouTube
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- MODAL DO VÍDEO --- */}
      {selectedVideoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-[90vw] aspect-[16/9] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
              aria-label="Fechar vídeo"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full rounded-lg shadow-2xl"
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </>
  );
};
