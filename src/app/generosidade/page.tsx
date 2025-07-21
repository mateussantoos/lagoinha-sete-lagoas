import { HeroGenerosidade } from "@/components/sections/generosidade/HeroGenerosidade";
import { Metodos } from "@/components/sections/generosidade/Metodos";
import { Proposito } from "@/components/sections/generosidade/Proposito";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";

export default function GenerosidadePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroGenerosidade />
        <Metodos />
        <Proposito />
      </main>
      <Footer />
    </>
  );
}
