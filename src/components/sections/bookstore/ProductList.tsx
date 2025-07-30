"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { Search, ChevronDown } from "lucide-react";

// Tipagem para os dados que esperamos da API
type Product = {
  id: string;
  name: string;
  price: number;
  sku: string;
  description: string;
  isOnSale: boolean;
  discountPercentage?: number | null;
  stock: number;
  imageSrc?: string | null;
  categoryIds: string[];
  categories: Category[];
};

type Category = {
  id: string;
  name: string;
};

export const ProductList = () => {
  // --- ESTADOS DE DADOS E FILTROS ---
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- BUSCA INICIAL DE DADOS ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setAllProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao buscar dados da bookstore:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- LÓGICA DE FILTRAGEM COMBINADA ---
  useEffect(() => {
    let tempProducts = [...allProducts];

    if (selectedCategory !== "all") {
      tempProducts = tempProducts.filter((product) =>
        product.categories.some((cat: any) => cat.id === selectedCategory)
      );
    }

    if (searchTerm) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "price-asc") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(tempProducts);
  }, [selectedCategory, searchTerm, sortOrder, allProducts]);

  const FilterButton = ({
    categoryId,
    label,
  }: {
    categoryId: string;
    label: string;
  }) => (
    <button
      onClick={() => setSelectedCategory(categoryId)}
      className={`px-4 py-2 rounded-full font-bebas text-lg transition-colors duration-300 ${
        selectedCategory === categoryId
          ? "bg-primary text-black font-bold"
          : "bg-stone-200 dark:bg-neutral-800 hover:bg-stone-300 dark:hover:bg-neutral-700 dark:text-neutral-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <div>
        {/* --- barra de pesquisa --- */}
        <div className="mb-12 p-4 bg-stone-100 dark:bg-neutral-900 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Campo de Busca */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar produto pelo nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 border rounded-lg focus:ring-2 focus:ring-primary  focus:outline-none dark:text-neutral-300"
              />
            </div>
            {/* Seletor de Ordenação */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 border rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:outline-none dark:text-neutral-300"
              >
                <option value="default">Ordenar por</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <FilterButton categoryId="all" label="Todos" />
          {categories.map((cat) => (
            <FilterButton key={cat.id} categoryId={cat.id} label={cat.name} />
          ))}
        </div>

        {/* Grid de Produtos */}
        {isLoading ? (
          <p className="text-center font-lato text-neutral-500">
            Carregando produtos...
          </p>
        ) : (
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id}>
                <ProductCard
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-lato text-neutral-500">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};
