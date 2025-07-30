import { HeroBookstore } from "@/components/sections/bookstore/HeroBookstore";
import { ProductList } from "@/components/sections/bookstore/ProductList";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";

export default async function BookstorePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBookstore />
        <section className="pb-24 bg-white dark:bg-black">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductList />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
