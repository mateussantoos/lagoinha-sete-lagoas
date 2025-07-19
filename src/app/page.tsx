import { Navbar } from "@/components/ui/NavBar";
import { Banner } from "@/components/sections/home/Banner";
import { AboutUs } from "@/components/sections/home/AboutUs";
import { Cults } from "@/components/sections/home/Cults";
import { Youtube } from "@/components/sections/home/Youtube";
import { GcSection } from "@/components/sections/home/GcSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <AboutUs />
        <Cults />
        <GcSection />
        <div className="h-screen"></div>
      </main>
    </>
  );
}
