import { Navbar } from "@/components/ui/NavBar";
import { Banner } from "@/components/sections/home/Banner";
import { AboutUs } from "@/components/sections/home/AboutUs";
import { Cults } from "@/components/sections/home/Cults";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <AboutUs />
        <Cults />
        <div className="h-screen"></div>
      </main>
    </>
  );
}
