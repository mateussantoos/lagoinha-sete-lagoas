import { PrismaClient } from "@/generated/prisma/client";
import { MapaGCs } from "@/components/sections/gcs/MapaGCs";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { HeroGc } from "@/components/sections/gcs/HeroGc";
import { ComoFunciona } from "@/components/sections/gcs/ComoFunciona";

const prisma = new PrismaClient();

async function getGcs() {
  return await prisma.gC.findMany({
    include: {
      leaders: true,
    },
  });
}

export default async function GcsPage() {
  const gcs = await getGcs();

  return (
    <>
      <Navbar />
      <main>
        <HeroGc />
        <ComoFunciona />
        <MapaGCs gcs={gcs} />
      </main>
      <Footer />
    </>
  );
}
