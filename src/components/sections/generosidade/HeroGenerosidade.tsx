"use client";
import Image from "next/image";
import HeroImage from "@/assets/webp/img01.webp";

export const HeroGenerosidade = () => {
  return (
    <section className="relative h-[50vh] flex items-center justify-center text-center bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src={HeroImage}
          alt="Mãos em oração e contribuição"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      <div className="relative z-10 p-4">
        <h1 className="font-bebas text-5xl sm:text-7xl tracking-tighter uppercase">
          Parceiros na Missão
        </h1>
        <p className="font-lato text-base sm:text-lg max-w-2xl mx-auto mt-2">
          Sua generosidade impulsiona o avanço do Reino de Deus em nossa cidade
          e além.
        </p>
      </div>
    </section>
  );
};
