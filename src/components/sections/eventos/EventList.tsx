"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Evento = {
  id: string;
  title: string;
  date: string;
  imageSrc?: string | null;
};

const EventCard = ({ event }: { event: Evento }) => {
  const formattedDate = new Date(event.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm overflow-hidden group"
    >
      <Link href={`/eventos/${event.id}`}>
        <div className="relative aspect-video">
          <Image
            src={event.imageSrc || "/images/placeholder.png"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <p className="font-lato text-sm text-primary mb-1">{formattedDate}</p>
          <h3 className="font-bebas text-2xl text-neutral-800 dark:text-neutral-100 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export const EventList = ({
  title,
  events,
}: {
  title: string;
  events: Evento[];
}) => {
  if (!events || events.length === 0) return null;

  return (
    <section className="py-24 bg-stone-100 dark:bg-neutral-900">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-bebas text-4xl sm:text-5xl text-center mb-12 text-neutral-800 dark:text-neutral-100">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};
