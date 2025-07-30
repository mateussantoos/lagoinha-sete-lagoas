"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

type Evento = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageSrc?: string | null;
};

export const FeaturedEvent = ({ event }: { event: Evento | null }) => {
  if (!event) return null;

  const formattedDate = new Date(event.date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-video rounded-lg overflow-hidden"
        >
          <Image
            src={event.imageSrc || "/images/placeholder.png"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-lato font-bold text-sm tracking-widest uppercase text-primary mb-2 inline-block">
            Próximo Evento
          </span>
          <h2 className="font-bebas text-4xl sm:text-5xl leading-none tracking-tighter text-neutral-800 dark:text-neutral-100 mb-4">
            {event.title}
          </h2>
          <div className="flex flex-col gap-3 mb-6 font-lato text-neutral-600 dark:text-neutral-300">
            <p className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" /> {formattedDate}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" /> {event.location}
            </p>
          </div>
          <p className="font-lato text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 line-clamp-4">
            {event.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
