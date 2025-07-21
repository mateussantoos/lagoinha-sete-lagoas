"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

type Evento = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageSrc?: string;
};

interface EventoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventoData: any) => void;
  eventoToEdit: Evento | null;
  isLoading: boolean;
}

export const EventoModal = ({
  isOpen,
  onClose,
  onSave,
  eventoToEdit,
  isLoading,
}: EventoModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    imageSrc: "",
  });
  const isEditMode = eventoToEdit !== null;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        title: eventoToEdit.title,
        description: eventoToEdit.description,
        date: new Date(eventoToEdit.date).toISOString().slice(0, 16),
        location: eventoToEdit.location,
        imageSrc: eventoToEdit.imageSrc || "",
      });
      setImagePreview(eventoToEdit.imageSrc || null);
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        imageSrc: "",
      });
      setImagePreview(null);
    }
  }, [eventoToEdit, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalImageSrc = eventoToEdit?.imageSrc || "";

    if (imageFile) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Erro no upload");
        finalImageSrc = result.imageUrl;
      } catch (uploadError) {
        console.error("Falha no upload:", uploadError);
        alert("Ocorreu um erro ao enviar a imagem. Tente novamente.");
        return;
      }
    }

    onSave({ ...formData, imageSrc: finalImageSrc });
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
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <h3 className="font-bebas text-2xl">
                {isEditMode ? "Editar Evento" : "Novo Evento"}
              </h3>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Título do Evento"
                required
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
              />
              <input
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Localização"
                required
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descrição"
                required
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg min-h-[120px]"
              />
              <div>
                <label className="font-bold block mb-2">Imagem do Evento</label>
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
