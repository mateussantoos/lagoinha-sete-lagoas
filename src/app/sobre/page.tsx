import { HeroSobre } from "@/components/sections/sobre/HeroSobre";
import { NossaMissao } from "@/components/sections/sobre/NossaMissao";
import { NossasCrencas } from "@/components/sections/sobre/NossasCrencas";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { Declaracao } from "@/components/sections/sobre/Declaracao";
import { Mapa } from "@/components/sections/sobre/Mapa";

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSobre />
        <NossaMissao />
        <Declaracao />
        <NossasCrencas />
        <Mapa />
      </main>
      <Footer />
    </>
  );
}
