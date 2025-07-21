"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const localizacao = {
  endereco: "R. Olinto Alvim, 97 - Boa Vista",
  cidade: "Sete Lagoas, MG",
  googleMapsLink:
    "https://www.google.com/maps/search/?api=1&query=R.+Olinto+Alvim,+97+-+Boa+Vista,+Sete+Lagoas",
  embedMapLink:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.36143194239!2d-44.2449130888561!3d-19.439977981804703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6508075723a6b%3A0x8806354a864a633!2sR.%20Olinto%20Alvim%2C%2097%20-%20Boa%20Vista%2C%20Sete%20Lagoas%20-%20MG%2C%2035700-104!5e0!3m2!1spt-BR!2sbr!4v1721435522538!5m2!1spt-BR!2sbr",
};

export const Mapa = () => {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tighter text-neutral-800 dark:text-neutral-100">
            Faça-nos uma visita
          </h2>
          <p className="font-lato mt-4 text-base md:text-lg max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
            Estamos de portas abertas para receber você e sua família.
          </p>
        </motion.div>

        <motion.div
          className="relative aspect-[4/3] md:aspect-[16/7] w-full rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Iframe do Google Maps */}
          <iframe
            src={localizacao.embedMapLink}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[70%] contrast-125"
          ></iframe>

          {/* Card de Informações Flutuante */}
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
            <motion.div
              className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <p className="font-lato font-bold text-neutral-800 dark:text-neutral-100">
                    {localizacao.endereco}
                  </p>
                  <p className="font-lato text-sm text-neutral-600 dark:text-neutral-300">
                    {localizacao.cidade}
                  </p>
                </div>
              </div>
              <a
                href={localizacao.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center mt-4 font-bebas text-base uppercase text-primary hover:text-primary/80 transition-colors"
              >
                Ver no Google Maps
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
