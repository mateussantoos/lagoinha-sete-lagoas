"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, Edit, Trash2 } from "lucide-react";
import { CategoryModal } from "@/components/admin/CategoryModal";

type Category = { id: string; name: string; description?: string | null };

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- LÓGICA DE SALVAR CORRIGIDA ---
  const handleSaveCategory = async (data: any) => {
    setIsSubmitting(true);
    const method = editingCategory ? "PUT" : "POST";
    const url = editingCategory
      ? `/api/categories/${editingCategory.id}`
      : "/api/categories";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar a categoria.");
      }

      await fetchCategories(); // Atualiza a lista com os dados do servidor
      setIsModalOpen(false); // Fecha o modal após o sucesso
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      // Aqui você poderia mostrar uma notificação de erro no modal
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- LÓGICA DE DELETAR MELHORADA ---
  const handleDelete = async (category: Category) => {
    if (
      confirm(`Tem certeza que deseja deletar a categoria "${category.name}"?`)
    ) {
      try {
        const response = await fetch(`/api/categories/${category.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Falha ao deletar a categoria.");
        }
        // Atualiza o estado localmente para um feedback instantâneo
        setCategories((prev) => prev.filter((c) => c.id !== category.id));
      } catch (error: any) {
        alert(error.message); // Mostra erros como "categoria ainda tem produtos"
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-bebas text-4xl">Categorias da Loja</h1>
            <p className="font-lato mt-1 text-neutral-600 dark:text-neutral-400">
              Gerencie as categorias dos produtos.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Tag size={18} />
            Nova Categoria
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-950/50 rounded-lg shadow-sm">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Descrição</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center p-8 text-neutral-500">
                    Carregando...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-8 text-neutral-500">
                    Nenhuma categoria encontrada.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b last:border-none border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="p-4 font-medium">{cat.name}</td>
                    <td className="p-4 text-neutral-500">{cat.description}</td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleOpenEditModal(cat)}
                          className="p-2 text-neutral-500 hover:text-primary"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="p-2 text-neutral-500 hover:text-red-500"
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

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        categoryToEdit={editingCategory}
        isLoading={isSubmitting}
      />
    </>
  );
}
