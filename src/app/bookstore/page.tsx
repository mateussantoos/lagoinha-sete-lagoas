import { PrismaClient } from "@/generated/prisma/client";
import { HeroBookstore } from "@/components/sections/bookstore/HeroBookstore";
import { ProductList } from "@/components/sections/bookstore/ProductList";
import { Navbar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";

const prisma = new PrismaClient();

async function getBookstoreData() {
  const products = await prisma.produto.findMany({
    where: { isPublished: true },
    include: { categories: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.categoriaProduto.findMany({
    orderBy: { name: "asc" },
  });

  // Converte Decimal para number para evitar erros de serialização
  const serializedProducts = products.map((p) => ({
    ...p,
    price: p.price.toNumber(),
  }));

  return { products: serializedProducts, categories };
}

export default async function BookstorePage() {
  const { products, categories } = await getBookstoreData();

  return (
    <>
      <Navbar />
      <main>
        <HeroBookstore />
        {/* A seção da lista de produtos com um padding próprio */}
        <section className="pb-24 bg-white dark:bg-black">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductList products={products} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
