"use client";

import { useState, useEffect } from "react";
import { FeaturedEvent } from "./FeaturedEvent";
import { EventList } from "./EventList";

type ApiEvento = {
  id: string;
  title: string;
  description: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  location: string;
  imageSrc?: string | null;
};

// Defina o tipo Evento para corresponder ao tipo esperado pelos componentes filhos
export type Evento = {
  id: string;
  title: string;
  description: string;
  date: string; // Usar string para compatibilidade
  location: string;
  imageSrc?: string | null;
};

export const EventosContainer = () => {
  const [featuredEvent, setFeaturedEvent] = useState<Evento | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Evento[]>([]);
  const [pastEvents, setPastEvents] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessEvents = async () => {
      try {
        const response = await fetch("/api/eventos");
        if (!response.ok) {
          throw new Error("Falha ao buscar os eventos.");
        }
        const apiEventos: ApiEvento[] = await response.json();

        const eventos: Evento[] = apiEventos.map((event) => ({
          ...event,
          date: new Date(event.date.seconds * 1000).toISOString(),
        }));

        const now = new Date();

        const upcoming = eventos
          .filter((event) => new Date(event.date) >= now)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        const past = eventos
          .filter((event) => new Date(event.date) < now)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );

        const nextEvent = upcoming.shift();

        setFeaturedEvent(nextEvent || null);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessEvents();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-white dark:bg-black text-center">
        <p className="font-lato text-neutral-500">Carregando eventos...</p>
      </section>
    );
  }

  if (
    !featuredEvent &&
    upcomingEvents.length === 0 &&
    pastEvents.length === 0
  ) {
    return (
      <section className="py-24 bg-white dark:bg-black text-center">
        <p className="font-lato text-neutral-500">
          Nenhum evento encontrado no momento.
        </p>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-black">
      <FeaturedEvent event={featuredEvent} />
      <EventList title="Próximos Eventos" events={upcomingEvents} />
      <EventList title="Eventos Passados" events={pastEvents} />
    </section>
  );
};
