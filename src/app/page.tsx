import { Navbar } from "@/components/ui/NavBar";
import { Banner } from "@/components/sections/home/Banner";
import { AboutUs } from "@/components/sections/home/AboutUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <AboutUs />
        <div className="h-screen"></div>
      </main>
    </>
  );
}
