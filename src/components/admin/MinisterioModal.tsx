"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, FileText, Image as ImageIcon, Mic } from "lucide-react"; // Ícones atualizados
import Image from "next/image";

type Ministerio = {
  id: string;
  name: string;
  description?: string | null;
  leaderName?: string | null;
  imageSrc?: string | null;
};
interface MinisterioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  ministerioToEdit: Ministerio | null;
  isLoading: boolean;
}

export const MinisterioModal = ({
  isOpen,
  onClose,
  onSave,
  ministerioToEdit,
  isLoading,
}: MinisterioModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    leaderName: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const isEditMode = ministerioToEdit !== null;

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: ministerioToEdit.name,
        description: ministerioToEdit.description || "",
        leaderName: ministerioToEdit.leaderName || "",
      });
      setImagePreview(ministerioToEdit.imageSrc || null);
      setImageFile(null); // Reseta o arquivo ao abrir o modal
    } else {
      setFormData({ name: "", description: "", leaderName: "" });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [ministerioToEdit, isOpen, isEditMode]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // A LÓGICA DE UPLOAD FOI CORRIGIDA AQUI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalImageSrc = isEditMode ? ministerioToEdit.imageSrc : null;

    // 1. Se um novo arquivo foi selecionado, faz o upload para a API
    if (imageFile) {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: imageFile,
        });
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Erro no upload da imagem.");
        finalImageSrc = result.imageUrl; // Guarda a URL pública retornada pela API
      } catch (uploadError) {
        console.error("Falha no upload:", uploadError);
        alert("Ocorreu um erro ao enviar a imagem. Tente novamente.");
        return; // Interrompe o envio se o upload falhar
      }
    }

    // 2. Prepara os dados finais para salvar
    const dataToSave = {
      ...formData,
      imageSrc: finalImageSrc,
    };

    // 3. Chama a função onSave com os dados corretos
    onSave(dataToSave);
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
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-lg"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <h3 className="font-bebas text-2xl">
                {isEditMode ? "Editar Ministério" : "Novo Ministério"}
              </h3>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              <div className="relative">
                <Mic className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nome do Ministério"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  name="leaderName"
                  value={formData.leaderName}
                  onChange={(e) =>
                    setFormData({ ...formData, leaderName: e.target.value })
                  }
                  placeholder="Nome do Líder (opcional)"
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
                />
              </div>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descrição (opcional)"
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg min-h-[120px]"
                />
              </div>
              <div>
                <label className="font-bold block mb-2">
                  Imagem do Ministério
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
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-neutral-800 rounded-md font-medium text-primary hover:text-primary/80 p-2 border border-dashed"
                  >
                    <span>
                      {imagePreview ? "Trocar imagem" : "Enviar uma imagem"}
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </label>
                </div>
              </div>
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
