import { Navbar } from "@/components/ui/NavBar";
import { Banner } from "@/components/sections/home/Banner";
import { AboutUs } from "@/components/sections/home/AboutUs";
import { Cults } from "@/components/sections/home/Cults";
import { GcSection } from "@/components/sections/home/GcSection";
import { Actions } from "@/components/sections/home/Actions";
import { Youtube } from "@/components/sections/home/Youtube";
import { Faq } from "@/components/sections/home/Faq";
import { ClubCast } from "@/components/sections/home/ClubCast";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <AboutUs />
        <Cults />
        <GcSection />
        <Actions />
        <Youtube />
        <ClubCast />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
