import { MapaGCs } from "@/components/sections/gcs/MapaGCs";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { HeroGc } from "@/components/sections/gcs/HeroGc";
import { ComoFunciona } from "@/components/sections/gcs/ComoFunciona";

export default async function GcsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroGc />
        <ComoFunciona />
        <MapaGCs />
      </main>
      <Footer />
    </>
  );
}
