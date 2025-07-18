import { Navbar } from "@/components/ui/NavBar";
import { Banner } from "@/components/sections/home/Banner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mt-16">
        <Banner />
        <div className="h-screen"></div>
      </main>
    </>
  );
}
