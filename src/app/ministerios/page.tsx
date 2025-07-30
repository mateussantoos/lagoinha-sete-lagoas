import { HeroMinisterios } from "@/components/sections/ministerios/HeroMinisterios";
import { MinisteriosList } from "@/components/sections/ministerios/MinisteriosList";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { BannerSobre } from "@/components/ui/BannerSobre";

export default async function MinisteriosPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroMinisterios />
        <MinisteriosList />
        <BannerSobre />
      </main>
      <Footer />
    </>
  );
}
