"use client";
import { Button } from "@/components/common/Button";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

// Definindo a interface para os dados do vídeo ao vivo
interface LiveVideo {
  videoId: string;
  title: string;
  url: string;
}

// Variantes de animação para os textos do banner padrão
const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const Banner = () => {
  const [liveVideo, setLiveVideo] = useState<LiveVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const response = await fetch("/api/youtube");
        const data = await response.json();
        if (data.isLive) {
          setLiveVideo(data.liveVideo);
        }
      } catch (error) {
        console.error("Não foi possível checar o status da live:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLiveStatus();
  }, []);

  // Se estiver AO VIVO, renderiza o player do YouTube com iframe
  if (liveVideo) {
    const embedUrl = `https://www.youtube.com/embed/${liveVideo.videoId}?autoplay=1&mute=1&controls=1`;

    return (
      <section>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
            <iframe
              src={embedUrl}
              title={liveVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            ></iframe>

            <div className="absolute top-0 left-0 p-6 md:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex items-center gap-3 bg-red-600/90 text-white font-bold py-2 px-4 rounded-full"
              >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </div>
                AO VIVO
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Se NÃO estiver ao vivo (ou ainda estiver carregando), renderiza o banner padrão
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/28] lg:aspect-[21/11] rounded-2xl">
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
            <motion.div
              className="w-full h-full"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                className="w-full h-full object-cover"
                src="/videos/videoBanner.webm"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              />
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>

          <motion.div
            className="relative z-10 flex flex-col justify-end lg:justify-end h-full p-6 md:p-12 text-white"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="font-lato-900 font-bold leading-tight text-[3vw] md:text-[4vw] lg:text-[5vw] xl:text-[6vw]"
              style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
              variants={textItemVariants}
            >
              Um lugar para pertencer.
            </motion.h1>
            <motion.p
              className="mt-2 md:mt-4 max-w-md lg:max-w-lg font-lato text-[1.5vw] md:text-[2vw]"
              style={{ fontSize: "clamp(0.8rem, 2vw, 1.5rem)" }}
              variants={textItemVariants}
            >
              Somos uma família que ama a Deus e deseja ver Sua glória manifesta
              em Sete Lagoas e no mundo.
            </motion.p>
            <motion.div className="mt-4 md:mt-8" variants={textItemVariants}>
              <Button href="#contato" text="Participe Conosco" arrow={false} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
