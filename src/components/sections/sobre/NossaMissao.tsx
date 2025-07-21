"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageLagoinha from "@/assets/webp/img03.webp";

export const NossaMissao = () => {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-lato font-bold text-sm tracking-widest uppercase text-primary mb-2 inline-block">
            Nossa Missão
          </span>
          <h2 className="font-bebas text-4xl sm:text-5xl leading-none tracking-tighter text-neutral-800 dark:text-neutral-100 mb-4">
            Um lugar para{" "}
            <span className="font-crimson-text italic">Pertencer</span>
          </h2>

          {/* AQUI ESTÁ A CORREÇÃO: trocamos um <p> gigante por uma <div> com múltiplos <p> e <ul> */}
          <div className="font-lato text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed space-y-4">
            <p>
              Somos a Igreja Batista da Lagoinha em Sete Lagoas, parte da
              Lagoinha Global, com mais de 700 igrejas pelo mundo.
            </p>
            <p>
              Sob a liderança do Pastor Everton Henrique Nogueira, buscamos
              levar a mensagem de Cristo a todos os corações. Nossa igreja é
              acolhedora, fundamentada na oração, na comunhão e no estudo da
              Palavra de Deus.
            </p>
            <p>
              Vivemos um tempo de crescimento, com batismos regulares, encontros
              como o <strong>Café de Novos Membros</strong> e iniciativas para
              expandir nossa missão por Minas Gerais.
            </p>
            <div>
              <span className="block font-bold text-primary mb-2">
                Nossos pilares:
              </span>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Grupos de Crescimento (GCs):</strong> comunhão e
                  cuidado.
                </li>
                <li>
                  <strong>Ministérios:</strong> serviço voluntário nos cultos e
                  eventos.
                </li>
                <li>
                  <strong>Celebrações:</strong> momentos de adoração e louvor.
                </li>
              </ul>
            </div>
            <p>
              Nosso sonho é ser uma igreja que cobre toda a terra, acolhendo e
              inspirando vidas. Em Sete Lagoas, a Lagoinha é sua casa. Venha
              fazer parte dessa família!
            </p>
          </div>
        </motion.div>
        <motion.div
          className="relative aspect-square rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={ImageLagoinha}
            alt="Momento de comunhão na igreja"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
          />
        </motion.div>
      </div>
    </section>
  );
};
