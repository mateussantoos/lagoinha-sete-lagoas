"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

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
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  productToEdit: Product | null;
  allCategories: Category[];
  isLoading: boolean;
}

export const ProductModal = ({
  isOpen,
  onClose,
  onSave,
  productToEdit,
  allCategories,
  isLoading,
}: ProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    price: 0,
    stock: 0,
    isOnSale: false,
    discountPercentage: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const isEditMode = productToEdit !== null;

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: productToEdit.name,
        sku: productToEdit.sku,
        description: productToEdit.description,
        price: Number(productToEdit.price),
        stock: productToEdit.stock,
        isOnSale: productToEdit.isOnSale,
        discountPercentage: productToEdit.discountPercentage || 0,
      });
      setSelectedCategoryIds(productToEdit.categories.map((cat) => cat.id));
      setImagePreview(productToEdit.imageSrc || null);
    } else {
      setFormData({
        name: "",
        sku: "",
        description: "",
        price: 0,
        stock: 0,
        isOnSale: false,
        discountPercentage: 0,
      });
      setSelectedCategoryIds([]);
      setImagePreview(null);
    }
    setImageFile(null);
  }, [productToEdit, isOpen, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryToggle = (catId: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // --- LÓGICA DE SUBMISSÃO CORRIGIDA ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalImageSrc = isEditMode ? productToEdit?.imageSrc : null;

    if (imageFile) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Erro no upload da imagem.");
        finalImageSrc = result.imageUrl;
      } catch (uploadError) {
        console.error("Falha no upload:", uploadError);
        alert("Ocorreu um erro ao enviar a imagem.");
        return;
      }
    }

    onSave({
      ...formData,
      imageSrc: finalImageSrc,
      categoryIds: selectedCategoryIds,
      price: parseFloat(String(formData.price)) || 0,
      stock: parseInt(String(formData.stock), 10) || 0,
      discountPercentage:
        parseInt(String(formData.discountPercentage), 10) || 0,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-2xl"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <h3 className="font-bebas text-2xl">
                {isEditMode ? "Editar Produto" : "Novo Produto"}
              </h3>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              {/* Campos do Formulário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-lato text-sm font-medium mb-1 block">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-lato text-sm font-medium mb-1 block">
                    SKU (Código)
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-lato text-sm font-medium mb-1 block">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min={0}
                    step="0.01"
                    required
                    className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-lato text-sm font-medium mb-1 block">
                    Estoque
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min={0}
                    required
                    className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-lato text-sm font-medium mb-1 block">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="font-lato text-sm font-medium mb-1 block">
                    Desconto (%)
                  </label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                    min={0}
                    max={100}
                    className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 border rounded-lg"
                  />
                </div>
                <div className="pt-6">
                  <label className="flex items-center gap-2 font-lato text-sm font-medium">
                    <input
                      type="checkbox"
                      name="isOnSale"
                      checked={formData.isOnSale}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded text-primary focus:ring-primary"
                    />
                    Produto em promoção?
                  </label>
                </div>
              </div>

              {/* Seletor de categorias */}
              <div>
                <label className="font-lato text-sm font-medium mb-2 block">
                  Categorias
                </label>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {allCategories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategoryIds.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="h-4 w-4 rounded text-primary focus:ring-primary"
                      />
                      <span className="font-lato text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload de imagem */}
              <div>
                <label className="font-lato text-sm font-medium mb-2 block">
                  Imagem do Produto
                </label>
                <div className="mt-2 flex items-center gap-4">
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Prévia"
                      width={80}
                      height={80}
                      className="rounded-lg object-cover aspect-square"
                    />
                  )}
                  <label
                    htmlFor="product-file-upload"
                    className="relative cursor-pointer bg-white dark:bg-neutral-800 rounded-md font-medium text-primary hover:text-primary/80 p-2 border border-dashed"
                  >
                    <span>
                      {imagePreview ? "Trocar imagem" : "Enviar uma imagem"}
                    </span>
                    <input
                      id="product-file-upload"
                      name="product-file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </label>
                </div>
              </div>

              {/* Botões de Ação */}
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
