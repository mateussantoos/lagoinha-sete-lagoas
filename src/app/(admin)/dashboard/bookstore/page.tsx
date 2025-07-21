"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  Boxes,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { ProductModal } from "@/components/admin/ProductModal";
import Image from "next/image";

// Tipos para os dados, podemos simplificar se não precisarmos de todos os campos do Prisma aqui
type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  isOnSale: boolean;
  discountPercentage?: number | null;
  stock: number;
  imageSrc?: string | null;
  categories: Category[];
};

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) => (
  <div className="bg-white dark:bg-neutral-950/50 p-6 rounded-lg shadow-sm flex items-center gap-4">
    <div className="p-3 bg-primary/20 rounded-full">
      <Icon className="h-6 w-6 text-primary-dark" />
    </div>
    <div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
      <p className="text-2xl font-bebas font-bold">{value}</p>
    </div>
  </div>
);

export default function BookstorePage() {
  const [stats, setStats] = useState({
    productCount: 0,
    pendingOrdersCount: 0,
    lowStockCount: 0,
    categoryCount: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const fetchData = async () => {
    // Busca produtos, categorias e estatísticas da loja
    setIsLoading(true);
    try {
      // Busca produtos
      const productsRes = await fetch("/api/products");
      const productsData = await productsRes.json();

      // Busca categorias
      const categoriesRes = await fetch("/api/categories");
      const categoriesData = await categoriesRes.json();

      // Calcula estatísticas
      const productCount = productsData.length;
      const lowStockCount = productsData.filter(
        (p: Product) => p.stock <= 5
      ).length;
      const categoryCount = categoriesData.length;

      // (Opcional) Buscar encomendas pendentes, se houver endpoint
      let pendingOrdersCount = 0;
      try {
        const ordersRes = await fetch("/api/orders?status=pending");
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          pendingOrdersCount = ordersData.length;
        }
      } catch {
        // Se não houver endpoint, ignora
      }

      setProducts(productsData);
      setCategories(categoriesData);
      setStats({
        productCount,
        pendingOrdersCount,
        lowStockCount,
        categoryCount,
      });
    } catch (error) {
      console.error("Erro ao buscar dados da loja:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // --- FUNÇÕES DE LÓGICA CORRIGIDAS ---

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (data: any) => {
    setIsSubmitting(true);
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `/api/products/${editingProduct.id}`
      : "/api/products";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Falha ao salvar o produto.");
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Falha ao deletar produto.");
        await fetchData();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-bebas text-4xl">Gerenciamento da Bookstore</h1>
            <p className="font-lato mt-1 text-neutral-600 dark:text-neutral-400">
              Gerencie produtos, categorias e acompanhe as métricas.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Novo Produto
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Produtos"
            value={stats.productCount}
            icon={Package}
          />
          <StatCard
            title="Encomendas Pendentes"
            value={stats.pendingOrdersCount}
            icon={AlertTriangle}
          />
          <StatCard
            title="Baixo Estoque (<5)"
            value={stats.lowStockCount}
            icon={Boxes}
          />
          <StatCard
            title="Total de Categorias"
            value={stats.categoryCount}
            icon={Boxes}
          />
        </div>

        <div className="bg-white dark:bg-neutral-950/50 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left font-lato text-sm">
            <thead className="border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4 font-semibold">Imagem</th>
                <th className="p-4 font-semibold">SKU</th>
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Preço</th>
                <th className="p-4 font-semibold">Estoque</th>
                <th className="p-4 font-semibold">Categorias</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center p-8">
                    Carregando produtos...
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="p-2">
                      <button
                        onClick={() => setExpandedImage(product.imageSrc!)}
                        className="w-14 h-14 rounded-md overflow-hidden relative group"
                      >
                        <Image
                          src={product.imageSrc || "/images/placeholder.png"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </button>
                    </td>
                    <td className="p-4 font-mono text-xs">{product.sku}</td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">
                      R$ {Number(product.price).toFixed(2)}
                    </td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      {product.categories.map((cat) => cat.name).join(", ")}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 hover:text-primary"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* MODAL SENDO RENDERIZADO */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
        allCategories={categories}
        isLoading={isSubmitting}
      />

      {/* Lightbox para imagem */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-2xl"
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-bebas text-2xl">Visualizar Imagem</h3>
                <button onClick={() => setExpandedImage(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <Image
                  src={expandedImage}
                  alt="Imagem do produto"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
