import { PrismaClient } from "@/generated/prisma/client";
import { HeroMinisterios } from "@/components/sections/ministerios/HeroMinisterios";
import { MinisteriosList } from "@/components/sections/ministerios/MinisteriosList";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { BannerSobre } from "@/components/ui/BannerSobre";

const prisma = new PrismaClient();

async function getMinisterios() {
  return await prisma.ministerio.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export default async function MinisteriosPage() {
  const ministerios = await getMinisterios();

  return (
    <>
      <Navbar />
      <main>
        <HeroMinisterios />
        <MinisteriosList ministerios={ministerios} />
        <BannerSobre />
      </main>
      <Footer />
    </>
  );
}
