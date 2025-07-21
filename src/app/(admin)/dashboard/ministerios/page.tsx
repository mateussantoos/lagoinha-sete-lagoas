"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mic,
  Edit,
  Trash2,
  Image as ImageIcon,
  UserPlus,
  X,
} from "lucide-react"; // Adicionado UserPlus para consistência
import { MinisterioModal } from "@/components/admin/MinisterioModal";
import Image from "next/image";

type Ministerio = {
  id: string;
  name: string;
  description?: string | null;
  leaderName?: string | null;
  imageSrc?: string | null;
  createdAt: string;
};

export default function MinisteriosPage() {
  const [ministerios, setMinisterios] = useState<Ministerio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMinisterio, setEditingMinisterio] = useState<Ministerio | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const fetchMinisterios = async () => {
    // A lógica de loading foi movida para dentro da função para ser reutilizável
    setIsLoading(true);
    try {
      const response = await fetch("/api/ministerios");
      const data = await response.json();
      setMinisterios(data);
    } catch (error) {
      console.error("Erro ao buscar ministérios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMinisterios();
  }, []);

  // --- LÓGICA DE SALVAR CORRIGIDA ---
  const handleSaveMinisterio = async (data: any) => {
    setIsSubmitting(true);
    const method = editingMinisterio ? "PUT" : "POST";
    const url = editingMinisterio
      ? `/api/ministerios/${editingMinisterio.id}`
      : "/api/ministerios";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar o ministério.");
      }

      await fetchMinisterios(); // Atualiza a lista com os dados do servidor
      setIsModalOpen(false); // FECHA o modal após o sucesso!
    } catch (error) {
      console.error("Erro ao salvar ministério:", error);
      // Aqui você poderia mostrar uma notificação de erro
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- LÓGICA DE DELETAR CORRIGIDA ---
  const handleDelete = async (ministerio: Ministerio) => {
    if (
      confirm(
        `Tem certeza que deseja deletar o ministério "${ministerio.name}"?`
      )
    ) {
      try {
        const response = await fetch(`/api/ministerios/${ministerio.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Falha ao deletar o ministério.");
        }
        // Atualiza a lista removendo o item deletado, sem precisar de um novo fetch
        setMinisterios((prev) => prev.filter((m) => m.id !== ministerio.id));
      } catch (error: any) {
        alert(error.message); // Mostra o erro para o usuário (ex: "Ministério ainda vinculado a um evento")
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingMinisterio(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (ministerio: Ministerio) => {
    setEditingMinisterio(ministerio);
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
            <h1 className="font-bebas text-4xl">
              Gerenciamento de Ministérios
            </h1>
            <p className="font-lato mt-1 text-neutral-600 dark:text-neutral-400">
              Adicione, edite ou remova os ministérios da igreja.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Mic size={18} />
            Novo Ministério
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-950/50 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4 font-semibold w-20">Imagem</th>
                <th className="p-4 font-semibold">Ministério</th>
                <th className="p-4 font-semibold">Líder</th>
                <th className="p-4 font-semibold">Descrição</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-neutral-500">
                    Carregando...
                  </td>
                </tr>
              ) : ministerios.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-neutral-500">
                    Nenhum ministério encontrado.
                  </td>
                </tr>
              ) : (
                ministerios.map((min) => (
                  <tr
                    key={min.id}
                    className="border-b last:border-none border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="p-2">
                      {min.imageSrc ? (
                        <button
                          onClick={() => setExpandedImage(min.imageSrc!)}
                          className="w-14 h-14 rounded-md overflow-hidden relative group"
                        >
                          <Image
                            src={min.imageSrc}
                            alt={min.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="56px"
                          />
                        </button>
                      ) : (
                        <div className="w-14 h-14 rounded-md bg-stone-100 dark:bg-neutral-800 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-neutral-400" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium">{min.name}</td>
                    <td className="p-4 text-neutral-600 dark:text-neutral-400">
                      {min.leaderName || "A definir"}
                    </td>
                    <td className="p-4 text-neutral-600 dark:text-neutral-400">
                      {min.description
                        ? min.description.length > 60
                          ? min.description.slice(0, 60) + "..."
                          : min.description
                        : "A definir"}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleOpenEditModal(min)}
                          className="p-2 text-neutral-500 hover:text-primary transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(min)}
                          className="p-2 text-neutral-500 hover:text-red-500 transition-colors"
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

      <MinisterioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMinisterio}
        ministerioToEdit={editingMinisterio}
        isLoading={isSubmitting}
      />

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setExpandedImage(null)}
          >
            <motion.div
              layoutId={`ministerio-image-${expandedImage}`}
              className="relative w-auto h-auto max-w-[90vw] max-h-[90vh]"
            >
              <Image
                src={expandedImage}
                alt="Imagem do Ministério Expandida"
                width={1920}
                height={1080}
                className="object-contain w-auto h-auto max-w-full max-h-full rounded-lg"
              />
            </motion.div>
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              aria-label="Fechar imagem"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
