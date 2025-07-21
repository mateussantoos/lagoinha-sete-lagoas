"use client";
import { motion } from "framer-motion";
import ImageLagoinha from "@/assets/webp/img04.webp";
import Image from "next/image";

export const HeroSobre = () => {
  return (
    <section className="relative h-[60vh] lg:h-[70vh] w-full flex items-center justify-center text-center bg-black">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={ImageLagoinha.src}
          alt="Comunidade da Lagoinha Sete Lagoas reunida"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>
      <motion.div
        className="relative z-10 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase">
          Nossa História, Nossa Fé
        </h1>
        <p className="font-lato text-base sm:text-lg md:text-xl mt-2 max-w-2xl mx-auto">
          Uma igreja apaixonada por Jesus e dedicada a servir a cidade de Sete
          Lagoas.
        </p>
      </motion.div>
    </section>
  );
};
