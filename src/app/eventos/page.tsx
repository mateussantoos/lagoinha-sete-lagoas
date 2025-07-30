import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { HeroEventos } from "@/components/sections/eventos/HeroEventos";
import { EventosContainer } from "@/components/sections/eventos/EventosContainer";

export default async function EventosPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroEventos />
        <EventosContainer />
      </main>
      <Footer />
    </>
  );
}
