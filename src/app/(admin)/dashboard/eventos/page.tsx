"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarPlus, Edit, Trash2, X } from "lucide-react";
import { EventoModal } from "@/components/admin/EventoModal";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

type Ministerio = { id: string; name: string };
type Evento = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageSrc?: string;
  ministerioId?: string | null;
  ministerio?: Ministerio;
};

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Evento | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const eventosRes = await fetch("/api/eventos");
      const eventosData = await eventosRes.json();
      setEventos(eventosData);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveEvent = async (eventoData: any) => {
    const method = editingEvent ? "PUT" : "POST";
    const url = editingEvent
      ? `/api/eventos/${editingEvent.id}`
      : "/api/eventos";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventoData),
    });
    if (!response.ok) throw new Error("Falha ao salvar evento.");
    await fetchData();
    setIsModalOpen(false);
  };

  const handleDelete = async (evento: Evento) => {
    const response = await fetch(`/api/eventos/${evento.id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Falha ao deletar evento.");
    await fetchData();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-bebas text-4xl">Gerenciamento de Eventos</h1>
            <p className="font-lato mt-1 text-neutral-600 dark:text-neutral-400">
              Adicione, edite ou remova os eventos da igreja.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingEvent(null);
              setIsModalOpen(true);
            }}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <CalendarPlus size={18} />
            Novo Evento
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-950/50 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4 font-semibold w-20">Imagem</th>
                <th className="p-4 font-semibold">Evento</th>
                <th className="p-4 font-semibold">Data</th>
                <th className="p-4 font-semibold">Local</th>
                <th className="p-4 font-semibold">Ministério</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center p-8">
                    Carregando...
                  </td>
                </tr>
              ) : (
                eventos.map((evento) => (
                  <tr
                    key={evento.id}
                    className="border-b last:border-none border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="p-2">
                      {evento.imageSrc ? (
                        <button
                          onClick={() => setExpandedImage(evento.imageSrc!)}
                          className="w-14 h-14 rounded-md overflow-hidden relative group"
                        >
                          <Image
                            src={evento.imageSrc}
                            alt={evento.title}
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
                    <td className="p-4 font-medium">{evento.title}</td>
                    <td className="p-4">
                      {new Date(evento.date).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="p-4">{evento.location}</td>
                    <td className="p-4">
                      {evento.ministerio?.name || "Igreja"}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            setEditingEvent(evento);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(evento)}>
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

      <EventoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        eventoToEdit={editingEvent}
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
              layoutId={`event-image-${expandedImage}`} // Para uma animação mais avançada no futuro
              className="relative w-auto h-auto max-w-[90vw] max-h-[90vh]"
            >
              <Image
                src={expandedImage}
                alt="Imagem do Evento Expandida"
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
