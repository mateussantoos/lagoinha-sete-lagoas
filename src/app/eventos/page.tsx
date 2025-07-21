import { PrismaClient } from "@/generated/prisma/client";
import { HeroEventos } from "@/components/sections/eventos/HeroEventos";
import { FeaturedEvent } from "@/components/sections/eventos/FeaturedEvent";
import { EventList } from "@/components/sections/eventos/EventList";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";

const prisma = new PrismaClient();

async function getEvents() {
  const eventos = await prisma.evento.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const now = new Date();
  const upcomingEvents = eventos.filter((event) => new Date(event.date) >= now);
  const pastEvents = eventos.filter((event) => new Date(event.date) < now);

  const featuredEvent = upcomingEvents.pop();

  return {
    featuredEvent,
    upcomingEvents: upcomingEvents.reverse(),
    pastEvents,
  };
}

export default async function EventosPage() {
  const { featuredEvent, upcomingEvents, pastEvents } = await getEvents();

  return (
    <>
      <Navbar />
      <main>
        <HeroEventos />
        <FeaturedEvent event={featuredEvent} />
        <EventList title="Próximos Eventos" events={upcomingEvents} />
        <EventList title="Eventos Passados" events={pastEvents} />
      </main>
      <Footer />
    </>
  );
}
