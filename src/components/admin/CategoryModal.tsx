"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag } from "lucide-react";

type Category = { id: string; name: string; description?: string | null };
interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  categoryToEdit: Category | null;
  isLoading: boolean;
}

export const CategoryModal = ({
  isOpen,
  onClose,
  onSave,
  categoryToEdit,
  isLoading,
}: CategoryModalProps) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const isEditMode = categoryToEdit !== null;

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: categoryToEdit.name,
        description: categoryToEdit.description || "",
      });
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [categoryToEdit, isOpen, isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-md"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <h3 className="font-bebas text-2xl">
                {isEditMode ? "Editar Categoria" : "Nova Categoria"}
              </h3>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nome da Categoria"
                required
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descrição (opcional)"
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg min-h-[100px]"
              />
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 bg-neutral-200 dark:bg-neutral-700 font-bold rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-2 px-4 bg-primary text-white font-bold rounded-lg disabled:bg-primary/50"
                >
                  {isLoading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
