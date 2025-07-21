import { HeroContato } from "@/components/sections/contato/HeroContato";
import { FormularioContato } from "@/components/sections/contato/FormularioContato";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroContato />
        <FormularioContato />
      </main>
      <Footer />
    </>
  );
}
