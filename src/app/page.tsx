import { Navbar } from "@/components/ui/NavBar";
import { Banner } from "@/components/sections/home/Banner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <div className="h-screen"></div>
      </main>
    </>
  );
}
